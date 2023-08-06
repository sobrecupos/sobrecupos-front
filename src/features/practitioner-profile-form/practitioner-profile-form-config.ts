import { required } from "../form/validators/required";
import { requiredWithoutDefault } from "../form/validators/required-without-default";

export const practitionerProfileFormRules = {
  names: {
    validator: required,
    message: "Ingresa un nombre",
  },
  firstSurname: {
    validator: required,
    message: "Ingresa un apellido",
  },
  description: {
    validator: required,
    message: "Ingresa una breve descripción sobre ti",
  },
  licenseId: {
    validator: required,
    message: "Ingresa tu número de SIS",
  },
  specialty: {
    validator: requiredWithoutDefault,
    message: "Selecciona una especialidad",
  },
  practices: {
    validator: (value: unknown[]) => Promise.resolve(value.length === 0),
    message: "Ingresa al menos una dirección",
  },
};

export const practitionerProfileFormDefaults = {
  names: "",
  firstSurname: "",
  secondSurname: "",
  phone: "",
  description: "",
  licenseId: "",
  specialty: "default",
  practices: [],
};
