import { getDb } from "@marketplace/libs/persistence";
import {
  CreateSpecialtyRequest,
  Specialty,
  SpecialtyEntity,
  UpdateSpecialtyRequest,
} from "@marketplace/utils/types/specialties";
import { ObjectId, WithId } from "mongodb";

export class SpecialtiesService {
  async findOne(id: string) {
    const specialties = await this.collection();

    return specialties
      .findOne({ _id: new ObjectId(id) })
      .then((specialtyOrFalsy) => this.mapToPlain(specialtyOrFalsy));
  }

  async list() {
    const specialties = await this.collection();
    const findCursor = specialties.find({});
    const response: Specialty[] = [];

    for await (const specialty of findCursor) {
      const data = this.mapToPlain(specialty);

      if (data) {
        response.push(data);
      }
    }

    return response;
  }

  async create(specialty: CreateSpecialtyRequest) {
    const specialties = await this.collection();
    const code = this.getCode(specialty.name);

    return specialties
      .findOneAndUpdate(
        { code },
        { $setOnInsert: { ...specialty, code } },
        { upsert: true, returnDocument: "after" }
      )
      .then(({ value }) => this.mapToPlain(value));
  }

  async update(id: string, specialty: UpdateSpecialtyRequest) {
    const specialties = await this.collection();

    const payload = specialty.name
      ? { ...specialty, code: this.getCode(specialty.name) }
      : specialty;

    return specialties
      .findOneAndUpdate({ _id: new ObjectId(id) }, payload, {
        returnDocument: "after",
      })
      .then(({ value }) => this.mapToPlain(value));
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

  mapToPlain(specialty: WithId<SpecialtyEntity> | null) {
    if (!specialty) return null;

    return {
      id: specialty._id.toHexString(),
      code: specialty.code,
      name: specialty.name,
      picture: specialty.picture,
    };
  }
}

export const specialtiesService = new SpecialtiesService();
