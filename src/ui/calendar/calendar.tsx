"use client";

import { appointmentsClient } from "@marketplace/data-access/appointments/appointments.client";
import { Appointment } from "@marketplace/utils/types/appointments";
import dayjs from "dayjs";
import isoWeek from "dayjs/plugin/isoWeek";
import { useSearchParams } from "next/navigation";
import NProgress from "nprogress";
import "nprogress/nprogress.css";
import { startTransition, useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { CalendarUI } from "./calendar-ui";
import "./calendar.scss";

export type CalendarProps = {
  practitionerId: string;
};

NProgress.configure({ showSpinner: false });

dayjs.extend(isoWeek);

export const Calendar = ({ practitionerId }: CalendarProps) => {
  const search = useSearchParams();
  const [appointments, setAppointments] = useState<Record<string, Appointment>>(
    {}
  );
  const [date, setDate] = useState(() => {
    const week = search?.get("week")
      ? Number(search.get("week"))
      : dayjs().isoWeek();
    const year = search?.get("year")
      ? Number(search.get("year"))
      : dayjs().year();
    return { week, year };
  });

  useEffect(() => {
    NProgress.start();

    startTransition(() => {
      appointmentsClient
        .getCalendar({ practitionerId, ...date })
        .then((response) => setAppointments(response))
        .catch((error) => {
          console.error(error);
          toast.error("Algo salió mal, prueba recargando la página.");
        })
        .then(() => NProgress.done(false));
    });
  }, [date]);

  return (
    <CalendarUI
      week={date.week}
      year={date.year}
      appointments={appointments}
      onDateChange={setDate}
    />
  );
};
