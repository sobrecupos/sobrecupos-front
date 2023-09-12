import { getComponentClassNames } from "@marketplace/ui/namespace";
import { Appointment } from "@marketplace/utils/types/appointments";
import { PublicPractitionerProfileResponse } from "@marketplace/utils/types/practitioners";
import { PractitionerCard } from "./practitioner-card";

export type PractitionersProps = {
  practitioners: (PublicPractitionerProfileResponse & {
    appointments: Appointment[];
  })[];
};

const classes = getComponentClassNames("practitioners", {});

export const Practitioners = ({ practitioners }: PractitionersProps) => (
  <ul className={classes.namespace}>
    {practitioners.map((props) => (
      <PractitionerCard {...props} key={`professional-card-${props.code}`} />
    ))}
  </ul>
);
