import { Appointment } from "./appointment.type";
import { NewAppointment } from "./new-appointment.type";

export type Schedule = {
  day: string;
  appointments: (NewAppointment | Appointment)[];
}[];
