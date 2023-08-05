import { MongoDBAdapter } from "@auth/mongodb-adapter";
import { getClientPromise } from "@marketplace/libs/persistence";
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
        server: {
          host: process.env.EMAIL_SERVER_HOST,
          port: process.env.EMAIL_SERVER_PORT,
          auth: {
            user: process.env.EMAIL_SERVER_USER,
            pass: process.env.EMAIL_SERVER_PASSWORD,
          },
        },
        from: process.env.EMAIL_FROM,
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
    },
  };

  async getSessionOrRedirect(_callbackUrl?: string) {
    const session = await getServerSession(authService.options);

    if (!session?.user) {
      redirect(`/iniciar`);
    }

    return session;
  }
}

export const authService = new AuthService();
