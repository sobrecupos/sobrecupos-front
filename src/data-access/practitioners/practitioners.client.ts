import { RestClient } from "@marketplace/libs/rest-client";
import { Practitioner } from "./practitioners.types";

type UpdateOrCreatePractitioner = Omit<Partial<Practitioner>, "specialty"> & {
  specialty: string;
};

export class PractitionersClient extends RestClient {
  updateOrCreate(payload: UpdateOrCreatePractitioner) {
    if (payload.id) {
      return this.patch("/api/practitioners", { body: payload });
    }

    return this.post("/api/practitioners", { body: payload });
  }
}

export const practitionersClient = new PractitionersClient();
