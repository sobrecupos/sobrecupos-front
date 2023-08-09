import { Card } from "@marketplace/ui/card";
import { getComponentClassNames } from "@marketplace/ui/namespace";
import Link from "next/link";
import { useId } from "react";
import "./entry.scss";

export type EntryProps = {
  href: string;
  fields: {
    label: string;
    value: string;
  }[];
};

const classes = getComponentClassNames("entry", {
  label: "label",
  value: "value",
  group: "group",
});

export const Entry = ({ href, fields }: EntryProps) => {
  const id = useId();

  return (
    <Link href={href} className={classes.namespace}>
      <Card>
        {fields.map(({ label, value }) => (
          <div key={`field-${id}-${label}-${value}`} className={classes.group}>
            <span className={classes.label}>{label}: </span>
            <span className={classes.value}>{value}</span>
          </div>
        ))}
      </Card>
    </Link>
  );
};
