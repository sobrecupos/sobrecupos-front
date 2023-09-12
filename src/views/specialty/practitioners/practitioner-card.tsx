import { getComponentClassNames } from "@marketplace/ui/namespace";
import { Appointment } from "@marketplace/utils/types/appointments";
import { PublicPractitionerProfileResponse } from "@marketplace/utils/types/practitioners";
import dayjs from "dayjs";
import Image from "next/image";
import Link from "next/link";
import { PropsWithChildren } from "react";

type PractitionerCardProps = PublicPractitionerProfileResponse & {
  appointments: Appointment[];
};

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
  fullName,
  code,
  addressTags,
  specialty,
  appointments,
}: PractitionerCardProps) => {
  const freeTimeSlots = appointments.filter(({ start }) => {
    const appointmentStart = dayjs(start);
    const now = dayjs();

    return (
      appointmentStart.isAfter(now) &&
      appointmentStart.isBefore(now.endOf("day"))
    );
  });
  const timeSlotCount = freeTimeSlots.length;

  return (
    <li className={classes.namespace}>
      <Wrapper
        disabled={timeSlotCount === 0}
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
        <button className={classes.action} disabled={timeSlotCount === 0}>
          {timeSlotCount === 0 ? "No tengo sobrecupos" : null}
          {timeSlotCount === 1 ? "Tengo 1 sobrecupo" : null}
          {timeSlotCount > 1 ? `Tengo ${timeSlotCount} sobrecupos` : null}
        </button>
      </Wrapper>
    </li>
  );
};
