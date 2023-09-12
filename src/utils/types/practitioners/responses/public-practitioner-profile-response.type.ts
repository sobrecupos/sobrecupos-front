import { PractitionerEntity } from "../common/practitioner-entity.type";
import { PractitionerSchedule } from "../common/practitioner-schedule.type";

type PublicPractitionerAttributes =
  | "code"
  | "picture"
  | "description"
  | "licenseId"
  | "specialty";

export type PublicPractitionerProfileResponse = Pick<
  PractitionerEntity,
  PublicPractitionerAttributes
> & {
  id: string;
  fullName: string;
  schedule: PractitionerSchedule;
  addressTags: string[];
};
