import { UserEntity } from "./user-entity.type";

export type CreateUserRequest = Pick<
  Required<UserEntity>,
  "email" | "referralCode"
>;
