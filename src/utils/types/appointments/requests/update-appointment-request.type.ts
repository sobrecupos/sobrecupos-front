import { AppointmentEntity } from "../common/appointment-entity.type";

type AppointmentEntityAttributes =
  | "durationInMinutes"
  | "practitionerId"
  | "specialtyCode"
  | "status"
  | "practice";

export type UpdateAppointmentRequest = Pick<
  AppointmentEntity,
  AppointmentEntityAttributes
> & {
  start: string;
};
