import { AppointmentEntity } from "./appointment-entity.type";

export type NewAppointment = Pick<
  AppointmentEntity,
  "durationInMinutes" | "practitionerId"
> & {
  start: string;
  status: null;
  practice: null;
};
