import { getComponentClassNames } from "@marketplace/ui/namespace";
import Image from "next/image";

const classes = getComponentClassNames("about-us", {
  imageContainer: 'image-container',
  image: "image",
  content: "content",
  title: "title",
  text: "text",
  highlight: 'highlight',
});

export const AboutUs = () => (
  <div className={classes.namespace}>
    <div className={classes.imageContainer}>
      <Image
        src="/about-us.webp"
        alt="Persona meditando"
        width="363"
        height="281"
        className={classes.image}
      />
    </div>
    <div className={classes.content}>
      <h5 className={classes.title}>¿Qué es un <span className={classes.highlight}>sobrecupo</span>?</h5>
      <p className={classes.text}>
        Imagina poder atender tu problema de salud en el mismo día, sin tener
        que esperar semanas o incluso meses por una cita. Con{" "}
        <strong>sobrecupos</strong>, tendrás acceso prioritario a la atención
        médica que necesitas, sin sacrificar la calidad de la atención.
      </p>
    </div>
  </div>
);
