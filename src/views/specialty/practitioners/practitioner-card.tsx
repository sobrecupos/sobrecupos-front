import { getComponentClassNames } from "@marketplace/ui/namespace";
import Image from "next/image";
import Link from "next/link";
import { Practitioner } from "./types";
import { Icon } from "@marketplace/ui/icon";
import { PropsWithChildren } from "react";

export type PractitionerCardProps = Practitioner;

const classes = getComponentClassNames("practitioner-card", {
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
  disabled ? (
    <div className={className}>{children}</div>
  ) : (
    <Link href={href} className={className}>
      {children}
    </Link>
  );

export const PractitionerCard = ({
  picture,
  name,
  code,
  addressTags,
  specialty,
  timeSlotCount,
}: PractitionerCardProps) => (
  <li className={classes.namespace}>
    <Wrapper
      disabled={timeSlotCount === 0}
      href={`/profesional/${code}`}
      className={classes.link}
    >
      <div className={classes.imageContainer}>
        <Image
          src={picture}
          alt={name}
          height="100"
          width="100"
          className={classes.image}
        />
      </div>
      <div className={classes.content}>
        <h3 className={classes.title}>{name}</h3>
        <div className={classes.specialty}>{specialty}</div>
        <div className={classes.addressesContainer}>
          <div className={classes.addresses}>
            {addressTags.map((tag) => (
              <div key={`address-${code}-${tag}`} className={classes.address}>
                <span className={classes.addressIcon}>
                  <Icon id="map-location-dot" variant="solid" />
                </span>
                {tag}
              </div>
            ))}
          </div>
        </div>
      </div>
      <button className={classes.action} disabled={timeSlotCount === 0}>
        {timeSlotCount === 0 ? "No tengo sobrecupos" : null}
        {timeSlotCount === 1 ? "Tengo 1 sobrecupo" : null}
        {timeSlotCount > 1 ? `Tengo ${timeSlotCount} sobrecupos` : null}
      </button>
    </Wrapper>
  </li>
);
