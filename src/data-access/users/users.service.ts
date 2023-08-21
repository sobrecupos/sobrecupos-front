import { getDb } from "@marketplace/libs/persistence";
import { CreateUserRequest } from "@marketplace/utils/types/users/create-user-request.type";
import { UserEntity } from "@marketplace/utils/types/users/user-entity.type";

export class UsersService {
  async createUser({ email, referralCode }: CreateUserRequest) {
    if (!email) {
      throw new Error("Attribute `email` is required");
    }

    if (!referralCode) {
      throw new Error("Attribute `referralCode` is required");
    }

    const users = await this.getCollection();
    return users.findOneAndUpdate(
      { email },
      { $setOnInsert: { email, referralCode } },
      { upsert: true, returnDocument: "after" }
    );
  }

  async getUser(email: string) {
    const users = await this.getCollection();
    return users.findOne({ email });
  }

  async getCollection() {
    const db = await getDb();
    return db.collection<UserEntity>("users");
  }
}

export const usersService = new UsersService();
