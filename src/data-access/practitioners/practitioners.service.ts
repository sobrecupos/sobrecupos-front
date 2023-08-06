import { getDb } from "@marketplace/libs/persistence";
import { ObjectId, WithId } from "mongodb";

export type PractitionerDoc = {
  picture?: string;
  names: string;
  firstSurname: string;
  secondSurname?: string;
  phone?: string;
  description: string;
  licenseId: string;
  specialty: {
    id: string;
    name: string;
  };
  practices: {
    id: string;
    address: string;
    insuranceProviders: {
      id: string;
      name: string;
      isActive: boolean;
    }[];
  }[];
};

export class PractitionersService {
  async getProfile(email: string) {
    const practitioners = await this.getCollection();
    const profile = await practitioners.findOne<WithId<PractitionerDoc>>({
      email,
    });
    return this.mapToPlain(profile);
  }

  async create(payload: PractitionerDoc) {
    const practitioners = await this.getCollection();

    return practitioners.insertOne(payload);
  }

  async update(id: string, payload: Partial<PractitionerDoc>) {
    const practitioners = await this.getCollection();

    return practitioners.findOneAndUpdate({ _id: new ObjectId(id) }, payload, {
      returnDocument: "after",
    });
  }

  async getCollection() {
    const db = await getDb();
    return db.collection("practitioners");
  }

  mapToPlain(practitioner: WithId<PractitionerDoc> | null) {
    if (!practitioner) return null;

    return {
      id: practitioner._id.toHexString(),
      picture: practitioner.picture,
      names: practitioner.names,
      firstSurname: practitioner.firstSurname,
      secondSurname: practitioner.secondSurname,
      phone: practitioner.phone,
      description: practitioner.description,
      licenseId: practitioner.licenseId,
      specialty: practitioner.specialty,
      practices: practitioner.practices,
    };
  }
}

export const practitionersService = new PractitionersService();
