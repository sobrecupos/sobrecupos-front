import { MongoDBAdapter } from "@auth/mongodb-adapter";
import { getClientPromise } from "@marketplace/libs/persistence";
import { EmailParams, MailerSend, Recipient, Sender } from "mailersend";
import { AuthOptions, getServerSession } from "next-auth";
import EmailProvider from "next-auth/providers/email";
import { redirect } from "next/navigation";
import { usersService } from "../users/users.service";

export class AuthService {
  readonly options: AuthOptions = {
    adapter: MongoDBAdapter(getClientPromise(), {
      databaseName: "marketplace",
    }) as AuthOptions["adapter"],
    providers: [
      EmailProvider({
        from: process.env.EMAIL_FROM,
        sendVerificationRequest: async ({ identifier, url }) => {
          const mailerSend = new MailerSend({
            apiKey: String(process.env.MAILER_SEND_API_KEY),
          });
          const sentFrom = new Sender(
            "contacto@sobrecupos.com",
            "Equipo de Sobrecupos"
          );
          const recipients = [new Recipient(identifier)];
          const variables = [
            {
              email: identifier,
              substitutions: [
                {
                  var: "supportEmail",
                  value: "contacto@sobrecupos.com",
                },
              ],
            },
          ];
          const personalization = [
            {
              email: identifier,
              data: {
                login: url,
              },
            },
          ];
          const emailParams = new EmailParams()
            .setFrom(sentFrom)
            .setTo(recipients)
            .setReplyTo(sentFrom)
            .setSubject(`Inicia sesión en Sobrecupos`)
            .setTemplateId("351ndgwz6mngzqx8")
            .setVariables(variables)
            .setPersonalization(personalization);

          await mailerSend.email.send(emailParams);
        },
      }),
    ],
    pages: {
      signIn: "/iniciar",
      verifyRequest: "/verificacion",
      error: "/error",
      signOut: "/salir",
    },
    callbacks: {
      signIn: async ({ user }) => {
        const existingUser = user.email
          ? await usersService.getUser(user.email)
          : null;

        return existingUser ? true : "/registro";
      },
      session: async ({ session, user }) => {
        if (session?.user) {
          session.user.id = user.id;
          session.user.role = user.role;
        }
        return session;
      },
    },
  };

  async getSessionOrRedirect(callbackUrl: string = "/app/perfil") {
    const session = await getServerSession(this.options);

    const query = callbackUrl
      ? `?callbackUrl=${encodeURIComponent(callbackUrl)}`
      : "";

    if (!session?.user) {
      redirect(`/iniciar${query}`);
    }

    return session;
  }

  async getAdminSessionOrRedirect() {
    const session = await getServerSession(this.options);

    if (!session?.user) {
      redirect("/iniciar");
    }

    if (session?.user.role !== "admin") {
      redirect("/");
    }

    return session;
  }
}

export const authService = new AuthService();
