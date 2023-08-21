import { PractitionerPractice } from "../practitioners";

export type AppointmentEntity = {
  start: Date;
  durationInMinutes: number;
  practitionerId: string;
  status: string | null;
  practice: PractitionerPractice;
};
