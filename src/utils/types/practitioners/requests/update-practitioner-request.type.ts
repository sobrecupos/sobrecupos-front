import { PractitionerEntity } from "../common/practitioner-entity.type";

export type UpdatePractitionerRequest = Partial<PractitionerEntity> & {
  id: string;
};
