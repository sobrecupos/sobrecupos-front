"use client";

import { UpdateOrCreateAppointmentRequest } from "@marketplace/utils/types/appointments/requests/update-or-create-appointment-request.type";
import classNames from "classnames";
import dayjs from "dayjs";
import localeEs from "dayjs/locale/es";
import isoWeek from "dayjs/plugin/isoWeek";
import {
  CheckCircle2Icon,
  ChevronLeftIcon,
  ChevronRightIcon,
  CircleDollarSignIcon,
  HeartIcon,
} from "lucide-react";
import { useEffect, useMemo, useRef } from "react";
import { getComponentClassNames } from "../namespace";
import "./calendar.scss";
import { getHours } from "./get-hours";
import { getWeek } from "./get-week";

export type CalendarProps = {
  week: number;
  year: number;
  appointments: Record<string, UpdateOrCreateAppointmentRequest>;
  onDateChange: (values: { week: number; year: number }) => void;
  onCalendarClick: (datestring: string) => void;
};

const classes = getComponentClassNames("calendar", {
  row: "row",
  header: "header",
  body: "body",
  day: "day",
  dayName: "day-name",
  dayNumber: "day-number",
  slot: "slot",
  cell: "cell",
  hour: "hour",
  hourLabel: "hour-label",
  actions: "actions",
  action: "action",
  title: "title",
  appointment: "appointment",
});

dayjs.extend(isoWeek);

const statusMapping = new Map([
  ["RESERVED", "Por pagar"],
  ["PAID", "Pagado"],
  ["FREE", "Sobrecupo"],
]);

export const Calendar = ({
  appointments,
  week,
  year,
  onDateChange,
  onCalendarClick,
}: CalendarProps) => {
  const cellRef = useRef<HTMLButtonElement>(null);
  const { currentWeek, today, currentMonth, prevWeek, nextWeek } =
    useMemo(() => {
      const fullWeek = getWeek({ week, year });
      const dayReference = fullWeek[0];

      return {
        currentWeek: fullWeek,
        today: dayjs(),
        prevWeek: dayReference.subtract(1, "week"),
        nextWeek: dayReference.add(1, "week"),
        currentMonth: fullWeek[0].locale(localeEs).format("MMMM YYYY"),
      };
    }, [week]);
  const hours = useMemo(getHours, []);

  useEffect(() => {
    if (!cellRef.current) return;

    cellRef.current.style.setProperty(
      "--calendar-v-progress",
      `${(today.minute() * 100) / 60}%`
    );
    cellRef.current.style.setProperty("--calendar-v-progress-display", "block");
  }, [today, cellRef]);

  return (
    <div className={classes.namespace}>
      <div className={classNames(classes.row, classes.actions)}>
        <div className={classes.title}>
          {currentMonth[0].toUpperCase() + currentMonth.slice(1)}
        </div>
        <a
          className={classNames(classes.action, `${classes.action}--today`)}
          onClick={() =>
            onDateChange({ year: today.year(), week: today.isoWeek() })
          }
          role="button"
        >
          Hoy
        </a>
        <a
          className={classes.action}
          onClick={() =>
            onDateChange({ year: prevWeek.year(), week: prevWeek.isoWeek() })
          }
          role="button"
        >
          <ChevronLeftIcon />
        </a>
        <a
          className={classes.action}
          onClick={() =>
            onDateChange({ year: nextWeek.year(), week: nextWeek.isoWeek() })
          }
          role="button"
        >
          <ChevronRightIcon />
        </a>
      </div>
      <div className={classNames(classes.row, classes.header)}>
        <div className={classes.slot} />
        {currentWeek.map((date) => {
          const dayName = date.format("dd");
          const dayNumber = date.format("D");

          return (
            <div
              className={classNames(classes.slot, classes.day)}
              key={`calendar-day-${date.format("YYYY-MM-DD")}`}
            >
              <span className={classes.dayName}>
                {dayName[0].toUpperCase() + dayName.slice(1)}
              </span>
              <span
                className={classNames(classes.dayNumber, {
                  [`${classes.dayNumber}--selected`]: today.isSame(date, "day"),
                })}
              >
                {dayNumber}
              </span>
            </div>
          );
        })}
      </div>
      <div className={classes.body}>
        {hours.map((hour) => (
          <div
            className={classes.row}
            key={`calendar-hour-row-${hour.format("HH:mm")}`}
          >
            <div className={classNames(classes.slot, classes.hour)}>
              <span className={classes.hourLabel}>{hour.format("HH:mm")}</span>
            </div>
            {currentWeek.map((date) => {
              const isCurrent =
                date.isSame(today, "day") && hour.isSame(today, "hour");
              const key =
                date.format("YYYY-MM-DD[T]") + hour.format("HH:mm:ss.SSSZZ");
              const currentAppointment = appointments[key];

              return (
                <button
                  className={classNames(classes.slot, classes.cell, {
                    [`${classes.cell}--current`]: isCurrent,
                  })}
                  ref={isCurrent ? cellRef : null}
                  key={key}
                  onClick={() => onCalendarClick(key)}
                >
                  {currentAppointment && currentAppointment.status !== null ? (
                    <div
                      className={classNames(
                        classes.appointment,
                        `${
                          classes.appointment
                        }--${currentAppointment.status.toLowerCase()}`,
                        {
                          [`${classes.appointment}--free-pending`]:
                            currentAppointment.status === "FREE" &&
                            !currentAppointment.id,
                          [`${classes.appointment}--expired`]: dayjs(
                            currentAppointment.start
                          ).isBefore(today),
                        }
                      )}
                    >
                      {currentAppointment.status === "FREE" ? (
                        <HeartIcon width={10} height={10} />
                      ) : null}
                      {currentAppointment.status === "RESERVED" ? (
                        <CircleDollarSignIcon width={10} height={10} />
                      ) : null}
                      {currentAppointment.status === "PAID" ? (
                        <CheckCircle2Icon width={10} height={10} />
                      ) : null}
                      <span>
                        {statusMapping.get(currentAppointment.status) || ""}
                      </span>
                    </div>
                  ) : null}
                </button>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
};
