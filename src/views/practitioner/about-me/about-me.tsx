import { getComponentClassNames } from "@marketplace/ui/namespace";

export type AboutMeProps = {
  description: string;
};

const classes = getComponentClassNames("about-me", {
  title: "title",
  text: "text",
});

export const AboutMe = ({ description }: AboutMeProps) => (
  <div className={classes.namespace}>
    <div className={classes.title}>Sobre mi:</div>
    <p className={classes.text}>{description}</p>
  </div>
);
