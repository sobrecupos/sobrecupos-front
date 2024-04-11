import { authService } from "@marketplace/data-access/auth/auth.service";
import { specialtiesService } from "@marketplace/data-access/specialties/specialties.service";
import { Entry } from "@marketplace/ui/admin/entry";
import { Card } from "@marketplace/ui/card";
import { getComponentClassNames } from "@marketplace/ui/namespace";
import Link from "next/link";
import "./page.scss";

const classes = getComponentClassNames("specialties-page", {
  title: "title",
  create: "create",
  entriesContainer: "entries-container",
  entriesTitle: "entries-title",
});

const SpecialtiesPage = async () => {
  await authService.getAdminSessionOrRedirect();
  const specialties = await specialtiesService.list();

  return (
    <div className={classes.namespace}>
      <div className="flex justify-center items-center">
        <Link
          href="/app/dashboard"
          className={`text-center text-indigo-500 border-2 border-indigo-600 hover:bg-indigo-600 hover:text-white rounded-md h-fit w-8  bg-white font-semibold`}
        >{"<"}</Link>
        <h1 className={`${classes.title}  text-2xl`}>Especialidades</h1>

      </div>
      <div>
        <Link href="/app/especialidades/crear" className={`${classes.create} text-center bg-indigo-500 hover:bg-indigo-700 rounded-md w-[80%] md:w-[33%] mx-auto text-white p-4 font-semibold`}>
          Crear especialidad
        </Link>
        <Card className={`${classes.entriesContainer} `}>
          <h3 className={classes.entriesTitle}>Listado</h3>
          {specialties.map(({ id, code, name }) => (
            <Entry
              key={id}
              href={`/app/especialidades/${id}`}
              fields={[
                { label: "Nombre", value: name },
                { label: "Código", value: code },
              ]}
              className={`border-2 border-indigo-300 rounded-md hover:border-indigo-700 hover:bg-indigo-100`}
            />
          ))}
        </Card>
      </div>
    </div>
  );
};

export default SpecialtiesPage;
