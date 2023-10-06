import { ordersService } from "@marketplace/data-access/orders/orders.service";
import { getComponentClassNames } from "@marketplace/ui/namespace";
import classNames from "classnames";
import dayjs from "dayjs";
import { MailOpenIcon } from "lucide-react";
import Image from "next/image";
import "./page.scss";

type SummaryPageProps = {
  searchParams: {
    paymentId?: string;
  };
};

export const dynamic = "force-dynamic";

const formatHours = (dateString: string, durationInMinutes: number) => {
  const start = dayjs(dateString);
  const end = start.add(durationInMinutes, "minutes");

  return `${start.format("HH:mm")} - ${end.format("HH:mm")}`;
};

const classes = getComponentClassNames("ts-summary", {
  image: "image",
  alert: "alert",
  alertText: "alert-text",
  tableTitle: "table-title",
  table: "table",
  tableRow: "table-row",
  tableData: "table-data",
});

const Error = () => (
  <div
    className={classNames(classes.namespace, `${classes.namespace}--exception`)}
  >
    Algo salió mal 😥 por favor reintenta más tarde
  </div>
);

const SummaryPage = async ({
  searchParams: { paymentId },
}: SummaryPageProps) => {
  if (!paymentId) {
    return <Error />;
  }

  const order = await ordersService.findByPaymentId(paymentId);

  if (!order) {
    return <Error />;
  }

  if (order.status === "CANCELED") {
    return (
      <div
        className={classNames(
          classes.namespace,
          `${classes.namespace}--exception`
        )}
      >
        El pago fue cancelado
      </div>
    );
  }

  if (order.status === "PENDING") {
    return (
      <div
        className={classNames(
          classes.namespace,
          `${classes.namespace}--exception`
        )}
      >
        Su orden está pendiente de pago, reintente más tarde.
      </div>
    );
  }

  if (order.status === "PAID") {
    const {
      itemDetails: { start, durationInMinutes, practitionerName, address },
      total,
    } = order as any;

    const currentDate = dayjs.utc(start).toDate();
    const formattedDate = new Intl.DateTimeFormat("es-CL", {
      dateStyle: "full",
    }).format(currentDate);
    const appointment = formatHours(start, durationInMinutes);

    return (
      <div className={classes.namespace}>
        <Image
          className={classes.image}
          src="/paid.png"
          alt="Mano haciendo gesto de aprobación"
          height={72}
          width={72}
        />

        <div className={classes.alert}>
          <MailOpenIcon size={32} />
          <span className={classes.alertText}>
            Te enviamos una copia del sobrecupo a tu correo electrónico. Si no
            la ves, revisa tu carpeta de spam. Y recuerda presentar este email
            en recepción y <b>pagar tu consulta médica donde corresponda</b> 😃
          </span>
        </div>

        <div className={classes.tableTitle}>Tu sobrecupo</div>
        <div className={classes.table}>
          <div className={classes.tableRow}>
            <span className={classes.tableData}>Fecha:</span>
            <span className={classes.tableData}>
              {formattedDate[0].toUpperCase() + formattedDate.slice(1)}
            </span>
          </div>
          <div className={classes.tableRow}>
            <span className={classes.tableData}>Horario:</span>
            <span className={classes.tableData}>{appointment}</span>
          </div>
          <div className={classes.tableRow}>
            <span className={classes.tableData}>Especialista:</span>
            <span className={classes.tableData}>{practitionerName}</span>
          </div>
          <div className={classes.tableRow}>
            <span className={classes.tableData}>Dirección:</span>
            <span className={classes.tableData}>{address}</span>
          </div>
          <div className={classes.tableRow}>
            <span className={classes.tableData}>Forma de pago:</span>
            <span className={classes.tableData}>Flow</span>
          </div>
          <div className={classes.tableRow}>
            <span className={classes.tableData}>Pagado:</span>
            <span className={classes.tableData}>
              {new Intl.NumberFormat("es-CL", {
                currency: "CLP",
                style: "currency",
              }).format(total)}
            </span>
          </div>
        </div>
      </div>
    );
  }
};

const errorMetadata = {
  title: "Algo salió mal | Sobrecupos",
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: {
      index: false,
      follow: false,
      noimageindex: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export const generateMetadata = async ({
  searchParams: { paymentId },
}: SummaryPageProps) => {
  if (!paymentId) {
    return errorMetadata;
  }

  const order = await ordersService.findByPaymentId(paymentId);

  if (!order) {
    return errorMetadata;
  }

  return {
    title: "Resumen de tu compra | Sobrecupos",
    robots: {
      index: false,
      follow: false,
      nocache: true,
      googleBot: {
        index: false,
        follow: false,
        noimageindex: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
  };
};

export default SummaryPage;
