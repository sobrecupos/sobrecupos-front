import classNames from "classnames";
import { ChangeEvent } from "react";
import { getComponentClassNames } from "../namespace";
import "./input.scss";

export type InputProps = {
  value?: string;
  onChange?: (value: string) => void;
  label?: string;
  error?: string;
  name?: string;
  disabled?: boolean;
  type?: string;
  className?: string;
  readOnly?: boolean;
};

const classes = getComponentClassNames("input", {
  labelText: "label-text",
  field: "field",
  error: "error",
});

export const Input = ({
  value = "",
  onChange,
  label,
  name,
  disabled,
  error,
  className,
  readOnly,
  type = "text",
}: InputProps) => {
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    onChange?.(value);
  };

  return (
    <label
      className={classNames(
        classes.namespace,
        {
          [`${classes.namespace}--error`]: error,
          [`${classes.namespace}--hidden`]: type === "hidden",
        },
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
        readOnly={readOnly}
      />
      {error ? <span className={classes.error}>{error}</span> : null}
    </label>
  );
};
