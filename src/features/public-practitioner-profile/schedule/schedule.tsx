"use client";

import { appointmentsClient } from "@marketplace/data-access/appointments/appointments.client";
import { ordersClient } from "@marketplace/data-access/orders/orders.client";
import ListDays from "@marketplace/ui/ListDays/ListDays";
import { Alert } from "@marketplace/ui/alert";
import { Button } from "@marketplace/ui/button";
import ButtonAppointment from "@marketplace/ui/buttonAppointment/buttonAppointment";
import { getComponentClassNames } from "@marketplace/ui/namespace";
import { AppointmentsByPractice } from "@marketplace/utils/types/appointments";
import classNames from "classnames";
import dayjs from "dayjs";
import localeEs from "dayjs/locale/es";
import localeData from "dayjs/plugin/localeData";
import { ArrowLeftIcon, Loader2Icon, MapIcon } from "lucide-react";
import Link from "next/link";
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
  //console.log('dateString', dateString)
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
  const [selectScheduleDay, setSelectScheduleDay] = useState<AppointmentsByPractice>({ results: [] })
  const [SelectedDate, setSelectedDate] = useState('');
  const [ActiveAppointments, setActiveAppointments] = useState<{}>({});
  const [FirstNextDay, setFirstNextDay] = useState({
    day: dayjs().format('dddd D [de] MMMM'),
    date: ''
  })
  const [IndexDaySelected, setIndexDaySelected] = useState(-1)


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

  const selectDay = async (day: string) => {
    setIsLoading(true);
    const from = day;
    setSelectedDate(dayjs(day).format("YYYY-MM-DDTHH:mm:ss.SSS"));
    const schedulePerDay = await appointmentsClient.getScheduleByDate({ practitionerId, from });
    setSelectScheduleDay(schedulePerDay);
    setIndexDaySelected(dayjs(day).day() - 1);
    setIsLoading(false);
  }

  const getNextDayWithAppointments = async (schedule: AppointmentsByPractice) => {
    console.log('getNextDayWithAppointments', schedule)
    setIsLoading(true);
    //aqui no se debe ir al siguiente día, sino al siguiente día con horas disponibles
    const nextDay = dayjs(schedule.from).format("YYYY-MM-DDTHH:mm:ss.SSS");
    const indexDayOfWeek = dayjs(nextDay).day();
    setSelectedDate(nextDay);
    const schedulePerDay = await appointmentsClient.getScheduleByDate({ practitionerId, from: nextDay });
    selectDay(schedulePerDay.results[0].appointments[0].start.split('T')[0]);
    setIndexDaySelected(indexDayOfWeek - 1);
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
        // setSelectScheduleDay(res)
        setFirstNextDay({
          day: dayjs(res?.results[0]?.appointments[0].start.split('T')[0]).locale(localeEs).format('dddd D [de] MMMM'),
          date: res?.results[0]?.appointments[0]?.start.split('T')[0] || ''
        });
        selectDay(res?.results[0]?.appointments[0].start.split('T')[0]);
        return res;
      });
    }
  }, [schedule])

  if (hasError) {
    return (
      <div className={classes.namespace} id="sobrecupos">
        <div className={classes.title}>Algo salió mal 😥</div>
        <div className={classes.subtitle}>Intenta recargar la página</div>
      </div>
    );
  }

  return (
    <div className={`${classes.namespace}`} id="sobrecupos">
      {selected ? (
        <>
          <button
            className={classes.back}
            type="button"
            onClick={() => setSelected(null)}
            disabled={isLoading}
          >
            <ArrowLeftIcon size={16} />
          </button>
          <div className={classes.table}>
            <div className={classes.tableRow}>
              <span className={classes.tableData}>Sobrecupo:</span>
              <span
                className={classes.tableData}
              >{`${selected.date} a las ${selected.label}`}</span>
            </div>
            <div className={classes.tableRow}>
              <span className={classes.tableData}>Especialista:</span>
              <span className={classes.tableData}>{practitioner}</span>
            </div>
            <div className={classes.tableRow}>
              <span className={classes.tableData}>Previsión:</span>
              <span className={classes.tableData}>
                {selected.insuranceProviders}
              </span>
            </div>
            <div className={classes.tableRow}>
              <span className={classes.tableData}>Ubicación:</span>
              <span className={classes.tableData}>{selected.address}</span>
            </div>
          </div>
          <form className={classes.form} onSubmit={handleSubmit}>
            <label className={classes.formElement}>
              <span className={classes.label}>Nombre completo</span>
              <input
                className={classes.input}
                type="text"
                required
                placeholder="Jose González"
                value={values.name}
                onChange={(event) => {
                  const { value } = event.target;
                  handleFieldChange("name", value);
                }}
              />
            </label>
            <label className={classes.formElement}>
              <span className={classes.label}>Correo electrónico</span>
              <input
                className={classes.input}
                type="email"
                required
                placeholder="josegonzalez@miemail.com"
                value={values.email}
                onChange={(event) => {
                  const { value } = event.target;
                  handleFieldChange("email", value);
                }}
              />
            </label>
            <label className={classes.formElement}>
              <span className={classes.label}>Teléfono</span>
              <input
                className={classes.input}
                type="tel"
                required
                placeholder="+56911223344"
                value={values.phone}
                onChange={(event) => {
                  const { value } = event.target;
                  handleFieldChange("phone", value);
                }}
              />
            </label>
            <label
              className={classNames(
                classes.formElement,
                `${classes.formElement}--inline`
              )}
            >
              <input
                className={classes.input}
                type="checkbox"
                required
                checked={values.paymentAcknowledgement}
                onChange={(event) => {
                  const { checked } = event.target;
                  handleFieldChange("paymentAcknowledgement", checked);
                }}
              />
              <span className={classes.label}>
                Entiendo que{" "}
                <b>sólo estoy pagando la autorización a un sobrecupo</b> y que{" "}
                <b>debo pagar la consulta médica</b> en el lugar de atención
              </span>
            </label>
            <label
              className={classNames(
                classes.formElement,
                `${classes.formElement}--inline`
              )}
            >
              <input
                className={classes.input}
                type="checkbox"
                required
                checked={values.termsAndConditions}
                onChange={(event) => {
                  const { checked } = event.target;
                  handleFieldChange("termsAndConditions", checked);
                }}
              />
              <span className={classes.label}>
                Acepto{" "}
                <Link href="/terminos-y-condiciones">
                  términos y condiciones
                </Link>
              </span>
            </label>
            <Alert type="warning">
              Tendrás 5 minutos para finalizar tu compra en el portal de pagos.
            </Alert>
            <Button
              className={classes.submit}
              type="submit"
              isLoading={isLoading}
              block
            >
              Pagar sobrecupo $2.990
            </Button>
          </form>
        </>
      ) : (
        <>
          <div className={classes.title}>Pide tu sobrecupo aquí:</div>
          <div >
            {/* {formatDate(
              dayjs(schedule.from).format("YYYY-MM-DDTHH:mm:ss.SSS[Z]")
            )}
            {" - "} */}
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

          {/* {selectScheduleDay?.results?.length}
          {showSpinner ? 'true' : 'false'}
          {isLoading ? 'true' : 'false'} */}

          {selectScheduleDay?.results?.length <= 0 && !showSpinner && !isLoading ? (
            <div className={`${classes.empty}`}>
              <p className="mb-3">Próximo sobrecupo disponible:</p>
              <p className="font-bold mb-5 capitalize">{FirstNextDay?.day}</p>
              <button className=" border-2 rounded-full py-4 px-5 border-indigo-500 font-bold text-indigo-600" onClick={
                () => getNextDayWithAppointments(schedule)
              }>Ir a hora más cercana</button>
            </div>
          ) : null}

          {!isLoading ? selectScheduleDay.results.map(
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
