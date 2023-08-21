export type PractitionerPractice = {
  id: string;
  name: string;
  shortFormattedAddress: string;
  insuranceProviders: {
    id: string;
    name: string;
    isActive: boolean;
  }[];
};
