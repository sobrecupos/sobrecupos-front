import { getComponentClassNames } from "@marketplace/ui/namespace";
import Link from "next/link";

export type SpecialtiesProps = {
  specialties: {
    code: string;
    label: string;
  }[];
};

const specialtiesClasses = getComponentClassNames("specialties", {
  card: "card",
});

export const Specialties = ({ specialties }: SpecialtiesProps) => (
  <div className={specialtiesClasses.namespace}>
    {specialties.map(({ code, label }) => (
      <Link
        href={`/especialidades/${code}`}
        className={specialtiesClasses.card}
        key={`specialty-card-${code}`}
      >
        {/* <Image src={`/${code}.png`} alt={label} /> */}
        <h3>{label}</h3>
      </Link>
    ))}
  </div>
);
