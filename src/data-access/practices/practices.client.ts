import { RestClient } from "@marketplace/libs/rest-client";
import {
  CreatePracticeRequest,
  UpdatePracticeRequest,
} from "@marketplace/utils/types/practices";

export class PracticesClient extends RestClient {
  create(practice: CreatePracticeRequest) {
    return this.post("/api/practices", { body: practice });
  }

  update(id: string, practice: UpdatePracticeRequest) {
    return this.patch(`/api/practices/${id}`, { body: practice });
  }

  findOne(id: string) {
    return this.get(`/api/practices/${id}`);
  }

  list() {
    return this.get("/api/practices");
  }
}

export const practicesClient = new PracticesClient();
