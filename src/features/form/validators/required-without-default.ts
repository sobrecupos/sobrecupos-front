export const requiredWithoutDefault = (value?: unknown) =>
  !!value && value !== "default";
