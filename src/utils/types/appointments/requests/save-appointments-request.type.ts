import { AppointmentEntity } from "../common/appointment-entity.type";

type AppointmentEntityAttributes =
  | "durationInMinutes"
  | "practitionerId"
  | "specialtyCode"
  | "status"
  | "practice";

export type SaveAppointmentsRequest = {
  practitionerId: string;
  appointments: (Pick<AppointmentEntity, AppointmentEntityAttributes> & {
    id?: string;
    start: string;
  })[];
};
