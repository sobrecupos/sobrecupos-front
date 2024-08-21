import { getDb } from "@marketplace/libs/persistence";
import {
  CreateSpecialtyRequest,
  SpecialtyEntity,
  SpecialtyResponse,
  UpdateSpecialtyRequest,
} from "@marketplace/utils/types/specialties";
import { ObjectId } from "mongodb";
import { specialtyProjection } from "./utils";

export class SpecialtiesService {
  async findByCode(code: string) {
    const specialties = await this.collection();
    const specialty = await specialties.findOne<SpecialtyResponse>(
      { code },
      { projection: specialtyProjection }
    );

    return specialty;
  }

  async findOne(id: string) {
    const specialties = await this.collection();

    const found = await specialties.findOne<SpecialtyResponse>(
      { _id: new ObjectId(id) },
      { projection: specialtyProjection }
    );
    return found;
  }

  async list() {
    const specialties = await this.collection();
    const findCursor = specialties.find<SpecialtyResponse>(
      {
        enabled: true,
      },
      { projection: specialtyProjection }
    );
    const response: SpecialtyResponse[] = [];

    for await (const specialty of findCursor) {
      response.push(specialty);
    }
    // console.log("response", response);
    return response;
  }

  async create(specialty: CreateSpecialtyRequest) {
    const specialties = await this.collection();
    const code = this.getCode(specialty.name);

    const { value } = await specialties.findOneAndUpdate(
      { code },
      { $setOnInsert: { ...specialty, code } },
      { upsert: true, returnDocument: "after", projection: specialtyProjection }
    );

    return value as unknown as SpecialtyResponse;
  }

  async update(id: string, specialty: UpdateSpecialtyRequest) {
    const specialties = await this.collection();

    const payload = specialty.name
      ? { ...specialty, code: this.getCode(specialty.name) }
      : specialty;

    const { value } = await specialties.findOneAndUpdate(
      { _id: new ObjectId(id) },
      payload,
      {
        returnDocument: "after",
        projection: specialtyProjection,
      }
    );

    return value as unknown as SpecialtyResponse;
  }

  async collection() {
    const db = await getDb();

    return db.collection<SpecialtyEntity>("specialties");
  }

  getCode(name: string) {
    return name
      .toLowerCase()
      .trim()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(" ", "");
  }
}

export const specialtiesService = new SpecialtiesService();
