import { Badge } from "@marketplace/ui/badge";
import { Button } from "@marketplace/ui/button";
import { Card } from "@marketplace/ui/card";
import { getComponentClassNames } from "@marketplace/ui/namespace";
import "./practitioner-profile-practices.scss";

export type PractitionerProfilePracticesProps = {
  practices: {
    _id: string;
    address: string;
    insuranceProviders: { name: string; isActive: boolean }[];
  }[];
  error?: string;
  onAdd: () => void;
  onEdit: (index: number) => void;
  onRemove: (index: number) => void;
};

const classes = getComponentClassNames("practitioner-profile-practices", {
  practiceContainer: "practice-container",
  address: "address",
  actions: "actions",
  action: "action",
  error: "error",
});

export const PractitionerProfilePractices = ({
  error,
  practices,
  onAdd,
  onEdit,
  onRemove,
}: PractitionerProfilePracticesProps) => (
  <div className={classes.namespace}>
    {practices.map(({ address, insuranceProviders }, index) => (
      <Card
        key={`address-readonly-${address}`}
        className={classes.practiceContainer}
      >
        <p className={classes.address}>{address}</p>
        {insuranceProviders.map(({ name, isActive }) =>
          isActive ? (
            <Badge key={`insurance-provider-${address}-${name}`}>{name}</Badge>
          ) : null
        )}
        <div className={classes.actions}>
          <Button
            className={`${classes.action}--delete`}
            variant="text"
            onClick={() => onRemove(index)}
          >
            Eliminar
          </Button>
          <Button variant="text" onClick={() => onEdit(index)}>
            Editar
          </Button>
        </div>
      </Card>
    ))}
    <span className={classes.error}>{error}</span>
    <Button onClick={onAdd} variant="neutral" block>
      Agregar dirección
    </Button>
  </div>
);
