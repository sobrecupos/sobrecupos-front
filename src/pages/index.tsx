import { getComponentClassNames } from "@marketplace/ui/namespace";
import { AboutUs } from "@marketplace/views/main/about-us";
import { Header } from "@marketplace/views/main/header";
import { Enrollment } from "@marketplace/views/main/enrollment";
import { Specialties } from "@marketplace/views/main/specialties";

const specialties = [
  { code: "pediatria", label: "Pediatría" },
  { code: "otorrino", label: "Otorrino" },
  { code: "oftalmologia", label: "Oftalmología" },
  { code: "traumatologia", label: "Traumatología" },
  { code: "medicina-general", label: "Medicina general" },
  { code: "neurologia", label: "Neurología" },
  { code: "cirugia", label: "Cirugía" },
  { code: "inmunologia-y-alergias", label: "Inmunología y alergias" },
];

const { namespace } = getComponentClassNames("home", {});

export default function Home() {
  return (
    <div className={namespace}>
      <Header />

      <Specialties specialties={specialties} />

      <AboutUs />

      <Enrollment />
    </div>
  );
}
