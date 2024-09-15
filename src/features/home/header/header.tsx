"use client";
import { Modal } from "@marketplace/ui/modal";
import { getComponentClassNames } from "@marketplace/ui/namespace";
import Image from "next/image";
import { useState } from "react";
import { AboutUs } from "../about-us";
import "./header.scss";

const classes = getComponentClassNames("header", {
  title: "title",
  cta: "cta",
  subtitle: "subtitle",
  highlight: "highlight",
});

export const Header = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <div className={classes.namespace}>
      <p className={classes.title}>¿Frustrado de buscar una hora médica?</p>
      <h1 className={classes.cta}>
        Consigue un <span className={classes.highlight}>Sobrecupo</span> aquí!
      </h1>
      <p className={classes.subtitle}>
        Selecciona una especialidad y <strong>¡mejora tu salud ahora!</strong>
      </p>
      <button
        className="bg-transparent text-indigo-600 "
        onClick={() => {
          setIsModalOpen(true);
        }}
      >
        ¿Qué es un sobrecupo médico?
      </button>
      <Modal
        variant="fullscreen"
        className="pt-6"
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
        }}
        closeOnBackdropClick={false}
        title={
          <Image
            src="/brand-logo-v2.svg"
            alt="Logo sobrecupos"
            width="180"
            height="34"
          />
        }
        renderBody={({ close }) => (
          <div className="p-8">
            <p className="text-xl font-semibold py-4">¿Qué es un sobrecupo?</p>
            <p>
              Un sobrecupo es cuando uno de nuestros médico(a)s está dispuesto
              ayudarte con una hora de atención extraordinaria a su agenda,
              porque sabe que tú lo necesitas, para que puedas sentirte mejor y
              no pierdas tiempo enfermo(a) con una larga espera o ansiedad por
              no encontrar una por oportunidad de atención pronta.
            </p>
            <AboutUs />
          </div>
        )}
        showCloseButton
      />
    </div>
  );
};
