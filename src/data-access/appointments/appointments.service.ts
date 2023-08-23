import { getDb } from "@marketplace/libs/persistence";
import {
  Appointment,
  AppointmentEntity,
  GetScheduleRequest,
  SaveAppointmentsRequest,
} from "@marketplace/utils/types/appointments";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import { ObjectId, WithId } from "mongodb";

dayjs.extend(utc);

const VISIBLE_DAYS_IN_SCHEDULE = 7;

export class AppointmentsService {
  readonly scheduleConfig = {
    CL: {
      // 8 am with UTC -4 offset, eventually this should
      // be dynamic.
      startingHour: 12,
      workingHours: 13,
    },
  };

  async saveSchedule({ appointments }: SaveAppointmentsRequest) {
    const collection = await this.collection();

    console.log(appointments);

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

    return result;
  }

  async getAppointmentsByPractice(
    practitionerId: string,
    fromDateString?: string
  ) {
    const collection = await this.collection();
    const from = fromDateString ? new Date(fromDateString) : new Date();

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
          _id: "$practice.id",
          name: {
            $first: "$practice.name",
          },
          shortFormattedAddress: {
            $first: "$practice.shortFormattedAddress",
          },
          insuranceProviders: {
            $first: "$practice.insuranceProviders",
          },
          appointments: {
            $push: {
              id: "$_id",
              status: "$status",
              durationInMinutes: "$durationInMinutes",
            },
          },
        },
      },
    ]);

    const data = [];

    for await (const { _id, ...grouped } of cursor) {
      data.push({
        ...grouped,
        id: _id,
      });
    }

    return data;
  }

  async getSchedule(practitionerId: string, fromDateString?: string) {
    const { workingHours } = this.scheduleConfig.CL;
    const availableHours = this.getAvailableHours(fromDateString);
    const appointmentsByDate = await this.findAppointmentsByDate(
      practitionerId,
      fromDateString
    );

    const dailySchedule: GetScheduleRequest = [];
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

  mapToPlain(entry: WithId<Appointment> | null): Appointment | null {
    if (!entry) return null;

    const { _id: objId, start, ...partial } = entry;

    return {
      ...partial,
      start: dayjs.utc(start).format("YYYY-MM-DDTHH:mm:ss.SSS[Z]"),
      id: objId.toHexString(),
    };
  }

  async collection() {
    const db = await getDb();
    return db.collection<AppointmentEntity>("appointments");
  }
}

export const appointmentsService = new AppointmentsService();
