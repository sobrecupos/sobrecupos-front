import { RestClient } from "@marketplace/libs/rest-client";
import {
  CreatePractitionerRequest,
  UpdatePractitionerRequest,
} from "@marketplace/utils/types/practitioners";

export class PractitionersClient extends RestClient {
  updateOrCreate(
    payload: CreatePractitionerRequest | UpdatePractitionerRequest
  ) {
    if ("id" in payload && !!payload.id) {
      return this.patch("/api/practitioners", { body: payload });
    }

    return this.post("/api/practitioners", { body: payload });
  }
}

export const practitionersClient = new PractitionersClient();
