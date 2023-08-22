"use client";

import { ChangeEvent } from "react";
import { useField } from "../form";
import { SelectUI, SelectUIProps } from "./select-ui";

export type SelectProps = Omit<SelectUIProps, "onChange"> & {
  onChange?: (value: string) => void;
};

export const Select = ({ name, onChange, ...props }: SelectProps) => {
  const {
    setFieldValue,
    validateField,
    value: contextValue,
    errors,
  } = useField<string>(name);

  const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const { value } = event.target;

    if (onChange) {
      onChange(value);
      return;
    }

    if (name) {
      setFieldValue(name, value);
    }
  };

  return (
    <SelectUI
      value={contextValue}
      error={errors?.[0]}
      onBlur={() => validateField(name)}
      {...props}
      onChange={handleChange}
    />
  );
};
