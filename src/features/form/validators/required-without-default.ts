export const requiredWithoutDefault = (value?: unknown) =>
  Promise.resolve(!value || value === "default");
