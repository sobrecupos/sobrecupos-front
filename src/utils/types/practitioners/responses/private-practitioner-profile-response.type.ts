import { PractitionerEntity } from "../common/practitioner-entity.type";

export type PrivatePractitionerProfileResponse = PractitionerEntity & {
  id: string;
};
