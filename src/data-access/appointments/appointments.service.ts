import { getDb } from "@marketplace/libs/persistence";
import {
  Appointment,
  AppointmentEntity,
  PractitionersAppointments,
  SaveAppointmentsRequest,
  Schedule,
} from "@marketplace/utils/types/appointments";
import { CreateAppointmentRequest } from "@marketplace/utils/types/appointments/requests/create-appointment-request.type";
import { UpdateAppointmentRequest } from "@marketplace/utils/types/appointments/requests/update-appointment-request.type";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import { ObjectId, WithId } from "mongodb";
import { eventBrokerService } from "../event-broker/event-broker.service";

dayjs.extend(utc);

const VISIBLE_DAYS_IN_SCHEDULE = 7;

export class AppointmentsService {
  readonly scheduleConfig = {
    CL: {
      // 8 am with UTC -3 offset, eventually this should
      // be dynamic.
      startingHour: 11,
      workingHours: 13,
    },
  };

  async validateAvailability(id: string) {
    const appointments = await this.collection();
    const appointment = await appointments.findOne({ _id: new ObjectId(id) });

    if (!appointment) {
      throw new Error(`Appointment with id ${id} not found`);
    }

    if (appointment.status !== "FREE") {
      throw new Error(`Appointment with id ${id} is already reserved`);
    }

    return { isAvailable: true };
  }

  async reserve(id: string) {
    const response = await this.updateStatus(id, "RESERVED");
    await this.publishAppointmentReservation(id);

    return response;
  }

  async cancelReservation(id: string) {
    const appointments = await this.collection();

    const { value } = await appointments.findOneAndUpdate(
      {
        status: "RESERVED",
        _id: new ObjectId(id),
      },
      {
        $set: { status: "FREE" },
      },
      {
        returnDocument: "after",
      }
    );
    await this.publishScheduleChange(value?.practitionerId);

    return value;
  }

  async updateStatus(id: string, status: string | null) {
    const appointments = await this.collection();
    const { value } = await appointments.findOneAndUpdate(
      { _id: new ObjectId(id) },
      { $set: { status } },
      { returnDocument: "after" }
    );
    await this.publishScheduleChange(value?.practitionerId);

    return value;
  }

  async getPractitionersAppointments(specialtyCode: string, from?: string) {
    const appointments = await this.collection();
    const fromDate = dayjs.utc(from);
    const cursor = appointments.aggregate<PractitionersAppointments>([
      {
        $match: {
          specialtyCode,
          start: {
            $gt: fromDate.toDate(),
          },
          status: "FREE",
        },
      },
      {
        $group: {
          _id: "$practitionerId",
          appointments: {
            $push: {
              id: { $toString: "$_id" },
              start: {
                $dateToString: {
                  date: "$start",
                  format: "%Y-%m-%dT%H:%M:%S.%LZ",
                },
              },
              durationInMinutes: "$durationInMinutes",
              status: "$status",
            },
          },
        },
      },
      {
        $group: {
          _id: null,
          results: {
            $push: {
              k: "$_id",
              v: "$appointments",
            },
          },
        },
      },
      {
        $project: {
          results: { $arrayToObject: "$results" },
        },
      },
      {
        $replaceRoot: {
          newRoot: "$results",
        },
      },
    ]);

    const data = [];

    for await (const doc of cursor) {
      data.push(doc);
    }

    return data[0] || {};
  }

  async saveSchedule({
    practitionerId,
    appointments,
  }: SaveAppointmentsRequest) {
    const collection = await this.collection();

    const result = await collection.bulkWrite(
      appointments.map(({ id, start, ...appointment }) => {
        if (id) {
          return {
            updateOne: {
              filter: {
                _id: new ObjectId(id),
              },
              update: {
                $set: {
                  status: appointment.status,
                },
              },
            },
          };
        }

        const startDate = new Date(start);

        return {
          insertOne: {
            document: {
              ...appointment,
              start: startDate,
            },
          },
        };
      }),
      { ordered: false }
    );

    await this.publishScheduleChange(practitionerId);

    return result;
  }

