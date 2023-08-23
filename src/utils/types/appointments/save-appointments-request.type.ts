import { Appointment } from "./appointment.type";

export type SaveAppointmentsRequest = {
  appointments: (Omit<Appointment, "id" | "status"> & {
    id?: string;
    status: string | null;
  })[];
};
