import { appointmentsService } from "@marketplace/data-access/appointments/appointments.service";
import { specialtiesService } from "@marketplace/data-access/specialties/specialties.service";
import { Metadata } from "next";
import { AboutUs } from "../../features/home/about-us";
import { Enrollment } from "../../features/home/enrollment";
import { Header } from "../../features/home/header";
import { Specialties } from "../../features/home/specialties";
import "./page.scss";

export const revalidate = 60 * 15;

const HomePage = async () => {
  const specialties = await specialtiesService.list();
  const countBySpecialty: { [key: string]: number } = {};
  for (const specialty of specialties) {
    // console.log('specialty: ', specialty)
    countBySpecialty[specialty.code] = await appointmentsService
      .getCountAppointmentsBySpecialty(specialty.code)
      .then((res) => {
        // console.log('res.count: ', res.count)
        return res.count || 0;
      });
  }
  return (
    <div className="ui-mp-home">
      <Header />
      <Specialties
        specialties={specialties}
        countBySpecialty={countBySpecialty}
      />
      <AboutUs />
      <Enrollment />
    </div>
  );
};

export const metadata: Metadata = {
  title: "Sobrecupos",
  description:
    "¡No te quedes esperando! Consigue un sobrecupo médico en nuestra plataforma hoy mismo y sigue disfrutando de tu día sin interrupciones.",
};

export default HomePage;
