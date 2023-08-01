import classNames from "classnames";
import { ChangeEvent } from "react";
import { getComponentClassNames } from "../namespace";
import "./input.scss";

export type InputProps = {
  value: string;
  onChange: (value: string) => void;
  label?: string;
  error?: string;
  name?: string;
  disabled?: boolean;
  type?: string;
  className?: string;
};

const classes = getComponentClassNames("input", {
  labelText: "label-text",
  field: "field",
  error: "error",
});

export const Input = ({
  value,
  onChange,
  label,
  name,
  disabled,
  error,
  className,
  type = "text",
}: InputProps) => {
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    onChange(value);
  };

  return (
    <label
      className={classNames(
        classes.namespace,
        { [`${classes.namespace}--error`]: error },
        className
      )}
    >
      {label ? <span className={classes.labelText}>{label}</span> : null}
      <input
        className={classes.field}
        name={name}
        value={value}
        onChange={handleChange}
        disabled={disabled}
        type={type}
      />
      {error ? <span className={classes.error}>{error}</span> : null}
    </label>
  );
};