  async getAppointmentsByPractice(
    practitionerId: string,
    fromDateString?: string
  ) {
    const collection = await this.collection();
    const from = dayjs.utc(fromDateString);

    const cursor = collection.aggregate([
      {
        $match: {
          practitionerId: practitionerId,
          start: {
            $gt: from.toDate(),
            // Offset in CL, this should be dynamic
            $lt: from
              .add(-3, "hours")
              .startOf("day")
              .add(
                this.scheduleConfig.CL.startingHour +
                  this.scheduleConfig.CL.workingHours,
                "hours"
              )
              .toDate(),
          },
          status: "FREE",
        },
      },
      {
        $group: {
          _id: "$practice.id",
          address: {
            $first: "$practice.address",
          },
          insuranceProviders: {
            $first: "$practice.insuranceProviders",
          },
          appointments: {
            $push: {
              id: {
                $toString: "$_id",
              },
              status: "$status",
              start: {
                $dateToString: {
                  date: "$start",
                  format: "%Y-%m-%dT%H:%M:%S.%LZ",
                },
              },
              durationInMinutes: "$durationInMinutes",
            },
          },
        },
      },
    ]);

    const results = [];

    for await (const { _id, ...grouped } of cursor) {
      results.push({
        ...grouped,
        id: _id,
      });
    }

    return {
      from: from.format("YYYY-MM-DDTHH:mm:ss.SSS[Z]"),
      results,
    };
  }

  async getCalendar({
    practitionerId,
    week,
    year,
  }: {
    practitionerId: string;
    week: number;
    year: number;
  }) {
    const start = dayjs()
      .utc()
      .year(year)
      .isoWeek(week)
      .startOf("isoWeek")
      .add(3, "hours");
    const end = start.endOf("isoWeek").add(3, "hours");
    const appointments = await this.collection();

    const cursor = appointments.aggregate([
      {
        $match: {
          practitionerId: practitionerId,
          start: {
            $gt: start.toDate(),
            $lt: end.toDate(),
          },
        },
      },
      {
        $group: {
          _id: null,
          appointments: {
            $push: {
              k: {
                $dateToString: {
                  date: "$start",
                  format: "%Y-%m-%dT%H:%M:%S.%L%z",
                  timezone: "America/Santiago",
                },
              },
              v: {
                id: { $toString: "$_id" },
                practitionerId: "$practitionerId",
                start: {
                  $dateToString: {
                    date: "$start",
                    format: "%Y-%m-%dT%H:%M:%S.%L%z",
                    timezone: "America/Santiago",
                  },
                },
                specialtyCode: "$specialtyCode",
                durationInMinutes: "$durationInMinutes",
                status: "$status",
                practice: "$practice",
              },
            },
          },
        },
      },
      {
        $project: {
          results: {
            $arrayToObject: "$appointments",
          },
        },
      },
      {
        $replaceRoot: {
          newRoot: "$results",
        },
      },
    ]);

    const data = [];

    for await (const grouped of cursor) {
      data.push(grouped);
    }

    return data[0] || {};
  }

  async getSchedule(practitionerId: string, fromDateString?: string) {
    const { workingHours } = this.scheduleConfig.CL;
    const availableHours = this.getAvailableHours(fromDateString);
    const appointmentsByDate = await this.findAppointmentsByDate(
      practitionerId,
      fromDateString
    );

    const dailySchedule: Schedule = [];
    let index = -1;

    availableHours.forEach((hour, innerIndex) => {
      const date = hour.format("YYYY-MM-DDTHH:mm:ss.SSS[Z]");

      if (innerIndex % workingHours === 0) {
        index += 1;
        dailySchedule[index] ||= {
          day: date,
          appointments: [],
        };
      }

      const value = this.mapToPlain(appointmentsByDate[date]) || {
        status: null,
        practice: null,
        start: date,
        durationInMinutes: 59,
        practitionerId,
      };

      dailySchedule[index].appointments.push(value);
    });

    return dailySchedule;
  }

