import { PractitionerEntity } from "./practitioner-entity.type";

export type CreatePractitionerRequest = Omit<PractitionerEntity, "id">;
