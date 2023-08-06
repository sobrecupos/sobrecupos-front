import { RestClient } from "@marketplace/libs/rest-client";

export class PractitionersClient extends RestClient {
  updateOrCreate(payload: any) {
    if (payload._id) {
      return this.patch("/api/practitioners", { body: payload });
    }

    return this.post("/api/practitioners", { body: payload });
  }
}

export const practitionersClient = new PractitionersClient();
