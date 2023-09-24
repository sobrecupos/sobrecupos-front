"use client";

import classNames from "classnames";
import dayjs from "dayjs";
import localeEs from "dayjs/locale/es";
import isoWeek from "dayjs/plugin/isoWeek";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import Link from "next/link";
import { useEffect, useMemo, useRef } from "react";
import { getComponentClassNames } from "../namespace";
import "./calendar.scss";
import { getHours } from "./get-hours";
import { getWeek } from "./get-week";

export type CalendarUIProps = {
  week: number;
  year: number;
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
});

dayjs.extend(isoWeek);

export const CalendarUI = ({ week, year }: CalendarUIProps) => {
  const cellRef = useRef<HTMLButtonElement>(null);
  const { currentWeek, today, currentMonth, prevWeekKey, nextWeekKey } =
    useMemo(() => {
      const fullWeek = getWeek({ week, year });
      const dayReference = fullWeek[0];
      const prevWeek = dayReference.subtract(1, "week");
      const nextWeek = dayReference.add(1, "week");

      return {
        currentWeek: fullWeek,
        today: dayjs(),
        prevWeekKey: `year=${prevWeek.year()}&week=${prevWeek.isoWeek()}`,
        nextWeekKey: `year=${nextWeek.year()}&week=${nextWeek.isoWeek()}`,
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
        <Link
          className={classNames(classes.action, `${classes.action}--today`)}
          href="/app/calendario"
        >
          Hoy
        </Link>
        <Link
          className={classes.action}
          href={`/app/calendario?${prevWeekKey}`}
        >
          <ChevronLeftIcon />
        </Link>
        <Link
          className={classes.action}
          href={`/app/calendario?${nextWeekKey}`}
        >
          <ChevronRightIcon />
        </Link>
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

              return (
                <button
                  className={classNames(classes.slot, classes.cell, {
                    [`${classes.cell}--current`]: isCurrent,
                  })}
                  ref={isCurrent ? cellRef : null}
                  key={`calendar-hour-cell-${date.format(
                    "YYYY-MM-DD"
                  )}-${hour.format("HH:mm")}`}
                ></button>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
};
