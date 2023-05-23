import { Icon } from "@marketplace/ui/icon";
import { getComponentClassNames } from "@marketplace/ui/namespace";
import classNames from "classnames";
import Image from "next/image";

const classes = getComponentClassNames("about-us", {
  imageContainer: "image-container",
  image: "image",
  content: "content",
  arrow: "arrow",
  card: "card",
  title: "title",
  text: "text",
  highlight: "highlight",
});

export const AboutUs = () => (
  <div className={classes.namespace}>
    <h5 className={classes.title}>Fácil de usar</h5>
    <div className={classes.content}>
      <div className={classes.card}>
        <div className={classes.imageContainer}>
          <Image
            src="/about-us-1.webp"
            alt="Persona meditando"
            width="191"
            height="191"
            className={classes.image}
          />
        </div>
        <p className={classes.text}>
          Selecciona y toma la{" "}
          <span className={classes.highlight}>
            autorización de tu sobrecupo
          </span>
        </p>
      </div>
      <div className={classNames(classes.arrow, classes.highlight)}>
        <Icon id="arrow-down" variant="solid" />
        <Icon id="arrow-right" variant="solid" />
      </div>
      <div className={classes.card}>
        <div className={classes.imageContainer}>
          <Image
            src="/about-us-2.webp"
            alt="Persona meditando"
            width="191"
            height="191"
            className={classes.image}
          />
        </div>
        <p className={classes.text}>
          <span className={classes.highlight}>Acude al centro médico</span> y
          paga tu consulta
        </p>
      </div>
      <div className={classNames(classes.arrow, classes.highlight)}>
        <Icon id="arrow-down" variant="solid" />
        <Icon id="arrow-right" variant="solid" />
      </div>
      <div className={classes.card}>
        <div className={classes.imageContainer}>
          <Image
            src="/about-us-3.webp"
            alt="Persona meditando"
            width="191"
            height="191"
            className={classes.image}
          />
        </div>
        <p className={classes.text}>
          Resuelve tu problema de salud{" "}
          <span className={classes.highlight}>el mismo día</span>
        </p>
      </div>
    </div>
  </div>
);
