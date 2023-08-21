import { getDb } from "@marketplace/libs/persistence";
import {
  CreatePracticeRequest,
  Practice,
  PracticeEntity,
  UpdatePracticeRequest,
} from "@marketplace/utils/types/practices";
import { ObjectId, WithId } from "mongodb";

export class PracticesService {
  async findOne(id: string) {
    const practices = await this.collection();

    return practices
      .findOne({ _id: new ObjectId(id) })
      .then((practiceOrFalsy) => this.mapToPlain(practiceOrFalsy));
  }

  async list() {
    const practices = await this.collection();
    const findCursor = practices.find({});
    const response: Practice[] = [];

    for await (const practice of findCursor) {
      const data = this.mapToPlain(practice);

      if (data) {
        response.push(data);
      }
    }

    return response;
  }

  async create(practice: CreatePracticeRequest) {
    const practices = await this.collection();
    const practiceWithDefaults = this.mergeDefaults(practice);

    return practices
      .findOneAndUpdate(
        { name: practiceWithDefaults.name },
        { $setOnInsert: practiceWithDefaults },
        { upsert: true, returnDocument: "after" }
      )
      .then(({ value }) => this.mapToPlain(value));
  }

  async update(id: string, practice: UpdatePracticeRequest) {
    const practices = await this.collection();

    const payload = this.mergeDefaults(practice);

    return practices
      .findOneAndUpdate({ _id: new ObjectId(id) }, payload, {
        returnDocument: "after",
      })
      .then(({ value }) => this.mapToPlain(value));
  }

  async collection() {
    const db = await getDb();

    return db.collection<PracticeEntity>("practices");
  }

  mergeDefaults(practice: CreatePracticeRequest | UpdatePracticeRequest) {
    const country = "country" in practice ? practice.country : "Chile";
    const street = [practice.route, practice.streetNumber]
      .filter((term) => !!term)
      .join(" ");
    const shortFormattedAddressTerms = [
      street,
      practice.administrativeAreaLevel3,
      practice.administrativeAreaLevel1,
    ].filter((term) => !!term);
    const formattedAddressTerms = [
      street,
      practice.administrativeAreaLevel3,
      practice.administrativeAreaLevel2,
      practice.administrativeAreaLevel1,
      country,
    ].filter((term) => !!term);

    return {
      shortFormattedAddress: shortFormattedAddressTerms.join(", "),
      formattedAddress: formattedAddressTerms.join(", "),
      country: "Chile",
      ...practice,
    };
  }

  mapToPlain(practice: WithId<PracticeEntity> | null) {
    if (!practice) return null;

    return {
      id: practice._id.toHexString(),
      name: practice.name,
      shortFormattedAddress: practice.shortFormattedAddress,
      formattedAddress: practice.formattedAddress,
      streetNumber: practice.streetNumber,
      route: practice.route,
      administrativeAreaLevel1: practice.administrativeAreaLevel1,
      administrativeAreaLevel2: practice.administrativeAreaLevel2,
      administrativeAreaLevel3: practice.administrativeAreaLevel3,
      country: practice.country,
    };
  }
}

export const practicesService = new PracticesService();
