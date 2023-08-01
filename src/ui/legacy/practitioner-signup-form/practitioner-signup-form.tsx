import Image from "next/image";
import { getComponentClassNames } from "../../namespace";

const classes = getComponentClassNames("practitioner-signup", {
  image: "image",
  title: "title",
  highlight: "highlight",
  subtitle: "subtitle",
  form: 'form',
  formElement: "form-element",
  label: "label",
  input: "input",
  submit: "submit",
});

export const PractitionerSignupForm = () => (
  <div className={classes.namespace}>
    <Image
      className={classes.image}
      src="/brand-logo.png"
      alt="Logo sobrecupos"
      width="218"
      height="34"
    />
    <div className={classes.title}>
      ¿Eres médico y quieres ser parte de{" "}
      <span className={classes.highlight}>Sobrecupos</span>?
    </div>
    <div className={classes.subtitle}>
      Déjanos tus datos y pronto nos contactaremos contigo
    </div>
    <form className={classes.form}>
      <label className={classes.formElement}>
        <span className={classes.label}>Nombre completo</span>
        <input
          className={classes.input}
          type="text"
          required
          placeholder="José Peña"
        />
      </label>
      <label className={classes.formElement}>
        <span className={classes.label}>Correo electrónico</span>
        <input
          className={classes.input}
          type="email"
          required
          placeholder="josepena@gmail.com"
        />
      </label>
      <label className={classes.formElement}>
        <span className={classes.label}>Teléfono</span>
        <input
          className={classes.input}
          type="tel"
          required
          placeholder="+56911223344"
        />
      </label>
      <button className={classes.submit} type="submit">
        Enviar
      </button>
    </form>
  </div>
);
