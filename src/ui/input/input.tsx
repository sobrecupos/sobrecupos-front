import { ChangeEvent } from "react";
import { InputUI, InputUIProps } from "./input-ui";

export type InputProps = Omit<InputUIProps, "onChange"> & {
  onChange?: (value: string) => void;
};

export const Input = ({ onChange, ...inputUIProps }: InputProps) => {
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    onChange?.(value);
  };

  return <InputUI {...inputUIProps} onChange={handleChange} />;
};
