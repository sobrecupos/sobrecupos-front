'use client';
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
          setIsModalOpen(true
          );
        }
        }
      >Que es un sobrecupo médico</button>
      <Modal
        variant="middle"
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
        }}
        closeOnBackdropClick={false}
        title={
          <Image
            src="/brand-logo.png"
            alt="Logo sobrecupos"
            width="218"
            height="34"
          />
        }
        renderBody={({ close }) => (
          <div className="p-8">
            <p className="text-xl font-semibold py-4">¿Qué es un sobrecupo?</p>
            <p>
              Un sobrecupo es una hora médica que se libera en el sistema de
              salud, generalmente por cancelación de un paciente. Estas horas
              médicas son muy valiosas y pueden ser reservadas por cualquier
              persona que necesite atención médica de manera inmediata o pronta.
            </p>
            <AboutUs />
          </div>
        )}
        showCloseButton
      />
    </div>
  )
};
