import { getComponentClassNames } from "@marketplace/ui/namespace";
import Image from "next/image";
import Link from "next/link";
import { Practitioner } from "./types";

export type PractitionerCardProps = Practitioner;

const classes = getComponentClassNames("practitioner-card", {
  link: 'link',
  imageContainer: 'image-container',
  image: 'image',
  content: 'content',
  title: 'title',
  specialty: 'specialty',
  addressesContainer: 'addresses-container',
  addressesTitle: 'addresses-title',
  addresses: 'addresses',
  address: 'address',
  action: 'action',
  actionLabel: 'action-label',
  actionIcon: 'action-icon',
});

export const PractitionerCard = ({
  picture,
  name,
  code,
  addressTags,
  specialty,
}: PractitionerCardProps) => (
  <li className={classes.namespace}>
    <Link href={`/profesional/${code}`} className={classes.link}>
      <div className={classes.imageContainer}>
        <Image src={picture} alt={name} height="100" width="100" className={classes.image} />
      </div>
      <div className={classes.content}>
        <h3 className={classes.title}>{name}</h3>
        <div className={classes.specialty}>
          {specialty}
        </div>
        <div className={classes.addressesContainer}>
          <div className={classes.addressesTitle}>Lugar de atención:</div>
          <div className={classes.addresses}>
            {addressTags.map(tag => <div key={`address-${code}-${tag}`} className={classes.address}>{tag}</div>)}
          </div>
        </div>
      </div>
      <button className={classes.action}><span className={classes.actionLabel}>Ver sobrecupos</span><span className={classes.actionIcon}>-&gt;</span></button>
    </Link>
  </li>
);
