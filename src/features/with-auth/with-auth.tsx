import { authOptions } from "@marketplace/libs/auth/options";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export const WithAuth =
  <P extends Record<string, unknown>>(
    Component: React.JSXElementConstructor<P>
  ) =>
  async (props: P) => {
    const session = await getServerSession(authOptions);

    if (!session?.user) {
      const url = new URL("/sign-in", process.env.ROOT_URL);
      url.searchParams.append("callbackUrl", "/app");
      redirect(url.toString());
    }

    return <Component {...props} />;
  };
