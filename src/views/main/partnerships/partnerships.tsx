import { getComponentClassNames } from "@marketplace/ui/namespace";
import Image from "next/image";
import Link from "next/link";

const partners = [
  {
    href: "https://www.pasteur.cl/",
    label: "Clínica oftalmológica Pasteur",
    id: "clinica-oftalmologica-pasteur",
  },
  {
    href: "https://centroconvision.cl/",
    label: "Centro oftalmológico Convisión",
    id: "centro-oftalmologico-convision",
  },
];

const classes = getComponentClassNames("partnerships", {
  title: "title",
  partners: 'partners',
  partner: "partner",
});

export const Partnerships = () => (
  <div className={classes.namespace}>
    <h6 className={classes.title}>Clínicas y centros médicos asociados</h6>
    <div className={classes.partners}>
      {partners.map(({ href, id, label }) => (
        <Link
          className={classes.partner}
          href={href}
          aria-label={label}
          key={id}
        >
          <Image width={204} height={65} src={`/partner-${id}.webp`} alt={label} />
        </Link>
      ))}
    </div>
  </div>
);
