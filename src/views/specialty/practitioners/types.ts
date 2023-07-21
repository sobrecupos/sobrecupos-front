export type Practitioner = {
  picture: string;
  name: string;
  code: string;
  addressTags: string[];
  specialty: string;
  timeSlots: Record<string, any>;
};
