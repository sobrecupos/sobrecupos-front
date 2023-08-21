import { RestClient } from "@marketplace/libs/rest-client";
import {
  CreateSpecialtyRequest,
  UpdateSpecialtyRequest,
} from "@marketplace/utils/types/specialties";

export class SpecialtiesClient extends RestClient {
  create(specialty: CreateSpecialtyRequest) {
    return this.post("/api/specialties", { body: specialty });
  }

  update(id: string, specialty: UpdateSpecialtyRequest) {
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
