import { PractitionerPractice } from "./practitioner-practice.type";
import { PractitionerSpecialty } from "./practitioner-specialty.type";

export type PractitionerEntity = {
  countryCode?: string;
  userId?: string;
  code?: string;
  email?: string;
  picture?: string;
  names: string;
  firstSurname: string;
  fullName?: string;
  secondSurname?: string;
  phone?: string;
  description: string;
  licenseId: string;
  specialty: PractitionerSpecialty;
  practices: PractitionerPractice[];
};
