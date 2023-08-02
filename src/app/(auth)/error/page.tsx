import Link from "next/link";
import { authLayoutClasses } from "../classes";

const ErrorPage = ({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) => (
  <>
    <h1 className={authLayoutClasses.title}>Algo salió mal</h1>
    {searchParams.error === "Verification" ? (
      <p>El link expiró o ya fue usado.</p>
    ) : (
      <p>No fue posible iniciar sesión.</p>
    )}
    <Link href="/sign-in">Inicia sesión nuevamente.</Link>
  </>
);

export default ErrorPage;
