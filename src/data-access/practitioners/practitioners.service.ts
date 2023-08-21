import { getDb } from "@marketplace/libs/persistence";
import {
  CreatePractitionerRequest,
  PractitionerEntity,
  UpdatePractitionerRequest,
} from "@marketplace/utils/types/practitioners";
import { ObjectId, WithId } from "mongodb";
import { specialtiesService } from "../specialties/specialties.service";

export class PractitionersService {
  async getProfile(email: string) {
    const practitioners = await this.getCollection();
    const profile = await practitioners.findOne({
      email,
    });

    return this.mapToPlain(profile);
  }

  async create(payload: CreatePractitionerRequest) {
    const countryCode = payload.countryCode || "CL";
    const [practitioners, counters] = await Promise.all([
      this.getCollection(),
      this.getCounters(),
    ]);
    const [specialty, counter] = await Promise.all([
      specialtiesService.findOne(payload.specialty.id),
      counters.findOne({ countryCode }),
    ]);

    if (!specialty) {
      throw new Error(
        `Cannot create user. Specialty with id ${payload.specialty} was not found`
      );
    }

    const fullNameTerms = [
      payload.names,
      payload.firstSurname,
      payload.secondSurname,
    ]
      .filter((term) => !!term)
      .map((term) => term?.trim());

    const codeSuffix = fullNameTerms
      .map((term) => term?.toLowerCase())
      .join("-");

    const practitioner = {
      ...payload,
      fullName: fullNameTerms.join(" "),
      code: `${countryCode}${
        counter?.current ? counter.current + 1 : 1
      }-${codeSuffix}`,
      specialty: {
        id: specialty.id,
        name: specialty.name,
        code: specialty.code,
      },
    };

    const { insertedId } = await practitioners.insertOne(practitioner);
    await counters.updateOne(
      { countryCode },
      { $inc: { current: 1 }, $setOnInsert: { countryCode } },
      { upsert: true }
    );

    return { ...payload, id: insertedId.toHexString() };
  }

  async update(id: string, payload: UpdatePractitionerRequest) {
    const practitioners = await this.getCollection();

    return practitioners
      .findOneAndUpdate(
        { _id: new ObjectId(id) },
        { $set: payload },
        { returnDocument: "after" }
      )
      .then(({ value }) => this.mapToPlain(value));
  }

  async getCollection() {
    const db = await getDb();
    return db.collection<PractitionerEntity>("practitioners");
  }

  async getCounters() {
    const db = await getDb();
    return db.collection<{ current: number; countryCode: string }>("counters");
  }

  mapToPlain(practitioner: WithId<PractitionerEntity> | null) {
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
