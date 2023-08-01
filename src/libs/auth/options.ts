import { MongoDBAdapter } from "@auth/mongodb-adapter";
import { AuthOptions } from "next-auth";
import EmailProvider from "next-auth/providers/email";
import { getClientPromise } from "../persistence";

export const authOptions: AuthOptions = {
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
    signIn: "/sign-in",
    verifyRequest: "/verify-request",
  },
};
