import classNames from "classnames";
import { ComponentPropsWithoutRef } from "react";
import { getComponentClassNames } from "../namespace";
import "./input-ui.scss";

export type InputUIProps = ComponentPropsWithoutRef<"input"> & {
  value?: string;
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

export const InputUI = ({
  value = "",
  label,
  name,
  disabled,
  error,
  className,
  type = "text",
  ...nativeInputProps
}: InputUIProps) => (
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
      {...nativeInputProps}
      className={classes.field}
      name={name}
      value={value}
      disabled={disabled}
      type={type}
    />
    {error ? <span className={classes.error}>{error}</span> : null}
  </label>
);
