import { OrderResponse } from "@marketplace/utils/types/orders";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import { EmailParams, MailerSend, Recipient, Sender } from "mailersend";
import { practitionersService } from "../practitioners/practitioners.service";

dayjs.extend(utc);

const formatDate = (dateString: string) => {
  const date = new Intl.DateTimeFormat("es-CL", {
    dateStyle: "full",
    timeZone: "America/Santiago",
  }).format(dayjs.utc(dateString).toDate());
  return date[0].toUpperCase() + date.slice(1);
};

const formatHours = (dateString: string, durationInMinutes: number) => {
  // timezone offset for mails, this should be dynamic
  const start = dayjs.utc(dateString).add(-3, "hours");
  const end = start.add(durationInMinutes, "minutes");

  return `${start.format("HH:mm")} - ${end.format("HH:mm")}`;
};

export class OrderNotificationsService {
  async notifyPaidOrderToCustomer(order: OrderResponse) {
    const mailerSend = new MailerSend({
      apiKey: String(process.env.MAILER_SEND_API_KEY),
    });
    const sentFrom = new Sender(
      "contacto@sobrecupos.com",
      "Equipo de Sobrecupos"
    );
    const recipients = [
      new Recipient(order.customerDetails.email, order.customerDetails.name),
    ];
    const bccRecipients = [new Recipient("contacto@sobrecupos.com")];

    const variables = [
      {
        email: order.customerDetails.email,
        substitutions: [
          {
            var: "total",
            value: new Intl.NumberFormat("es-CL", {
              currency: "CLP",
              style: "currency",
            }).format(order.total),
          },
          {
            var: "orderId",
            value: order.id,
          },
          {
            var: "purchaseDate",
            value: formatDate(order.updatedAt),
          },
          {
            var: "supportEmail",
            value: "contacto@sobrecupos.com",
          },
          {
            var: "appointmentDate",
            value: formatDate(order.itemDetails.start),
          },
          {
            var: "appointmentTime",
            value: formatHours(
              order.itemDetails.start,
              order.itemDetails.durationInMinutes
            ),
          },
          {
            var: "practiceAddress",
            value: String(order.itemDetails.address),
          },
          {
            var: "practitionerName",
            value: String(order.itemDetails.practitionerName),
          },
        ],
      },
    ];

    const emailParams = new EmailParams()
      .setFrom(sentFrom)
      .setTo(recipients)
      .setBcc(bccRecipients)
      .setReplyTo(sentFrom)
      .setSubject("Confirmación de sobrecupo")
      .setTemplateId("pxkjn415xw9lz781")
      .setVariables(variables);

    await mailerSend.email.send(emailParams);
  }

  async notifyPaidOrderToPractitioner(order: OrderResponse) {
    const practitioner = await practitionersService.getPrivateProfile({
      id: order.itemDetails.practitionerId,
    });

    if (!practitioner) return;

    const mailerSend = new MailerSend({
      apiKey: String(process.env.MAILER_SEND_API_KEY),
    });
    const sentFrom = new Sender(
      "contacto@sobrecupos.com",
      "Equipo de Sobrecupos"
    );
    const recipients = [
      new Recipient(practitioner.email, practitioner.fullName),
    ];
    const bccRecipients = [new Recipient("contacto@sobrecupos.com")];

    const variables = [
      {
        email: practitioner.email,
        substitutions: [
          {
            var: "practitionerName",
            value: practitioner.names,
          },
          {
            var: "customerName",
            value: order.customerDetails.name,
          },
          {
            var: "supportEmail",
            value: "contacto@sobrecupos.com",
          },
          {
            var: "customerEmail",
            value: order.customerDetails.email,
          },
          {
            var: "customerPhone",
            value: order.customerDetails.phone,
          },
          {
            var: "appointmentDate",
            value: formatDate(order.itemDetails.start),
          },
          {
            var: "appointmentTime",
            value: formatHours(
              order.itemDetails.start,
              order.itemDetails.durationInMinutes
            ),
          },
          {
            var: "practiceAddress",
            value: order.itemDetails.address,
          },
        ],
      },
    ];

    const emailParams = new EmailParams()
      .setFrom(sentFrom)
      .setTo(recipients)
      .setBcc(bccRecipients)
      .setReplyTo(sentFrom)
      .setSubject("Confirmación de sobrecupo")
      .setTemplateId("0r83ql3ej3p4zw1j")
      .setVariables(variables);

    await mailerSend.email.send(emailParams);
  }
}

export const orderNotificationsService = new OrderNotificationsService();
