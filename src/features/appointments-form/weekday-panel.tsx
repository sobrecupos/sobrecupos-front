import { Button } from "@marketplace/ui/button";
import { getComponentClassNames } from "@marketplace/ui/namespace";
import {
  Appointment,
  NewAppointment,
} from "@marketplace/utils/types/appointments";
import classNames from "classnames";
import { dateFormatter } from "./date-helpers";
import "./weekday-panel.scss";

export type WeekdayPanelProps = {
  className?: string;
  schedule: {
    day: string;
    appointments: (NewAppointment | Appointment)[];
  }[];
  onDayClick: (index: number) => void;
  selectedDay: number;
};

const classes = getComponentClassNames("weekday-panel", {
  selected: "selected",
});

export const WeekdayPanel = ({
  schedule,
  className,
  onDayClick,
  selectedDay,
}: WeekdayPanelProps) => (
  <div className={classNames(classes.namespace, className)}>
    {schedule.map(({ day }, index: number) => {
      const currentDay = dateFormatter.format(new Date(day));

      return (
        <div key={`schedule-day-${day}`}>
          <Button
            variant="text"
            className={classNames({
              [classes.selected]: selectedDay === index,
            })}
            onClick={() => onDayClick(index)}
          >
            {currentDay[0].toUpperCase() + currentDay.slice(1)}
          </Button>
        </div>
      );
    })}
  </div>
);
