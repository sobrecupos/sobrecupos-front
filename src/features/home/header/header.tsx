import { getComponentClassNames } from "@marketplace/ui/namespace";
import "./header.scss";

const classes = getComponentClassNames("header", {
  title: "title",
  cta: "cta",
  subtitle: "subtitle",
  highlight: "highlight",
});

export const Header = () => (
  <div className={classes.namespace}>
    <p className={classes.title}>¿Frustrado de buscar una hora médica?</p>
    <h1 className={classes.cta}>
      Consigue un <span className={classes.highlight}>Sobrecupo</span> aquí!
    </h1>
    <p className={classes.subtitle}>
      Selecciona una especialidad y <strong>¡mejora tu salud ahora!</strong>
    </p>
  </div>
);
