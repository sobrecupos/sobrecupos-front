"use client";

import { appointmentsClient } from "@marketplace/data-access/appointments/appointments.client";
import { ordersClient } from "@marketplace/data-access/orders/orders.client";
import ListDays from "@marketplace/ui/ListDays/ListDays";
import ButtonAppointment from "@marketplace/ui/buttonAppointment/buttonAppointment";
import { getComponentClassNames } from "@marketplace/ui/namespace";
import SectionFormConfirmDate from "@marketplace/ui/sections/sectionFormConfirmDate";
import { AppointmentsByPractice } from "@marketplace/utils/types/appointments";
import dayjs from "dayjs";
import localeEs from "dayjs/locale/es";
import localeData from "dayjs/plugin/localeData";
import { Loader2Icon, MapIcon } from "lucide-react";
import { FormEvent, useEffect, useState } from "react";
import "./schedule.scss";

export type ScheduleProps = {
  showSpinner?: boolean;
  schedule: AppointmentsByPractice;
  practitioner: string;
  practitionerId: string;
  from: string;
  to: string;
};

const classes = getComponentClassNames("schedule", {
  spinner: "spinner",
  title: "title",
  subtitle: "subtitle",
  timeSlotsContainer: "time-slots-container",
  address: "address",
  addressIcon: "address-icon",
  insurances: "insurances",
  timeSlots: "time-slots",
  timeSlot: "time-slot",
  back: "back",
  table: "table",
  tableRow: "table-row",
  tableData: "table-data",
  form: "form",
  formElement: "form-element",
  label: "label",
  input: "input",
  submit: "submit",
  empty: "empty",
});

const formatDate = (dateString: string) => {
  const formattedDate = new Intl.DateTimeFormat("es-CL", {
    dateStyle: "full",
    timeZone: "America/Santiago",
  }).format(new Date(dateString));
  return formattedDate[0].toUpperCase() + formattedDate.slice(1);
};

const formatHours = (dateString: string, intervalInMinutes: number) => {
  const start = dayjs(dateString);
  const end = start.add(intervalInMinutes, "minutes");

  return `${start.format("HH:mm")} - ${end.format("HH:mm")}`;
};

