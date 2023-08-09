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
      <h1 className={classes.title}>Especialidades</h1>
      <Link href="/app/especialidades/crear" className={classes.create}>
        Crear especialidad
      </Link>
      <Card className={classes.entriesContainer}>
        <h3 className={classes.entriesTitle}>Listado</h3>
        {specialties.map(({ id, code, name }) => (
          <Entry
            key={id}
            href={`/app/especialidades/${id}`}
            fields={[
              { label: "Nombre", value: name },
              { label: "Código", value: code },
            ]}
          />
        ))}
      </Card>
    </div>
  );
};

export default SpecialtiesPage;
