import { RestClient } from "@marketplace/libs/rest-client";
import { CreateUserRequest } from "@marketplace/utils/types/users/create-user-request.type";

export class UsersClient extends RestClient {
  createUser(body: CreateUserRequest) {
    return this.post("/api/users", {
      body,
    });
  }
}

export const usersClient = new UsersClient();
