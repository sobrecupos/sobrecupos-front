import { AppointmentEntity } from "./appointment-entity.type";

export type Appointment = Omit<AppointmentEntity, "start"> & {
  start: string;
  id: string;
};
