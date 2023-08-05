import { getDb } from "@marketplace/libs/persistence";

export class PractitionersService {
  async getProfile(email: string) {
    const collection = await this.getCollection();
    const doc = await collection.findOne({ email });

    return doc;
  }

  async getCollection() {
    const db = await getDb();
    return db.collection("practitioners");
  }
}

export const practitionersService = new PractitionersService();
