import { RestClient } from "@marketplace/libs/rest-client";
import { SaveAppointmentsRequest } from "@marketplace/utils/types/appointments";

export class AppointmentsClient extends RestClient {
  getSchedule(params: { practitionerId: string; from?: string }) {
    return this.get("/api/appointments/schedule", { params });
  }

  saveSchedule(body: SaveAppointmentsRequest) {
    return this.post("/api/appointments/schedule", {
      body,
    });
  }
}

export const appointmentsClient = new AppointmentsClient();
