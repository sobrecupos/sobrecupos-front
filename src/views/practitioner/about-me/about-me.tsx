import { Icon } from "@marketplace/ui/icon";
import { getComponentClassNames } from "@marketplace/ui/namespace";

export type AboutMeProps = {
  description: string;
};

const classes = getComponentClassNames("about-me", {
  title: "title",
  text: "text",
  icon: 'icon',
});

export const AboutMe = ({ description }: AboutMeProps) => (
  <div className={classes.namespace}>
    <div className={classes.icon}>
      <Icon id="heart" />
    </div>
    <div>
      <div className={classes.title}>Sobre mi:</div>
      <p className={classes.text}>{description}</p>
    </div>
  </div>
);