export const Schedule = ({
  schedule,
  practitioner,
  practitionerId,
  showSpinner,
  from,
  to
}: ScheduleProps) => {
  dayjs.locale("es");
  dayjs.extend(localeData);
  const [selected, setSelected] = useState<Record<string, string> | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [values, setValues] = useState({
    name: "",
    email: "",
    phone: "",
    paymentAcknowledgement: false,
    termsAndConditions: false,
  });
  const [selectScheduleDay, setSelectScheduleDay] = useState<AppointmentsByPractice>();
  const [SelectedDate, setSelectedDate] = useState('');
  const [ActiveAppointments, setActiveAppointments] = useState<{}>({});
  const [FirstNextDay, setFirstNextDay] = useState({
    day: dayjs().format('dddd D [de] MMMM'),
    date: ''
  })
  const [IndexDaySelected, setIndexDaySelected] = useState(0)


  const handleFieldChange = (field: string, value: unknown) => {
    setValues((prevValues) => ({ ...prevValues, [field]: value }));
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    event.stopPropagation();

    if (isLoading || !selected) return;

    const start = new Date(selected.start).getTime();

    if (start <= Date.now()) {
      setHasError(true);
      return;
    }

    setIsLoading(true);
    ordersClient
      .create({
        itemId: selected.id,
        status: "PENDING",
        itemDetails: {
          id: selected.id,
          start: selected.start,
          durationInMinutes: Number(selected.durationInMinutes),
          address: selected.address,
          insuranceProviders: selected.insuranceProviders,
          practitionerId,
          practitionerName: practitioner,
        },
        customerDetails: {
          ...values,
        },
      })
      .then((response) => {
        const { url } = response;

        if (url) {
          window.location.href = url;
          return;
        }

        throw new Error("Failed timeslot purchase");
      })
      .catch((error) => {
        console.error(error);
        setHasError(true);
      });
  };

  const selectDay = async (day: string, firstRender: boolean = false) => {
    setIsLoading(true);
    const indexDayOfWeek = dayjs(day.split('T')[0]).day();
    // console.log('indexDayOfWeek', indexDayOfWeek)
    const from = day;
    if (!firstRender) setSelectedDate(dayjs(day).format("YYYY-MM-DDTHH:mm:ss.SSS"));
    const schedulePerDay = await appointmentsClient.getScheduleByDate({ practitionerId, from });
    setSelectScheduleDay(schedulePerDay);
    // setIndexDaySelected(dayjs(from).day() === 0 ? 6 : dayjs(from).day() - 1);
    console.log('dayjs().day(): ', dayjs().day())
    let diffDays = 6 - dayjs().day();
    await setIndexDaySelected(indexDayOfWeek - diffDays);
    console.log('indexDayOfWeek', indexDayOfWeek)
    console.log('diffDays', diffDays)
    setIsLoading(false);
  }

  const getNextDayWithAppointments = async (schedule: AppointmentsByPractice) => {
    setIsLoading(true);
    //aqui no se debe ir al siguiente día, sino al siguiente día con horas disponibles
    //todo
    // const nextDay = dayjs(schedule.from).format("YYYY-MM-DDTHH:mm:ss.SSS");
    const scheduleSort = await schedule.results.sort((a, b) => {
      return dayjs(a.appointments[0].start).diff(dayjs(b.appointments[0].start))
    }
    )

    const indexDayOfWeek = dayjs(scheduleSort[0].appointments[0].start.split('T')[0]).day();
    // console.log('indexDayOfWeek', indexDayOfWeek)
    setSelectedDate(dayjs(scheduleSort[0].appointments[0].start.split('T')[0]).format("YYYY-MM-DDTHH:mm:ss.SSS"));
    //todo
    const schedulePerDay = await appointmentsClient.getScheduleByDate({ practitionerId, from: schedule.from });
    let diffDays = 6 - dayjs().day();
    await setIndexDaySelected(indexDayOfWeek - diffDays);
    selectDay(scheduleSort[0].appointments[0].start.split('T')[0], true);
    setIsLoading(false);
  }

  useEffect(() => {
    if (schedule) {
      const actives = appointmentsClient.getScheduleFromTo(
        {
          practitionerId,
          from: dayjs().format("YYYY-MM-DDTHH:mm:ss.SSS"),
          to: dayjs().add(7, 'days').format("YYYY-MM-DDTHH:mm:ss.SSS")
        }
      ).then((res) => {
        setActiveAppointments(res)
        const scheduleSort = schedule.results.sort((a, b) => {
          return dayjs(a.appointments[0].start).diff(dayjs(b.appointments[0].start))
        }
        )
        // setSelectScheduleDay(res)
        setFirstNextDay({
          day: dayjs(scheduleSort[0]?.appointments[0].start.split('T')[0]).locale(localeEs).format('dddd D [de] MMMM'),
          date: scheduleSort[0]?.appointments[0]?.start.split('T')[0] || ''
        });
        selectDay(
          dayjs(from).format("YYYY-MM-DDTHH:mm:ss.SSS"),
          true
        );
        return res;
      });
    }
  }, [schedule, selected])

  if (hasError) {
    console.error(`schedule error: practitionerId: ${practitionerId}, practitioner: ${practitioner}, from: ${from}, to: ${to}`)
    return (
      <div className={classes.namespace} id="sobrecupos">
        <div className={classes.title}>Algo salió mal 😥</div>
        <div className={classes.subtitle}>Intenta recargar la página</div>
        <div className="mx-8 md:mx-auto md:w-2/4 bg-indigo-50 rounded-md p-2">
          <p className="text-lg md:text-sm text-center text">Si el error persiste, porfavor escribenos a <a className="font-semibold text-indigo-700" href="mailto:contacto@sobrecupos.com">contacto@sobrecupos.com</a></p>  </div>
      </div>
    );
  }

  return (
    <div className={`${classes.namespace}`} id="sobrecupos">
      {selected ? (
        <SectionFormConfirmDate
          selected={selected}
          setSelected={setSelected}
          isLoading={isLoading}
          practitioner={practitioner}
          handleSubmit={handleSubmit}
          values={values}
          handleFieldChange={handleFieldChange}
        />
      ) : (
        <>
          <div className={classes.title}>Pide tu sobrecupo aquí:</div>
          <div>
            <p className={` text-left text-lg mb-5 font-medium  `}>{SelectedDate ? formatDate(SelectedDate) : formatDate(dayjs().format("YYYY-MM-DDTHH:mm:ss.SSS"))}</p>
          </div>
          <div className="flex">
            <ListDays
              schedule={schedule}
              selectDay={(day) => selectDay(day)}
              activesAppointments={ActiveAppointments}
              practitionerId={practitionerId}
              indexDaySelected={IndexDaySelected}
              from={from}
              to={to}
            />
          </div>
          {showSpinner ? (
            <div className={classes.spinner}>
              <Loader2Icon />
            </div>
          ) : null}
          {selectScheduleDay && selectScheduleDay?.results?.length <= 0 && !showSpinner && !isLoading ? (
            <div className={`${classes.empty}`}>
              <p className="mb-3">Próximo sobrecupo disponible:</p>
              <p className="font-bold mb-5 capitalize">{FirstNextDay?.day}</p>
              <button className=" border-2 rounded-full py-4 px-5 border-indigo-500 font-bold text-indigo-600" onClick={
                () => getNextDayWithAppointments(schedule)
              }>Ir a hora más cercana</button>
            </div>
          ) : null}

          {!isLoading ? selectScheduleDay && selectScheduleDay.results.map(
            ({ id, address, insuranceProviders, appointments }) => {
              const activeInsuranceProviders = insuranceProviders
                .map(({ name, isActive }) => (isActive ? name : null))
                .filter((term) => !!term)
                .join(" | ");
              const activeAppointments = appointments.filter(({ start }) =>
                dayjs(start).isAfter(dayjs())
              );

              return (
                <div
                  className={`border-indigo-200 border-2 p-3 rounded-lg mb-5 ${classes.timeSlotsContainer}`}
                  key={`time-slots-${id}-${schedule.from}`}
                >
                  <div className={classes.address}>
                    <div className={classes.addressIcon}>
                      <MapIcon size={16} />
                    </div>
                    <div>{address}</div>
                  </div>
                  <div className={classes.insurances}>
                    Atiende: {activeInsuranceProviders}
                  </div>


                  <div className={classes.timeSlots}>
                    {activeAppointments.map(
                      ({ id, start, durationInMinutes }) => {
                        if (dayjs(start).isBefore(dayjs())) return null;
                        if (selectScheduleDay)
                          // if (dayjs(start).isAfter(dayjs().add(1, 'day'))) return null;
                          return (
                            <ButtonAppointment
                              key={`timeslot-${id}`}
                              id={id}
                              text={formatHours(start, durationInMinutes)}
                              onClick={() =>
                                setSelected({
                                  id,
                                  label: formatHours(start, durationInMinutes),
                                  start,
                                  durationInMinutes: String(durationInMinutes),
                                  date: formatDate(
                                    dayjs(start).format(
                                      "YYYY-MM-DDTHH:mm:ss.SSS[Z]"
                                    )
                                  ),
                                  address,
                                  insuranceProviders: activeInsuranceProviders,
                                })
                              }
                            />
                          )
                      }
                    )}
                  </div>
                </div>
              );
            }
          ) :
            <div className={`flex justify-center items-center text-indigo-500  min-h-[300px] relative `}>
              <div className="animate-spin">
                <Loader2Icon /></div>
            </div>
          }
        </>
      )}
    </div>
  );
};
