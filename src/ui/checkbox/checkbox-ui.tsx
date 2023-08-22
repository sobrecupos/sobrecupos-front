import classNames from "classnames";
import { ChangeEvent, FocusEvent } from "react";
import { getComponentClassNames } from "../namespace";
import "./checkbox.scss";

export type CheckboxUIProps = {
  checked?: boolean;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (event: FocusEvent<HTMLInputElement>) => void;
  label?: string;
  error?: string;
  name?: string;
  disabled?: boolean;
  className?: string;
  readOnly?: boolean;
};

const classes = getComponentClassNames("checkbox", {
  labelText: "label-text",
  fieldContainer: "field-container",
  field: "field",
  error: "error",
});

export const CheckboxUI = ({
  checked = false,
  onChange,
  onBlur,
  label,
  name,
  disabled,
  error,
  className,
  readOnly,
}: CheckboxUIProps) => (
  <label
    className={classNames(
      classes.namespace,
      {
        [`${classes.namespace}--error`]: error,
      },
      className
    )}
  >
    <div className={classes.fieldContainer}>
      <input
        className={classes.field}
        name={name}
        checked={checked}
        onChange={onChange}
        onBlur={onBlur}
        disabled={disabled}
        type="checkbox"
        readOnly={readOnly}
      />
      {label ? <span className={classes.labelText}>{label}</span> : null}
    </div>
    {error ? <span className={classes.error}>{error}</span> : null}
  </label>
);
