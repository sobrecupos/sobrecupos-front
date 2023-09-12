import { AppointmentEntity } from "../common/appointment-entity.type";

export type PractitionersAppointments = {
  [key: string]: Pick<AppointmentEntity, "status" | "durationInMinutes"> &
    {
      start: string;
      id: string;
    }[];
};
