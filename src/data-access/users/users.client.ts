import { RestClient } from "@marketplace/libs/rest-client";

export type CreateUser = {
  email: string;
  referralCode?: string;
};

export class UsersClient extends RestClient {
  createUser(payload: CreateUser) {
    return this.post("/api/users", {
      method: "POST",
      body: payload,
    });
  }
}

export const usersClient = new UsersClient();
