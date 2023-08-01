import classNames from "classnames";
import { AlertCircle, CheckCircle2, Info, XCircle } from "lucide-react";
import { PropsWithChildren } from "react";
import { getComponentClassNames } from "../namespace";
import "./alert.scss";

const icons = {
  error: XCircle,
  warning: AlertCircle,
  info: Info,
  success: CheckCircle2,
};

export type AlertProps = PropsWithChildren<{
  type?: "success" | "error" | "warning" | "info";
  className?: string;
}>;

const getTypeIcon = (type: Required<AlertProps>["type"]) => icons[type];

const classes = getComponentClassNames("alert", {
  icon: "icon",
  text: "text",
});

export const Alert = ({ className, type = "info", children }: AlertProps) => {
  const Icon = getTypeIcon(type);
  return (
    <div
      className={classNames(
        classes.namespace,
        `${classes.namespace}--${type}`,
        className
      )}
    >
      <span className={classes.icon}>
        <Icon />
      </span>
      <div className={classes.text}>{children}</div>
    </div>
  );
};
