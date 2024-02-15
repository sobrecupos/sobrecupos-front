import { Question } from "@marketplace/features/faq/question";
import { getComponentClassNames } from "@marketplace/ui/namespace";
import { Metadata } from "next";

const classes = getComponentClassNames("faq-page", {
  title: "title",
});

const FAQPage = () => (
  <div className={classes.namespace}>
    <h1 className={classes.title}>Preguntas frecuentes</h1>
    <p className="text-transparent">Sobrecupos v2024</p>

    <Question
      title="¿Qué es un sobrecupo?"
      text="Es una hora extraordinaria dentro de la agenda u horario de atención del médico(a). Que no es ofertada en agenda normal."
    />
    <Question
      title="¿Seré atendido en la hora ofertada?"
      text="La atención se concretara dentro de un rango de tiempo a la hora ofertada, dado que es una hora fuera de agenda normal. Pero el tiempo de espera será claramente menor a ir a un servicio de urgencia o esperar encontrar una hora en asentamiento normal."
    />
    <Question
      title="¿El pago por sobrecupo incluye el valor de la atención médica?"
      text="No, no incluye el valor de la consulta medica, la cual depende del convenio de seguros de salud o particular, según los valores del lugar de atención por el médico."
    />
    <Question
      title="¿Sobrecupos emite licencias médicas?"
      text="La plataforma de sobrecupos no da licencias medicas ni recetas de medicamentos. Para ello debes acudir con el medico que tomes sobrecupos y dependiendo de tu caso previa evaluación."
    />
  </div>
);

export const metadata: Metadata = {
  title: "Preguntas frecuentes | Sobrecupos",
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: {
      index: false,
      follow: false,
      noimageindex: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default FAQPage;
