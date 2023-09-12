import { PractitionerPractice } from "../../practitioners";

export type AppointmentEntity = {
  start: Date;
  durationInMinutes: number;
  practitionerId: string;
  specialtyCode: string;
  status: string | null;
  practice: PractitionerPractice;
};
