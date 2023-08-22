import { ChangeEvent } from "react";
import { useField } from "../form";
import { CheckboxUI, CheckboxUIProps } from "./checkbox-ui";

export type CheckboxProps = Omit<CheckboxUIProps, "onChange"> & {
  onChange?: (checked: boolean) => void;
};

export const Checkbox = ({ name, onChange, ...props }: CheckboxProps) => {
  const {
    setFieldValue,
    validateField,
    value: isChecked,
    errors,
    disabled,
  } = useField<boolean>(name);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { checked } = event.target;

    if (onChange) {
      onChange(checked);
      return;
    }

    if (name) {
      setFieldValue(name, checked);
    }
  };

  return (
    <CheckboxUI
      checked={isChecked}
      error={errors?.[0]}
      disabled={disabled}
      onBlur={() => validateField(name)}
      {...props}
      onChange={handleChange}
    />
  );
};
