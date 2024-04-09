import { appointmentsService } from "@marketplace/data-access/appointments/appointments.service";
import { practitionersService } from "@marketplace/data-access/practitioners/practitioners.service";
import { specialtiesService } from "@marketplace/data-access/specialties/specialties.service";
import { PublicPractitionerCard } from "@marketplace/features/public-practitioner-card";
import { getComponentClassNames } from "@marketplace/ui/namespace";
import { Appointment } from "@marketplace/utils/types/appointments";
import "./page.scss";

type SpecialtyPageProps = {
  params: { specialtyCode: string };
};

export const dynamic = "force-dynamic";
export const revalidate = 0;

const classes = getComponentClassNames("specialty-page", {
  header: "header",
  title: "title",
  specialty: "specialty",
  description: "description",
  practitioners: "practitioners",
});

const SpecialtyPage = async ({
  params: { specialtyCode },
}: SpecialtyPageProps) => {
  const [specialty, { results }, appointments] = await Promise.all([
    specialtiesService.findByCode(specialtyCode),
    practitionersService.listBySpecialtyCode(specialtyCode),
    appointmentsService.getPractitionersAppointments(specialtyCode),
  ]);
  const practitioners = results
    .map((practitioner) => ({
      ...practitioner,
      appointments: (appointments[practitioner.id] ||
        []) as unknown as Appointment[],
    }))
    .sort((a, b) => b.appointments.length - a.appointments.length);

  if (!specialty) {
    return <div>Parece que no encontramos lo que estabas buscando 😭</div>;
  }

  return (
    <div className={classes.namespace}>
      <div className={classes.header}>
        <p className={classes.title}>{
          specialty?.type === "exam" ? "Examen" : "Especialidad"
        }</p>
        <h1 className={classes.specialty}>{specialty.name}</h1>
        <p className={classes.description}>
          {
            specialty?.type === "exam" ?
              "Consigue una hora pronto para tus exámenes de forma rápida y sencilla." :
              "En sobrecupos todos nuestros profesionales cuentan con la autorización del Ministerio de Salud"
          }

        </p>
      </div>
      <ul className={classes.practitioners}>
        {practitioners.map((props) => (
          <PublicPractitionerCard
            picture={props.picture}
            fullName={props.fullName}
            code={props.code}
            addressTags={props.addressTags}
            specialty={props.specialty}
            appointments={props.appointments}
            key={`professional-card-${props.code}`}
          />
        ))}
      </ul>
    </div>
  );
};

export const generateMetadata = async ({
  params: { specialtyCode },
}: SpecialtyPageProps) => {
  const specialty = await specialtiesService.findByCode(specialtyCode);

  return {
    title: specialty?.seo.title,
    description: specialty?.seo.description,
  };
};

export default SpecialtyPage;
