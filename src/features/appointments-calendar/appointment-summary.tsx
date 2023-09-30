import { ordersClient } from "@marketplace/data-access/orders/orders.client";
import { Badge } from "@marketplace/ui/badge";
import { getComponentClassNames } from "@marketplace/ui/namespace";
import { Appointment } from "@marketplace/utils/types/appointments";
import { OrderResponse } from "@marketplace/utils/types/orders";
import classNames from "classnames";
import { startTransition, useEffect, useState } from "react";
import toast from "react-hot-toast";
import "./appointment-summary.scss";

export type AppointmentSummaryProps = {
  appointment: Appointment;
};

const classes = getComponentClassNames("appointment-summary", {
  skeleton: "skeleton",
  row: "row",
});

export const AppointmentSummary = ({
  appointment,
}: AppointmentSummaryProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [order, setOrder] = useState<OrderResponse | null>(null);

  useEffect(() => {
    startTransition(() => {
      ordersClient
        .findByItemId(appointment.id)
        .then((response) => setOrder(response))
        .catch((error) => {
          console.error(error);
          toast.error("Algo salió mal, por favor recarga la página.", {
            duration: 8000,
          });
        })
        .then(() => setIsLoading(false));
    });
  }, []);

  return (
    <div>
      <div>
        <div className={classes.row}>
          <span>Estado</span>
          <span
            className={classNames({ [classes.skeleton]: !order || isLoading })}
          >
            {order && !isLoading ? (
              <Badge variant={order.status === "PENDING" ? "info" : "success"}>
                {order.status === "PENDING" ? "Por pagar" : "Pagado"}
              </Badge>
            ) : null}
          </span>
        </div>
        <div className={classes.row}>
          <span>Lugar de atención</span>
          <span
            className={classNames({ [classes.skeleton]: !order || isLoading })}
          >
            {order && !isLoading ? order.itemDetails.address : null}
          </span>
        </div>
        <div className={classes.row}>
          <span>Paciente</span>
          <span
            className={classNames({ [classes.skeleton]: !order || isLoading })}
          >
            {order && !isLoading ? order.customerDetails.name : null}
          </span>
        </div>
        <div className={classes.row}>
          <span>Correo electrónico</span>
          <span
            className={classNames({ [classes.skeleton]: !order || isLoading })}
          >
            {order && !isLoading ? order.customerDetails.email : null}
          </span>
        </div>
        <div className={classes.row}>
          <span>Teléfono</span>
          <span
            className={classNames({ [classes.skeleton]: !order || isLoading })}
          >
            {order && !isLoading ? order.customerDetails.phone : null}
          </span>
        </div>
      </div>
    </div>
  );
};
