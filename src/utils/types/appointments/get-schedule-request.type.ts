import { Appointment } from "./appointment.type";
import { NewAppointment } from "./new-appointment.type";

export type GetScheduleRequest = {
  day: string;
  appointments: (NewAppointment | Appointment)[];
}[];
