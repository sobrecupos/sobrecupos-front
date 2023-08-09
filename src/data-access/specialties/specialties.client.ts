import { RestClient } from "@marketplace/libs/rest-client";
import { SpecialtyDoc } from "./specialties.types";

export class SpecialtiesClient extends RestClient {
  create(specialty: Omit<SpecialtyDoc, "code">) {
    return this.post("/api/specialties", { body: specialty });
  }

  update(id: string, specialty: Partial<SpecialtyDoc>) {
    return this.patch(`/api/specialties/${id}`, { body: specialty });
  }

  findOne(id: string) {
    return this.get(`/api/specialties/${id}`);
  }

  list() {
    return this.get("/api/specialties");
  }
}

export const specialtiesClient = new SpecialtiesClient();
