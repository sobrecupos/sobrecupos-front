import { authService } from "@marketplace/data-access/auth/auth.service";
import { practicesService } from "@marketplace/data-access/practices/practices.service";
import { Entry } from "@marketplace/ui/admin/entry";
import { Card } from "@marketplace/ui/card";
import { getComponentClassNames } from "@marketplace/ui/namespace";
import Link from "next/link";
import "./page.scss";

const classes = getComponentClassNames("practices-page", {
  title: "title",
  create: "create",
  entriesContainer: "entries-container",
  entriesTitle: "entries-title",
});

const PracticesPage = async () => {
  await authService.getAdminSessionOrRedirect();
  const practices = await practicesService.list();

  return (
    <div className={classes.namespace}>
      <div className="flex justify-center items-center">
        <Link
          href="/app/dashboard"
          className={`text-center text-indigo-500 border-2 border-indigo-600 hover:bg-indigo-600 hover:text-white rounded-md h-fit w-8  bg-white font-semibold`}
        >{"<"}</Link>
        <h1 className={`${classes.title}  text-2xl`}>Instituciones</h1>

      </div>

      <Link href="/app/instituciones/crear" className={`${classes.create} bg-indigo-500 hover:bg-indigo-700 rounded-md w-[80%] md:w-[33%] mx-auto text-white p-4 font-semibold`}>
        Crear institución
      </Link>
      <Card className={classes.entriesContainer}>
        <h3 className={classes.entriesTitle}>Listado</h3>
        {practices.map(({ id, name, shortFormattedAddress }) => (
          <Entry
            key={id}
            href={`/app/instituciones/${id}`}
            fields={[
              { label: "Nombre", value: name },
              { label: "Dirección", value: shortFormattedAddress },
            ]}
            className={`border-2 border-indigo-300 rounded-md hover:border-indigo-700 hover:bg-indigo-100`}
          />
        ))}
      </Card>
    </div>
  );
};

export default PracticesPage;
