"use client";

import { appointmentsClient } from "@marketplace/data-access/appointments/appointments.client";
import { Button } from "@marketplace/ui/button";
import { getComponentClassNames } from "@marketplace/ui/namespace";
import { Select } from "@marketplace/ui/select";
import {
  Appointment,
  NewAppointment,
  SaveAppointmentsRequest,
} from "@marketplace/utils/types/appointments";
import { Practice } from "@marketplace/utils/types/practices";
import { FormEvent, useMemo, useState } from "react";
import "./appointments-form.scss";
import { AppointmentsPanel } from "./appointments-panel";
import { WeekdayPanel } from "./weekday-panel";

export type AppointmentsFormProps = {
  schedule: {
    day: string;
    appointments: (NewAppointment | Appointment)[];
  }[];
  practices: Practice[];
};

const classes = getComponentClassNames("appointments-form", {
  panelContainer: "panel-container",
  leftPanel: "left-panel",
});

export const AppointmentsForm = ({
  schedule,
  practices,
}: AppointmentsFormProps) => {
  const [currentSchedule, setCurrentSchedule] = useState(() =>
    structuredClone(schedule)
  );
  const [selectedDay, setSelectedDay] = useState(0);
  const [selectedPractice, setSelectedPractice] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const { appointments } = currentSchedule[selectedDay];
  const currentPractice = practices[selectedPractice].id;

  const practiceOptions = useMemo(
    () =>
      practices.map(({ id, shortFormattedAddress }) => ({
        value: id,
        label: shortFormattedAddress,
      })),
    [practices]
  );

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    if (isLoading) return;

    setIsLoading(true);

    const actualAppointments = currentSchedule.flatMap(({ appointments }) =>
      appointments.filter(
        (appointment) =>
          ("id" in appointment && !!appointment.id) ||
          appointment.status === "FREE"
      )
    ) as SaveAppointmentsRequest["appointments"];

    if (actualAppointments.length === 0) return;

    appointmentsClient
      .saveSchedule({ appointments: actualAppointments })
      .catch((error) => console.error(error))
      .then(() => setIsLoading(false));
  };

  return (
    <form className={classes.namespace} onSubmit={handleSubmit}>
      <Select
        value={currentPractice}
        onChange={(selectedId) =>
          setSelectedPractice(
            practices.findIndex(({ id }) => id === selectedId)
          )
        }
        options={practiceOptions}
      />
      <div className={classes.panelContainer}>
        <WeekdayPanel
          className={classes.leftPanel}
          schedule={currentSchedule}
          onDayClick={setSelectedDay}
          selectedDay={selectedDay}
        />
        <AppointmentsPanel
          appointments={appointments}
          selectedPractice={currentPractice}
          onAppointmentChange={(checked, index) => {
            setCurrentSchedule((prevSchedule) => {
              const newAppointment = {
                ...appointments[index],
                status: checked ? "FREE" : null,
                practice: checked
                  ? practices.find(({ id }) => id === currentPractice)!
                  : null,
              };
              const nextSchedule = structuredClone(prevSchedule);
              nextSchedule[selectedDay].appointments[index] =
                newAppointment as any;

              return nextSchedule;
            });
          }}
        />
      </div>
      <Button type="submit" variant="primary" block isLoading={isLoading}>
        Guardar cambios
      </Button>
    </form>
  );
};
