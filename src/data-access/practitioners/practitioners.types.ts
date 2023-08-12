export type PractitionerDoc = {
  countryCode?: string;
  userId?: string;
  code?: string;
  email?: string;
  picture?: string;
  names: string;
  firstSurname: string;
  fullName?: string;
  secondSurname?: string;
  phone?: string;
  description: string;
  licenseId: string;
  specialty: {
    id: string;
    name: string;
  };
  practices: {
    id: string;
    address: string;
    insuranceProviders: {
      id: string;
      name: string;
      isActive: boolean;
    }[];
  }[];
};

type RequiredAttributesInResponse = "code" | "email" | "userId";

export type Practitioner = Omit<PractitionerDoc, RequiredAttributesInResponse> &
  Required<Pick<PractitionerDoc, RequiredAttributesInResponse>> & {
    id: string;
  };

export type CreatePractitioner = Omit<Practitioner, "specialty"> & {
  specialty: string;
};