  async findAppointmentsByDate(
    practitionerId: string,
    fromDateString?: string
  ) {
    const collection = await this.collection();
    const from = dayjs.utc(fromDateString).toDate();

    const cursor = collection.aggregate([
      {
        $match: {
          practitionerId: practitionerId,
          start: {
            $gt: from,
          },
        },
      },
      {
        $group: {
          _id: null,
          appointments: {
            $push: {
              k: {
                $dateToString: {
                  date: "$start",
                },
              },
              v: "$$ROOT",
            },
          },
        },
      },
      {
        $project: {
          results: {
            $arrayToObject: "$appointments",
          },
        },
      },
      {
        $replaceRoot: {
          newRoot: "$results",
        },
      },
    ]);

    const data = [];

    for await (const grouped of cursor) {
      data.push(grouped);
    }

    return data[0] || {};
  }

  getAvailableHours(from?: string) {
    const { startingHour, workingHours } = this.scheduleConfig.CL;
    const hoursBetweenEndOfDayAndNextStart = 24 - workingHours;
    let startOfDay = dayjs.utc(from).startOf("day").add(startingHour, "hours");
    let endOfDay = startOfDay.add(workingHours, "hour");

    const entries = [];

    for (let i = 0; i < VISIBLE_DAYS_IN_SCHEDULE; i++) {
      while (startOfDay.isBefore(endOfDay)) {
        entries.push(startOfDay);
        startOfDay = startOfDay.add(1, "hour");
      }

      startOfDay = startOfDay.add(hoursBetweenEndOfDayAndNextStart, "hour");
      endOfDay = startOfDay.add(workingHours, "hour");
    }

    return entries;
  }

  async create(appointment: CreateAppointmentRequest) {
    const appointments = await this.collection();

    const { insertedId } = await appointments.insertOne({
      ...appointment,
      start: dayjs.utc(appointment.start).toDate(),
    });

    await this.publishScheduleChange(appointment.practitionerId);

    return { ...appointment, id: insertedId.toHexString() };
  }

  async update(id: string, appointment: UpdateAppointmentRequest) {
    const appointments = await this.collection();

    const { value } = await appointments.findOneAndUpdate(
      { _id: new ObjectId(id) },
      {
        $set: {
          ...appointment,
          start: dayjs.utc(appointment.start).toDate(),
        },
      },
      {
        projection: {
          id: { $toString: "$_id" },
          practitionerId: "$practitionerId",
          start: {
            $dateToString: {
              date: "$start",
              format: "%Y-%m-%dT%H:%M:%S.%L%z",
              timezone: "America/Santiago",
            },
          },
          specialtyCode: "$specialtyCode",
          durationInMinutes: "$durationInMinutes",
          status: "$status",
          practice: "$practice",
        },
        returnDocument: "after",
      }
    );

    await this.publishScheduleChange(appointment.practitionerId);

    return value;
  }

  async remove(id: string, practitionerId: string) {
    const appointments = await this.collection();

    const { value } = await appointments.findOneAndDelete(
      {
        _id: new ObjectId(id),
      },
      {
        projection: {
          id: { $toString: "$_id" },
          practitionerId: "$practitionerId",
          start: {
            $dateToString: {
              date: "$start",
              format: "%Y-%m-%dT%H:%M:%S.%L%z",
              timezone: "America/Santiago",
            },
          },
          specialtyCode: "$specialtyCode",
          durationInMinutes: "$durationInMinutes",
          status: "$status",
          practice: "$practice",
        },
      }
    );

    await this.publishScheduleChange(practitionerId);

    return value;
  }

  mapToPlain(entry: WithId<Appointment> | null): Appointment | null {
    if (!entry) return null;

    const { _id: objId, start, ...partial } = entry;

    return {
      ...partial,
      start: dayjs.utc(start).format("YYYY-MM-DDTHH:mm:ss.SSS[Z]"),
      id: objId.toHexString(),
    };
  }

  publishScheduleChange(practitionerId?: string) {
    return eventBrokerService.publish({
      url: process.env.EVENT_SCHEDULE_CHANGE_URL,
      body: { practitionerId },
    });
  }

  publishAppointmentReservation(id: string) {
    return eventBrokerService.publish({
      topic: process.env.EVENT_APPOINTMENT_RESERVATION_URL,
      body: { id },
      delayInSeconds: 6 * 60,
    });
  }

  async collection() {
    const db = await getDb();
    return db.collection<AppointmentEntity>("appointments");
  }
}

export const appointmentsService = new AppointmentsService();
