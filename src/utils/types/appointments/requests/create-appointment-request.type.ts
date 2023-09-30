import { AppointmentEntity } from "../common/appointment-entity.type";

type AppointmentEntityAttributes =
  | "durationInMinutes"
  | "practitionerId"
  | "specialtyCode"
  | "status"
  | "practice";

export type CreateAppointmentRequest = Pick<
  AppointmentEntity,
  AppointmentEntityAttributes
> & {
  id: string;
  start: string;
};
