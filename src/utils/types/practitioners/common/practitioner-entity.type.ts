import { PractitionerPractice } from "./practitioner-practice.type";

export type PractitionerEntity = {
  countryCode: string;
  userId: string;
  code: string;
  email: string;
  picture: string;
  names: string;
  firstSurname: string;
  secondSurname?: string;
  fullName: string;
  phone?: string;
  description: string;
  licenseId: string;
  specialty: {
    id: string;
    code: string;
    name: string;
  };
  practices: PractitionerPractice[];
  enabled: boolean;
};
