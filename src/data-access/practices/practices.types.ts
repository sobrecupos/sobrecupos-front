export type PracticeDoc = {
  name: string;
  shortFormattedAddress: string;
  formattedAddress: string;
  streetNumber: string;
  route: string;
  administrativeAreaLevel1?: string;
  administrativeAreaLevel2?: string;
  administrativeAreaLevel3?: string;
  country: string;
};

export type Practice = PracticeDoc & {
  id: string;
};
