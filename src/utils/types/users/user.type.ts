import { UserEntity } from "./user-entity.type";

export type User = UserEntity & {
  id: string;
};
