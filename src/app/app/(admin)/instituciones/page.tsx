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
      <h1 className={classes.title}>Instituciones</h1>
      <Link href="/app/instituciones/crear" className={classes.create}>
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
          />
        ))}
      </Card>
    </div>
  );
};

export default PracticesPage;
