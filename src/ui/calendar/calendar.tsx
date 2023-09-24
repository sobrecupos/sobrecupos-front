"use client";

import dayjs from "dayjs";
import isoWeek from "dayjs/plugin/isoWeek";
import { useSearchParams } from "next/navigation";
import NProgress from "nprogress";
import "nprogress/nprogress.css";
import { useEffect, useState } from "react";
import { CalendarUI } from "./calendar-ui";
import "./calendar.scss";

NProgress.configure({ showSpinner: false });

dayjs.extend(isoWeek);

export const Calendar = () => {
  const [appointments, setAppointments] = useState();
  const search = useSearchParams();
  const week = search?.get("week")
    ? Number(search.get("week"))
    : dayjs().isoWeek();
  const year = search?.get("year")
    ? Number(search.get("year"))
    : dayjs().year();

  useEffect(() => {
    NProgress.start();

    setTimeout(() => {
      NProgress.done(false);
    }, 1000);
  }, [week, year]);

  return <CalendarUI week={week} year={year} />;
};
