import { getComponentClassNames } from "@marketplace/ui/namespace";
import { SpecialtyResponse } from "@marketplace/utils/types/specialties";
import classNames from "classnames";
import { ButtonLink } from "../../../ui/button";
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
    {specialties.map(({ id, code, name }, index) => (
      <ButtonLink
        key={`specialty-card-${id}`}
        href={`/especialidades/${code}`}
        className={classNames(
          classes.card,
          `${classes.card}--${index % specialties.length}`
        )}
      >
        <h3 className={classes.cardTitle}>{name}</h3>
      </ButtonLink>
    ))}
  </div>
);

export default Specialties;
