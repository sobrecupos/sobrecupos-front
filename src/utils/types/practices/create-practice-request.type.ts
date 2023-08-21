import { PracticeEntity } from "./practice-entity.type";

export type CreatePracticeRequest = Omit<
  PracticeEntity,
  "formattedAddress" | "shortFormattedAddress" | "country"
>;
