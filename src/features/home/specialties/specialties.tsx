import { getComponentClassNames } from "@marketplace/ui/namespace";
import { SpecialtyResponse } from "@marketplace/utils/types/specialties";
import Image from "next/image";
import Link from "next/link";
import "./specialties.scss";

export type SpecialtiesProps = {
  specialties: SpecialtyResponse[];
};

const classes = getComponentClassNames("specialties", {
  card: "card",
  image: "image",
  cardTitle: "card-title",
});

export const Specialties = ({ specialties }: SpecialtiesProps) => (
  <div className={classes.namespace}>
    {specialties.map(({ code, name, picture }) => (
      <Link
        href={`/especialidades/${code}`}
        className={classes.card}
        key={`specialty-card-${code}`}
      >
        <Image
          className={classes.image}
          src={picture}
          alt={name}
          height="85"
          width="85"
        />
        <h3 className={classes.cardTitle}>{name}</h3>
      </Link>
    ))}
  </div>
);
