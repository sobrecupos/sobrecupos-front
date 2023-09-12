export type PractitionerSchedule = {
  date: string;
  results: {
    id: string;
    address: string;
    appointments: {
      id: string;
      status: string;
      start: string;
      durationInMinutes: number;
    }[];
  }[];
};
