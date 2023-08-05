import { getDb } from "@marketplace/libs/persistence";

export class PractitionersService {
  async getProfile(email: string) {
    const collection = await this.getCollection();
    return collection.findOne({ email });
  }

  async getCollection() {
    const db = await getDb();
    return db.collection("practitioners");
  }
}

export const practitionersService = new PractitionersService();
