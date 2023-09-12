import { ordersService } from "@marketplace/data-access/orders/orders.service";
import { Icon } from "@marketplace/ui/legacy/icon";
import { getComponentClassNames } from "@marketplace/ui/namespace";
import { OrderResponse } from "@marketplace/utils/types/orders";
import classNames from "classnames";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import { GetServerSidePropsContext } from "next";
import Head from "next/head";
import Image from "next/image";

dayjs.extend(utc);

type SummaryProps = OrderResponse;

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

const Summary = ({ status, ...props }: SummaryProps) => {
  if (status === "ERROR") {
    return (
      <div
        className={classNames(
          classes.namespace,
          `${classes.namespace}--exception`
        )}
      >
        Algo salió mal 😥 por favor reintenta más tarde
      </div>
    );
  }

  if (status === "REJECTED") {
    return (
      <div
        className={classNames(
          classes.namespace,
          `${classes.namespace}--exception`
        )}
      >
        El pago fue rechazado, por favor reintenta la transacción
      </div>
    );
  }

  if (status === "CANCELED") {
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

  if (status === "PENDING") {
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

  if (status === "PAID") {
    const {
      itemDetails: { start, durationInMinutes, practitionerName, address },
      total,
    } = props;

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
          <Icon id="envelope" />
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

  return null;
};

const SummaryWithSeo = (props: SummaryProps) => (
  <>
    <Head>
      <title>Resumen de la compra | Sobrecupos</title>
      <meta name="robots" content="noindex" data-testid="seo-robots" />
    </Head>
    <Summary {...props} />
  </>
);

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  try {
    const { paymentId } = context.query;

    if (typeof paymentId !== "string") {
      return {
        props: {
          status: "ERROR",
        },
      };
    }

    const order = await ordersService.findByPaymentId(paymentId);

    if (!order) {
      return {
        props: {
          status: "ERROR",
        },
      };
    }

    return {
      props: {
        ...order,
      },
    };
  } catch (error) {
    console.error(error);
    return { props: { status: "ERROR" } };
  }
};

export default SummaryWithSeo;
