import { Icon } from "@marketplace/ui/icon";
import { getComponentClassNames } from "@marketplace/ui/namespace";
import classNames from "classnames";
import Link from "next/link";
import { FormEvent, useState } from "react";

export type ScheduleProps = {
  schedule: {
    date: string;
    results: {
      address: string;
      insuranceProviders: string[];
      timeSlots: {
        id: string;
        label: string;
      }[];
    }[];
  };
  practitioner: string;
};

const classes = getComponentClassNames("schedule", {
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

export const Schedule = ({ schedule, practitioner }: ScheduleProps) => {
  const [selected, setSelected] = useState<Record<string, string> | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [values, setValues] = useState({
    name: "",
    email: "",
    phone: "",
    authorization: false,
    termsAndConditions: false,
  });

  const handleFieldChange = (field: string, value: unknown) => {
    setValues((prevValues) => ({ ...prevValues, [field]: value }));
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    if (isLoading || !selected) return;

    setIsLoading(true);
    fetch("/api/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...values,
        itemId: selected.id,
      }),
    })
      .then((response) => response.json())
      .then(({ url }) => {
        window.location.href = url;
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
            <Icon id="arrow-left" variant="solid" />
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
              <span className={classes.label}>Nombre</span>
              <input
                className={classes.input}
                type="text"
                required
                placeholder="Jose Peña"
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
                placeholder="josepena@gmail.com"
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
                checked={values.authorization}
                onChange={(event) => {
                  const { checked } = event.target;
                  handleFieldChange("authorization", checked);
                }}
              />
              <span className={classes.label}>
                Entiendo que estoy pagando la autorización a un sobrecupo y que
                debo pagar la consulta médica en el lugar de atención
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
            <button
              className={classes.submit}
              type="submit"
              disabled={isLoading}
            >
              Pagar sobrecupo $2.990
            </button>
          </form>
        </>
      ) : (
        <>
          <div className={classes.title}>Pide tu sobrecupo aquí:</div>
          <div className={classes.subtitle}>{schedule.date}</div>
          {schedule.results.length === 0 ? (
            <div className={classes.empty}>Sin sobrecupos disponibles 😥</div>
          ) : null}
          {schedule.results.map(
            ({ address, insuranceProviders, timeSlots }) => (
              <div
                className={classes.timeSlotsContainer}
                key={`time-slots-${address}-${schedule.date}`}
              >
                <div className={classes.address}>
                  <div className={classes.addressIcon}>
                    <Icon id="map" />
                  </div>
                  <div>{address}</div>
                </div>
                <div className={classes.insurances}>
                  Atiende: {insuranceProviders.join(" | ")}
                </div>

                <div className={classes.timeSlots}>
                  {timeSlots.map(({ id, label }) => (
                    <button
                      key={`timeslot-${id}`}
                      className={classes.timeSlot}
                      onClick={() =>
                        setSelected({
                          id,
                          label,
                          address,
                          date: schedule.date,
                          insuranceProviders: insuranceProviders.join(" | "),
                        })
                      }
                    >
                      {label}
                    </button>
                  ))}
                </div>
              </div>
            )
          )}
        </>
      )}
    </div>
  );
};
