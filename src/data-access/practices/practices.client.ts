import { RestClient } from "@marketplace/libs/rest-client";
import { PracticeDoc } from "./practices.types";

export class PracticesClient extends RestClient {
  create(
    practice: Omit<
      PracticeDoc,
      "formattedAddress" | "shortFormattedAddress" | "country"
    >
  ) {
    return this.post("/api/practices", { body: practice });
  }

  update(id: string, practice: Partial<PracticeDoc>) {
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
