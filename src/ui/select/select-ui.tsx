import classNames from "classnames";
import { ChangeEvent, FocusEvent, useId } from "react";
import { getComponentClassNames } from "../namespace";
import "./select.scss";

export type SelectUIProps = {
  options: {
    value: string;
    label: string;
    disabled?: boolean;
  }[];
  value?: string;
  onChange?: (value: ChangeEvent<HTMLSelectElement>) => void;
  onBlur?: (event: FocusEvent) => void;
  label?: string;
  error?: string;
  className?: string;
  name?: string;
};

const classes = getComponentClassNames("select", {
  labelText: "label-text",
  field: "field",
  error: "error",
});

export const SelectUI = ({
  options,
  value,
  onChange,
  onBlur,
  label,
  error,
  className,
}: SelectUIProps) => {
  const id = useId();

  return (
    <label
      className={classNames(
        classes.namespace,
        {
          [`${classes.namespace}--error`]: error,
        },
        className
      )}
    >
      {label ? <span className={classes.labelText}>{label}</span> : null}
      <select
        className={classes.field}
        onBlur={onBlur}
        onChange={onChange}
        value={value}
      >
        {options.map(({ value, label: optionLabel, disabled }) => (
          <option key={`${id}-${value}`} value={value} disabled={disabled}>
            {optionLabel}
          </option>
        ))}
      </select>
      {error ? <span className={classes.error}>{error}</span> : null}
    </label>
  );
};
