import { getComponentClassNames } from "@marketplace/ui/namespace";

export type SpecialtyHeaderProps = {
  specialtyName: string;
};

const classes = getComponentClassNames("specialty-header", {
  title: "title",
  specialty: "specialty",
  description: "description",
});

export const SpecialtyHeader = ({ specialtyName }: SpecialtyHeaderProps) => (
  <div className={classes.namespace}>
    <p className={classes.title}>Especialidad</p>
    <h1 className={classes.specialty}>{specialtyName}</h1>
    <p className={classes.description}>
      En sobrecupos todos nuestros profesionales cuentan con la autorización del
      Ministerio de Salud
    </p>
  </div>
);
