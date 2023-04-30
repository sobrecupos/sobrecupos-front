import { getComponentClassNames } from "@marketplace/ui/namespace";
import { Practitioner } from "./types";
import { PractitionerCard } from "./practitioner-card";

export type PractitionersProps = {
  practitioners: Practitioner[];
};

const classes = getComponentClassNames("practitioners", {});

export const Practitioners = ({ practitioners }: PractitionersProps) => (
  <ul className={classes.namespace}>
    {practitioners.map((props) => (
      <PractitionerCard {...props} key={`professional-card-${props.code}`} />
    ))}
  </ul>
);
