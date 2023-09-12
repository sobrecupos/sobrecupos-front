import { SpecialtyEntity } from "../common/specialty-entity.type";

export type CreateSpecialtyRequest = Omit<SpecialtyEntity, "code">;
