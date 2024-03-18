import { RestClient } from "@marketplace/libs/rest-client";
import { SaveAppointmentsRequest } from "@marketplace/utils/types/appointments";
import { UpdateOrCreateAppointmentRequest } from "@marketplace/utils/types/appointments/requests/update-or-create-appointment-request.type";

export class AppointmentsClient extends RestClient {
  getSchedule(params: { practitionerId: string; from?: string }) {
    return this.get("/api/appointments/schedule", { params });
  }

  getScheduleByDate(params: { practitionerId: string; from?: string }) {
    return this.get("/api/appointments/schedule/by-date", { params });
  }

  getAppointmentByPractitionerInDate(params: {
    practitionerId: string;
    date: string;
  }) {
    return this.get("/api/appointments/schedule/appointment-days", { params });
  }

  getCalendar(params: { practitionerId: string; week: number; year: number }) {
    return this.get("/api/appointments/calendar", { params });
  }

  save({ id, ...body }: UpdateOrCreateAppointmentRequest) {
    if (id) {
      return this.patch(`/api/appointments/${id}`, { body });
    }

    return this.post("/api/appointments", { body });
  }

  remove(id: string, practitionerId: string) {
    return this.delete(
      `/api/appointments/${id}?practitionerId=${practitionerId}`
    );
  }

  saveSchedule(body: SaveAppointmentsRequest) {
    return this.post("/api/appointments/schedule", {
      body,
    });
  }
}

export const appointmentsClient = new AppointmentsClient();
