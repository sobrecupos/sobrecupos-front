import { ButtonLink } from "@marketplace/ui/button";
import { getComponentClassNames } from "@marketplace/ui/namespace";
import "./enrollment.scss";

const classes = getComponentClassNames("enrollment", {
  imageContainer: "image-container",
  image: "image",
  content: "content",
  title: "title",
  button: "button",
  highlight: "highlight",
});

export const Enrollment = () => (
  <div className={classes.namespace}>
    <div className={classes.content}>
      <p className={classes.title}>
        ¿Eres <span className={classes.highlight}>médico</span> y realizas
        sobrecupos?
      </p>
      <ButtonLink
        href="https://sobrecupos.pro"
        variant="secondary"
        className={classes.button}
      >
        Quiero más información
      </ButtonLink>
    </div>
  </div>
);
