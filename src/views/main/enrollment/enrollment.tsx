import { Modal } from "@marketplace/ui/legacy/modal";
import { getComponentClassNames } from "@marketplace/ui/namespace";
import { PractitionerSignupForm } from "@marketplace/ui/legacy/practitioner-signup-form";
import Image from "next/image";
import { useState } from "react";

const classes = getComponentClassNames("enrollment", {
  imageContainer: "image-container",
  image: "image",
  content: "content",
  title: "title",
  button: "button",
  highlight: "highlight",
});

export const Enrollment = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
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
          ¿Eres <span className={classes.highlight}>médico</span> y realizas
          sobrecupos?
        </p>
        <button className={classes.button} onClick={() => setIsModalOpen(true)}>
          Quiero más información
        </button>
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        variant="small"
        showCloseButton
        closeOnBackdropClick
      >
        <PractitionerSignupForm />
      </Modal>
    </div>
  );
};
