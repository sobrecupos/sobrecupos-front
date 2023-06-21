import { getComponentClassNames } from "@marketplace/ui/namespace";
import { FAQList } from "@marketplace/views/faq/faq-list";
import Head from "next/head";

const classes = getComponentClassNames("faq", {});

export default function FAQ() {
  return (
    <>
      <Head>
        <title>Preguntas frecuentes | Sobrecupos</title>
        <meta name="robots" content="noindex" data-testid="seo-robots" />
      </Head>
      <div className={classes.namespace}>
        <FAQList />
      </div>
    </>
  );
}
