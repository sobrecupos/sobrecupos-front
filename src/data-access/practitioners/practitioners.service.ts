import { getDb } from "@marketplace/libs/persistence";
import { ObjectId, WithId } from "mongodb";
import { specialtiesService } from "../specialties/specialties.service";
import { CreatePractitioner, PractitionerDoc } from "./practitioners.types";

export class PractitionersService {
  async getProfile(email: string) {
    const practitioners = await this.getCollection();
    const profile = await practitioners.findOne({
      email,
    });

    return this.mapToPlain(profile);
  }

  async create(payload: CreatePractitioner) {
    const countryCode = payload.countryCode || "CL";
    const [practitioners, counters] = await Promise.all([
      this.getCollection(),
      this.getCounters(),
    ]);
    const [specialty, counter] = await Promise.all([
      specialtiesService.findOne(payload.specialty),
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

  async update(id: string, payload: Partial<PractitionerDoc>) {
    const practitioners = await this.getCollection();

    return practitioners
      .findOneAndUpdate({ _id: new ObjectId(id) }, payload, {
        returnDocument: "after",
      })
      .then(({ value }) => this.mapToPlain(value));
  }

  async getCollection() {
    const db = await getDb();
    return db.collection<PractitionerDoc>("practitioners");
  }

  async getCounters() {
    const db = await getDb();
    return db.collection<{ current: number; countryCode: string }>("counters");
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
