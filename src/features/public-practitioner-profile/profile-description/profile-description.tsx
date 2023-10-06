import { getComponentClassNames } from "@marketplace/ui/namespace";
import { HeartIcon } from "lucide-react";
import "./profile-description.scss";

export type ProfileDescriptionProps = {
  description: string;
};

const classes = getComponentClassNames("profile-description", {
  title: "title",
  text: "text",
  icon: "icon",
});

export const ProfileDescription = ({
  description,
}: ProfileDescriptionProps) => (
  <div className={classes.namespace}>
    <div className={classes.icon}>
      <HeartIcon size={16} />
    </div>
    <div>
      <div className={classes.title}>Sobre mi:</div>
      <p className={classes.text}>{description}</p>
    </div>
  </div>
);
