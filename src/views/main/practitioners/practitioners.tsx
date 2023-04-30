import { getComponentClassNames } from "@marketplace/ui/namespace";
import Image from "next/image";

const classes = getComponentClassNames("practitioners", {
  imageContainer: 'image-container',
  image: "image",
  content: "content",
  title: "title",
  button: "button",
  highlight: 'highlight',
});

export const Practitioners = () => (
  <div className={classes.namespace}>
    <div className={classes.imageContainer}>
      <Image
        src="/practitioners.webp"
        alt="Persona meditando"
        width="460"
        height="313"
        className={classes.image}
      />
    </div>
    <div className={classes.content}>
      <p className={classes.title}>
        ¿Eres <span className={classes.highlight}>médico</span> y realizas sobrecupos?
      </p>
      <button className={classes.button}>
        Quiero más información
      </button>
    </div>
  </div>
);
