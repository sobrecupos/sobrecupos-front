import { appointmentsService } from "@marketplace/data-access/appointments/appointments.service";
import { practitionersService } from "@marketplace/data-access/practitioners/practitioners.service";
import { specialtiesService } from "@marketplace/data-access/specialties/specialties.service";
import { getComponentClassNames } from "@marketplace/ui/namespace";
import { Appointment } from "@marketplace/utils/types/appointments";
import { PublicPractitionerProfileResponse } from "@marketplace/utils/types/practitioners";
import { SpecialtyResponse } from "@marketplace/utils/types/specialties";
import { Practitioners } from "@marketplace/views/specialty/practitioners";
import { SpecialtyHeader } from "@marketplace/views/specialty/specialty-header";
import { GetStaticPropsContext } from "next";
import Head from "next/head";

type SpecialtyProps = {
  specialty: SpecialtyResponse;
  practitioners: (PublicPractitionerProfileResponse & {
    appointments: Appointment[];
  })[];
};

const { namespace } = getComponentClassNames("specialty", {});

const Specialty = ({
  specialty: { seo, name },
  practitioners,
}: SpecialtyProps) => (
  <div className={namespace}>
    <Head>
      <title>{seo.title}</title>
      <meta
        name="description"
        content={seo.description}
        key="meta-description"
      />
    </Head>
    <SpecialtyHeader specialtyName={name} />
    <Practitioners practitioners={practitioners} />
  </div>
);

export const getStaticProps = async (context: GetStaticPropsContext) => {
  const specialtyCode = context.params?.["specialtyCode"];

  if (typeof specialtyCode !== "string") {
    return {
      notFound: true,
    };
  }

  const [specialty, { results }, appointments] = await Promise.all([
    specialtiesService.findByCode(specialtyCode),
    practitionersService.listBySpecialtyCode(specialtyCode),
    appointmentsService.getPractitionersAppointments(specialtyCode),
  ]);

  const props = {
    specialty,
    practitioners: results
      .map((practitioner) => ({
        ...practitioner,
        appointments: appointments[practitioner.id] || [],
      }))
      .sort((a, b) => b.appointments.length - a.appointments.length),
  };

  return {
    props,
    revalidate: 60 * 5,
  };
};

export const getStaticPaths = () => ({
  paths: [],
  fallback: "blocking",
});

export default Specialty;
