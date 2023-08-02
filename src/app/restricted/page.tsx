import { authOptions } from "@marketplace/libs/auth/options";
import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";

export default async function RestrictedPage() {
  // get the session
  const session = await getServerSession(authOptions);

  // redirect to signin if there is no session.
  if (!session?.user) {
    const url = new URL("/sign-in", "http://localhost:3001");
    url.searchParams.append("callbackUrl", "/restricted");
    redirect(url.toString());
  }

  // display the page
  return (
    <div>
      <h1>Welcome to the Restricted Page, {session?.user?.name}</h1>
    </div>
  );
}
