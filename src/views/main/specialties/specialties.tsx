import { getComponentClassNames } from "@marketplace/ui/namespace";
import Image from "next/image";
import Link from "next/link";

export type SpecialtiesProps = {
  specialties: {
    code: string;
    label: string;
  }[];
};

const classes = getComponentClassNames("specialties", {
  card: "card",
  image: "image",
  cardTitle: 'card-title',
});

export const Specialties = ({ specialties }: SpecialtiesProps) => (
  <div className={classes.namespace}>
    {specialties.map(({ code, label }) => (
      <Link
        href={`/especialidades/${code}`}
        className={classes.card}
        key={`specialty-card-${code}`}
      >
        <Image
          className={classes.image}
          src={`/${code}.png`}
          alt={label}
          height="85"
          width="85"
        />
        <h3 className={classes.cardTitle}>{label}</h3>
      </Link>
    ))}
  </div>
);
