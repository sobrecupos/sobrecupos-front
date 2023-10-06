import { getDb } from "@marketplace/libs/persistence";
import {
  CreatePractitionerRequest,
  PractitionerEntity,
  PrivatePractitionerProfileResponse,
  PublicPractitionerProfileResponse,
  UpdatePractitionerRequest,
} from "@marketplace/utils/types/practitioners";
import { ObjectId } from "mongodb";
import {
  privatePractitionerProfileProjection,
  publicPractitionerProfileProjection,
} from "./utils";

export class PractitionersService {
  async getPublicProfile(code: string) {
    const practitioners = await this.getCollection();
    const profile =
      await practitioners.findOne<PublicPractitionerProfileResponse>(
        { code },
        { projection: publicPractitionerProfileProjection }
      );

    return profile;
  }

  async getPrivateProfile({ email, id }: { email?: string; id?: string }) {
    const practitioners = await this.getCollection();
    const query: Record<string, unknown> = {};

    if (email) {
      query.email = email;
    }

    if (id) {
      query._id = new ObjectId(id);
    }

    const profile =
      await practitioners.findOne<PrivatePractitionerProfileResponse>(query, {
        projection: privatePractitionerProfileProjection,
      });

    return profile;
  }

  async listBySpecialtyCode(specialtyCode: string) {
    const practitioners = await this.getCollection();
    const cursor = practitioners.find<PublicPractitionerProfileResponse>(
      { "specialty.code": specialtyCode },
      { projection: publicPractitionerProfileProjection }
    );
    const results = [];

    for await (const entry of cursor) {
      results.push(entry);
    }

    return { results };
  }

  async create(payload: CreatePractitionerRequest) {
    const countryCode = payload.countryCode || "CL";
    const [practitioners, counters] = await Promise.all([
      this.getCollection(),
      this.getCounters(),
    ]);
    const counter = await counters.findOne({ countryCode });

    const fullNameTerms = [
      payload.names,
      payload.firstSurname,
      payload.secondSurname,
    ]
      .filter((term) => !!term)
      .map((term) => term?.trim());

    const codeSuffix = fullNameTerms
      .map((term) => term?.toLowerCase())
      .join("-")
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace("ñ", "n")
      .replace(" ", "-");

    const practitioner = {
      ...payload,
      fullName: fullNameTerms.join(" "),
      code: `${countryCode}${
        counter?.current ? counter.current + 1 : 1
      }-${codeSuffix}`,
    };

    const { insertedId } = await practitioners.insertOne(practitioner);
    await counters.updateOne(
      { countryCode },
      { $inc: { current: 1 }, $setOnInsert: { countryCode } },
      { upsert: true }
    );

    return { ...practitioner, id: insertedId.toHexString() };
  }

  async update(id: string, payload: UpdatePractitionerRequest) {
    const practitioners = await this.getCollection();
    const { value } = await practitioners.findOneAndUpdate(
      { _id: new ObjectId(id) },
      { $set: payload },
      {
        returnDocument: "after",
        projection: privatePractitionerProfileProjection,
      }
    );

    return value as PrivatePractitionerProfileResponse | null;
  }

  async getCollection() {
    const db = await getDb();
    return db.collection<PractitionerEntity>("practitioners");
  }

  async getCounters() {
    const db = await getDb();
    return db.collection<{ current: number; countryCode: string }>("counters");
  }
}

export const practitionersService = new PractitionersService();
