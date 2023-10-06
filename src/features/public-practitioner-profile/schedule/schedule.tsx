"use client";

import { ordersClient } from "@marketplace/data-access/orders/orders.client";
import { Alert } from "@marketplace/ui/alert";
import { Button } from "@marketplace/ui/button";
import { getComponentClassNames } from "@marketplace/ui/namespace";
import { AppointmentsByPractice } from "@marketplace/utils/types/appointments";
import classNames from "classnames";
import dayjs from "dayjs";
import { ArrowLeftIcon, Loader2Icon, MapIcon } from "lucide-react";
import Link from "next/link";
import { FormEvent, useState } from "react";
import "./schedule.scss";

export type ScheduleProps = {
  showSpinner?: boolean;
  schedule: AppointmentsByPractice;
  practitioner: string;
  practitionerId: string;
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
}: ScheduleProps) => {
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

  if (hasError) {
    return (
      <div className={classes.namespace} id="sobrecupos">
        <div className={classes.title}>Algo salió mal 😥</div>
        <div className={classes.subtitle}>Intenta recargar la página</div>
      </div>
    );
  }

  return (
    <div className={classes.namespace} id="sobrecupos">
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
          <div className={classes.subtitle}>
            {formatDate(
              dayjs(schedule.from).format("YYYY-MM-DDTHH:mm:ss.SSS[Z]")
            )}
          </div>
          {showSpinner ? (
            <div className={classes.spinner}>
              <Loader2Icon />
            </div>
          ) : null}
          {schedule.results.length === 0 && !showSpinner ? (
            <div className={classes.empty}>Sin sobrecupos disponibles 😥</div>
          ) : null}
          {schedule.results.map(
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
                  className={classes.timeSlotsContainer}
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
                      ({ id, start, durationInMinutes }) => (
                        <button
                          key={`timeslot-${id}`}
                          className={classes.timeSlot}
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
                        >
                          {formatHours(start, durationInMinutes)}
                        </button>
                      )
                    )}
                  </div>
                </div>
              );
            }
          )}
        </>
      )}
    </div>
  );
};
