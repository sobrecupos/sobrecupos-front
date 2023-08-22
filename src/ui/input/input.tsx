import { ChangeEvent } from "react";
import { useField } from "../form";
import { InputUI, InputUIProps } from "./input-ui";

export type InputProps = Omit<InputUIProps, "onChange"> & {
  onChange?: (value: string) => void;
};

export const Input = ({ onChange, name, ...inputUIProps }: InputProps) => {
  const {
    setFieldValue,
    validateField,
    value: contextValue,
    errors,
    disabled,
  } = useField<string>(name);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
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
    <InputUI
      value={contextValue}
      error={errors?.[0]}
      disabled={disabled}
      onBlur={() => validateField(name)}
      {...inputUIProps}
      onChange={handleChange}
    />
  );
};
