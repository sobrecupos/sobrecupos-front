"use client";

import { appointmentsClient } from "@marketplace/data-access/appointments/appointments.client";
import { Button } from "@marketplace/ui/button";
import { Calendar } from "@marketplace/ui/calendar";
import { Modal } from "@marketplace/ui/modal";
import { getComponentClassNames } from "@marketplace/ui/namespace";
import { Appointment } from "@marketplace/utils/types/appointments";
import { UpdateOrCreateAppointmentRequest } from "@marketplace/utils/types/appointments/requests/update-or-create-appointment-request.type";
import { PractitionerPractice } from "@marketplace/utils/types/practitioners";
import classNames from "classnames";
import dayjs from "dayjs";
import localeEs from "dayjs/locale/es";
import isoWeek from "dayjs/plugin/isoWeek";
import { Trash2Icon } from "lucide-react";
import NProgress from "nprogress";
import "nprogress/nprogress.css";
import { startTransition, useEffect, useMemo, useState } from "react";
import { toast } from "react-hot-toast";
import { AppointmentSummary } from "./appointment-summary";
import { AppointmentsCalendarForm } from "./appointments-calendar-form";
import "./appointments-calendar.scss";

export type AppointmentsCalendarProps = {
  practitionerId: string;
  specialtyCode: string;
  practices: PractitionerPractice[];
};

NProgress.configure({ showSpinner: false });

dayjs.extend(isoWeek);

const classes = getComponentClassNames("appointments-calendar", {
  modal: "modal",
  formContainer: "form-container",
  summaryContainer: "summary-container",
  removeButton: "remove-button",
});

const capitalize = (str: string) => str[0].toUpperCase() + str.slice(1);

const getModalTitle = (start: dayjs.Dayjs, durationInMinutes: number) => {
  return (
    capitalize(start.format("dddd DD/MM, HH:mm - ")) +
    start.add(durationInMinutes, "minutes").format("HH:mm")
  );
};

export const AppointmentsCalendar = ({
  practitionerId,
  specialtyCode,
  practices,
}: AppointmentsCalendarProps) => {
  const [isClosing, setIsClosing] = useState(false);
  const [isRemoving, setIsRemoving] = useState(false);
  const [selectedAppointment, setSelectedAppointment] =
    useState<UpdateOrCreateAppointmentRequest | null>(null);
  const [appointments, setAppointments] = useState<
    Record<string, UpdateOrCreateAppointmentRequest>
  >({});
  const [date, setDate] = useState(() => {
    const today = dayjs();
    return { week: today.isoWeek(), year: today.year() };
  });

  const selectedAppointmentStart = useMemo(
    () => dayjs(selectedAppointment?.start).locale(localeEs),
    [selectedAppointment]
  );

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

  useEffect(() => {
    if (selectedAppointment) return;

    setAppointments((prevAppointments) => {
      const nextAppointments: Record<string, UpdateOrCreateAppointmentRequest> =
        {};

      Object.keys(prevAppointments).forEach((key) => {
        if (prevAppointments[key] && prevAppointments[key].id) {
          nextAppointments[key] = prevAppointments[key];
        }
      });

      return nextAppointments;
    });
  }, [selectedAppointment, setAppointments]);

  return (
    <div
      className={classNames(classes.namespace, {
        [`${classes.namespace}--closing`]: isClosing,
      })}
    >
      <Calendar
        week={date.week}
        year={date.year}
        appointments={appointments}
        onDateChange={setDate}
        onCalendarClick={(date) => {
          const appointment = appointments[date] || {
            start: date,
            practitionerId,
            practice: practices[0],
            specialtyCode,
            durationInMinutes: 59,
            status: "FREE",
          };

          setSelectedAppointment(appointment);
          setAppointments((prevAppointments) => ({
            ...prevAppointments,
            [date]: appointment,
          }));
        }}
      />
      <Modal
        className={classes.modal}
        isOpen={!!selectedAppointment}
        onClose={() => {
          setSelectedAppointment(null);
          setIsClosing(false);
        }}
        title={
          selectedAppointment
            ? getModalTitle(
                selectedAppointmentStart,
                selectedAppointment.durationInMinutes
              )
            : ""
        }
        showCloseButton
        closeOnBackdropClick
        onCloseStart={() => setIsClosing(true)}
        renderBody={({ close }) => {
          if (!selectedAppointment) return null;

          if (
            selectedAppointment.status !== "RESERVED" &&
            selectedAppointment.status !== "PAID"
          ) {
            return (
              <div className={classes.formContainer}>
                <AppointmentsCalendarForm
                  practices={practices}
                  appointment={selectedAppointment}
                  readOnly={selectedAppointmentStart.isBefore(dayjs())}
                  onSubmit={async (appointment) => {
                    const key = dayjs(appointment.start).format(
                      "YYYY-MM-DD[T]HH:mm:ss.SSSZZ"
                    );
                    const originalAppointment = appointments[key] || undefined;

                    try {
                      setAppointments((prevAppointments) => ({
                        ...prevAppointments,
                        [key]: appointment,
                      }));
                      const response = await appointmentsClient.save(
                        appointment
                      );

                      setAppointments((prevAppointments) => ({
                        ...prevAppointments,
                        [key]: response,
                      }));
                    } catch (error) {
                      console.error(error);
                      toast.error(
                        "Algo salió mal, por favor recarga la página",
                        { duration: 5000 }
                      );
                      setAppointments((prevAppointments) => ({
                        ...prevAppointments,
                        [key]: originalAppointment,
                      }));
                    }

                    close();
                  }}
                />
                {!!selectedAppointment.id &&
                selectedAppointmentStart.isAfter(dayjs()) &&
                selectedAppointment.status !== "RESERVED" &&
                selectedAppointment.status !== "PAID" ? (
                  <Button
                    className={classes.removeButton}
                    variant="text"
                    block
                    isLoading={isRemoving}
                    disabled={isRemoving}
                    onClick={async (event) => {
                      event.preventDefault();
                      event.stopPropagation();
                      if (!selectedAppointment.id) return;

                      const originalAppointment = { ...selectedAppointment };
                      setIsRemoving(true);

                      try {
                        await appointmentsClient.remove(selectedAppointment.id);
                        setAppointments((prevAppointments) => {
                          const nextAppointments = {
                            ...prevAppointments,
                            [originalAppointment.start]: {
                              ...originalAppointment,
                              id: undefined,
                            },
                          };

                          return nextAppointments;
                        });
                      } catch (error) {
                        console.error(error);
                        toast.error(
                          "Algo salió mal, por favor recarga la página",
                          { duration: 5000 }
                        );
                        setAppointments((prevAppointments) => ({
                          ...prevAppointments,
                          [originalAppointment.start]: originalAppointment,
                        }));
                      }
                      setIsRemoving(false);
                      close();
                    }}
                  >
                    <Trash2Icon height={16} width={16} />
                    <span>Eliminar</span>
                  </Button>
                ) : null}
              </div>
            );
          }

          return (
            <div className={classes.summaryContainer}>
              <AppointmentSummary
                appointment={selectedAppointment as Appointment}
              />
            </div>
          );
        }}
      />
    </div>
  );
};
