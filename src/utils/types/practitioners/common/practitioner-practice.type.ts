export type PractitionerPractice = {
  id: string;
  address: string;
  tag?: string;
  insuranceProviders: {
    id: string;
    name: string;
    isActive: boolean;
  }[];
};
