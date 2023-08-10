import { requiredWithoutDefault } from "../form/validators/required-without-default";
import { PractitionerPracticeFormInsuranceProviders } from "./practitioner-practice-form.types";

export const practitionerPracticeFormRules = {
  address: {
    validator: requiredWithoutDefault,
    message: "Selecciona una dirección",
  },
  insuranceProviders: {
    validator: (value: PractitionerPracticeFormInsuranceProviders) =>
      Promise.resolve(!value.some(({ isActive }) => isActive)),
    message: "Selecciona al menos una previsión",
  },
};

export const practitionerPracticeFormDefaults = {
  address: "",
  insuranceProviders: [
    { id: "1", name: "Fonasa", isActive: false },
    { id: "2", name: "Isapre", isActive: false },
    { id: "3", name: "Particular", isActive: false },
  ],
};
