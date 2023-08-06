import { requiredWithoutDefault } from "../form/validators/required-without-default";
import { PracticeFormInsuranceProviders } from "./practice-form.types";

export const practiceFormRules = {
  address: {
    validator: requiredWithoutDefault,
    message: "Selecciona una dirección",
  },
  insuranceProviders: {
    validator: (value: PracticeFormInsuranceProviders) =>
      Promise.resolve(!value.some(({ isActive }) => isActive)),
    message: "Selecciona al menos una previsión",
  },
};

export const practiceFormDefaults = {
  address: "",
  insuranceProviders: [
    { name: "Fonasa", isActive: false },
    { name: "Isapre", isActive: false },
    { name: "Particular", isActive: false },
  ],
};
