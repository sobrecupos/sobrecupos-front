import { AppointmentEntity } from "../common/appointment-entity.type";

type AppointmentEntityAttributes =
  | "durationInMinutes"
  | "practitionerId"
  | "specialtyCode"
  | "status"
  | "practice";

export type UpdateOrCreateAppointmentRequest = Pick<
  AppointmentEntity,
  AppointmentEntityAttributes
> & {
  id?: string;
  start: string;
};
