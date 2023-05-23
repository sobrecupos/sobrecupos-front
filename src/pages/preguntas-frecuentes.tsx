import { getComponentClassNames } from "@marketplace/ui/namespace";
import { FAQList } from "@marketplace/views/faq/faq-list";

const classes = getComponentClassNames("faq", {});

export default function FAQ() {
  return (
    <div className={classes.namespace}>
      <FAQList />
    </div>
  );
}
