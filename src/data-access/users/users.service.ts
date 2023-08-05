import { getDb } from "@marketplace/libs/persistence";

export class UsersService {
  async createUser({
    email,
    referralCode,
  }: {
    email?: string;
    referralCode?: string;
  }) {
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
    return db.collection("users");
  }
}

export const usersService = new UsersService();
