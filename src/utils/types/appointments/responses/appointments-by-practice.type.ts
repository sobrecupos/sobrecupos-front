export type AppointmentsByPractice = {
  from: string;
  results: {
    id: string;
    address: string;
    insuranceProviders: {
      id: string;
      name: string;
      isActive: boolean;
    }[];
    appointments: {
      id: string;
      status: string;
      start: string;
      durationInMinutes: number;
    }[];
  }[];
};
