import { Checkbox } from "@marketplace/ui/checkbox";
import {
  Appointment,
  NewAppointment,
} from "@marketplace/utils/types/appointments";
import { hourFormatter } from "./date-helpers";

export type AppointmentsPanelProps = {
  className?: string;
  appointments: (NewAppointment | Appointment)[];
  selectedPractice: any;
  onAppointmentChange: (checked: boolean, index: number) => void;
};

export const AppointmentsPanel = ({
  className,
  appointments,
  selectedPractice,
  onAppointmentChange,
}: AppointmentsPanelProps) => {
  const now = Date.now();

  return (
    <div className={className}>
      {appointments.map((appointment, index) => {
        const { practice, status, start, durationInMinutes } = appointment;
        const startDate = new Date(start);
        const endDate = new Date(
          startDate.getTime() + durationInMinutes * 60 * 1000
        );

        return (
          <Checkbox
            key={`appointment-${start}`}
            label={`${hourFormatter.format(startDate)} - ${hourFormatter.format(
              endDate
            )}`}
            checked={status === "FREE"}
            onChange={(checked) => onAppointmentChange(checked, index)}
            disabled={
              startDate.getTime() < now ||
              (!!practice && practice.id !== selectedPractice) ||
              (status !== null && status !== "FREE")
            }
          />
        );
      })}
    </div>
  );
};
