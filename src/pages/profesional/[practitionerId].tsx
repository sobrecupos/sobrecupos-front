import { getComponentClassNames } from "@marketplace/ui/namespace";
import { AboutMe } from "@marketplace/views/practitioner/about-me";
import { ProfileCard } from "@marketplace/views/practitioner/profile-card";
import { Schedule } from "@marketplace/views/practitioner/schedule";

const classes = getComponentClassNames('practitioner', {
  profile: 'profile'
})

const Practitioner = ({ profile, schedules }: any) => (
  <div className={classes.namespace}>
    <div className={classes.profile}>
      <ProfileCard {...profile} />
      <AboutMe description={profile.description} />
    </div>
    <Schedule schedules={schedules} practitioner={profile.name} />
  </div>
);

export const getServerSideProps = () => {
  return {
    props: {
      profile: {
        name: "José Peña",
        specialty: "Oftalmología",
        picture:
          "https://sobrecupos.com/wp-content/uploads/2023/03/doc-jose-pena.jpg",
        insuranceProviders: ["Isapre", "Fonasa", "Particular"],
        licenseId: "83061",
        description:
          "Oftalmólogo de 13 años de experiencia, formación Universidad de Chile. Me dedico a Oftalmologia general adultos, glaucoma, conjuntivitis, Cirugia refractiva láser.",
      },
      schedules: [
        {
          date: "Domingo 30/04",
          address:
            "Clinica Santa Maria, Avenida Santa Maria 0500, Providencia, Santiago",
          insuranceProviders: ["Fonasa", "Isapre", "Particular"],
          timeSlots: [
            {
              id: "123",
              label: "09:00 a 09:59",
            },
            {
              id: "234",
              label: "10:00 a 10:59",
            },
            {
              id: "345",
              label: "11:00 a 11:59",
            },
            {
              id: "456",
              label: "12:00 a 12:59",
            },
          ],
        },
        {
          date: "Domingo 30/04",
          address:
            "Clinica Santa Maria, Avenida Santa Maria 1000, Providencia, Santiago",
          insuranceProviders: ["Fonasa", "Isapre"],
          timeSlots: [
            {
              id: "123",
              label: "09:00 a 09:59",
            },
            {
              id: "234",
              label: "10:00 a 10:59",
            },
          ],
        },
      ],
    },
  };
};

export default Practitioner;
