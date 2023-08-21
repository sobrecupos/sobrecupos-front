import { AppointmentEntity } from "./appointment-entity.type";

export type Appointment = AppointmentEntity & {
  id: string;
};
