import { Icon } from "@marketplace/ui/legacy/icon";
import { getComponentClassNames } from "@marketplace/ui/namespace";
import Image from "next/image";
import Link from "next/link";

export type ProfileCardProps = {
  name: string;
  picture: string;
  specialty: string;
  licenseId: string;
};

const classes = getComponentClassNames("profile-card", {
  imageContainer: "image-container",
  image: "image",
  details: "details",
  title: "title",
  subtitle: "subtitle",
  insurances: "insurances",
  licenseContainer: "license-container",
  license: "license",
  licenseImage: "license-image",
  action: "action",
});

export const ProfileCard = ({
  name,
  picture,
  specialty,
  licenseId,
}: ProfileCardProps) => (
  <div className={classes.namespace}>
    <div className={classes.imageContainer}>
      <Image
        src={picture}
        alt={name}
        height="100"
        width="100"
        className={classes.image}
      />
    </div>
    <div className={classes.details}>
      <h1 className={classes.title}>{name}</h1>
      <h3 className={classes.subtitle}>{specialty}</h3>
    </div>
    <div className={classes.licenseContainer}>
      <div className={classes.license}>
        <Image
          src="/sis.png"
          alt={name}
          height="25"
          width="79"
          className={classes.licenseImage}
        />
        <span>Nº S.I.S {licenseId}</span>
      </div>
      <Link href="#sobrecupos" className={classes.action}>
        <Icon id="heart" /> Tu sobrecupo aquí
      </Link>
    </div>
  </div>
);
