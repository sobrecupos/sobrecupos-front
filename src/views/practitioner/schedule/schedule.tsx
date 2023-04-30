import { getComponentClassNames } from "@marketplace/ui/namespace";
import { useState } from "react";

export type ScheduleProps = {
  schedules: {
    date: string;
    address: string;
    insuranceProviders: string[];
    timeSlots: {
      id: string;
      label: string;
    }[];
  }[];
};

const classes = getComponentClassNames("schedule", {
  title: "title",
  subtitle: "subtitle",
  timeSlotsContainer: "time-slots-container",
  address: "address",
  insurances: "insurances",
  timeSlots: "time-slots",
  timeSlot: "time-slot",
});

export const Schedule = ({ schedules }: ScheduleProps) => {
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <div className={classes.namespace} id="sobrecupos">
      {selected ? (
        <></>
      ) : (
        <>
          <div className={classes.title}>Solicita tu sobrecupo aquí</div>
          <div className={classes.subtitle}>{schedules[0].date}</div>
          {schedules.map(({ address, insuranceProviders, timeSlots }) => (
            <div
              className={classes.timeSlotsContainer}
              key={`time-slots-${address}`}
            >
              <div className={classes.address}>{address}</div>
              <div className={classes.insurances}>
                Atiende: {insuranceProviders.join(" | ")}
              </div>

              <div className={classes.timeSlots}>
                {timeSlots.map(({ id, label }) => (
                  <button
                    className={classes.timeSlot}
                    onClick={() => setSelected(id)}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </>
      )}
    </div>
  );
};
