import { getComponentClassNames } from "@marketplace/ui/namespace";
import { Appointment } from "@marketplace/utils/types/appointments";
import { PublicPractitionerProfileResponse } from "@marketplace/utils/types/practitioners";
import Image from "next/image";
import Link from "next/link";
import { PropsWithChildren } from "react";
import "./public-practitioner-card.scss";

type PublicPractitionerCardProps = Pick<
  PublicPractitionerProfileResponse,
  "picture" | "fullName" | "code" | "addressTags" | "specialty"
> & {
  appointments: Appointment[];
};

const classes = getComponentClassNames("public-practitioner-card", {
  link: "link",
  imageContainer: "image-container",
  image: "image",
  content: "content",
  title: "title",
  specialty: "specialty",
  addressesContainer: "addresses-container",
  addresses: "addresses",
  address: "address",
  addressIcon: "address-icon",
  action: "action",
});

const Wrapper = ({
  disabled,
  href,
  className,
  children,
}: PropsWithChildren<{ disabled: boolean; href: string; className: string }>) =>
(
  <Link href={href} className={className}>
    {children}
  </Link>
);

export const PublicPractitionerCard = ({
  picture,
  fullName,
  code,
  addressTags,
  specialty,
  appointments,
}: PublicPractitionerCardProps) => (
  <li className={classes.namespace}>
    <Wrapper
      disabled={false}
      href={`/profesional/${code}`}
      className={classes.link}
    >
      <div className={classes.imageContainer}>
        <Image
          src={picture}
          alt={fullName}
          height="100"
          width="100"
          className={classes.image}
        />
      </div>
      <div className={classes.content}>
        <h3 className={classes.title}>{fullName}</h3>
        <div className={classes.specialty}>{specialty.name}</div>
        <div className={classes.addressesContainer}>
          <div className={classes.addresses}>
            {addressTags.map((tag) => (
              <div key={`address-${code}-${tag}`} className={classes.address}>
                {tag}
              </div>
            ))}
          </div>
        </div>
      </div>
      <button className={classes.action} >
        {appointments.length === 0 ? "No tengo sobrecupos" : null}
        {appointments.length === 1 ? "Tengo 1 sobrecupo" : null}
        {appointments.length > 1
          ? `Tengo ${appointments.length} sobrecupos`
          : null}
      </button>
    </Wrapper>
  </li>
);
