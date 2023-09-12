import { PractitionerEntity } from "../common/practitioner-entity.type";

type PractitionerEntityAttributes =
  | "userId"
  | "email"
  | "picture"
  | "names"
  | "firstSurname"
  | "secondSurname"
  | "phone"
  | "description"
  | "licenseId"
  | "specialty"
  | "practices";

export type CreatePractitionerRequest = Pick<
  PractitionerEntity,
  PractitionerEntityAttributes
> & {
  countryCode: "CL";
};
