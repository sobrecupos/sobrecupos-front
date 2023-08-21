import { SpecialtyEntity } from "./specialty-entity.type";

export type CreateSpecialtyRequest = Omit<SpecialtyEntity, "code">;
