import { getComponentClassNames } from "@marketplace/ui/namespace";
import { SpecialtyResponse } from "@marketplace/utils/types/specialties";
import Image from "next/image";
import Link from "next/link";
import "./specialties.scss";

export type SpecialtiesProps = {
  specialties: SpecialtyResponse[];
  countBySpecialty: { [key: string]: number };
};

const classes = getComponentClassNames("specialties", {
  card: "card",
  image: "image",
  cardTitle: "card-title",
});

const isPlural = (count: number, text: string) => {
  return count > 1 ? text + 's' : text;
};

const groupSpecialties = (specialties: SpecialtyResponse[], itemsPerRow: number) => {
  return specialties.reduce((acc, specialty, index) => {
    const rowIndex = Math.floor(index / itemsPerRow);
    if (!acc[rowIndex]) {
      acc[rowIndex] = [];
    }
    acc[rowIndex].push(specialty);
    return acc;
  }, [] as SpecialtyResponse[][]);
};

export const Specialties = ({ specialties, countBySpecialty }: SpecialtiesProps) => {
  const groupedSpecialties = groupSpecialties(specialties, 5);

  return (
    <div className={classes.namespace}>
      {groupedSpecialties.map((row, rowIndex) => (
        <div key={`row-${rowIndex}`} className="flex flex-wrap justify-between mb-4">
          {row.map(({ code, name, picture }) => (
            <div key={`specialty-card-${code}`} className="w-full sm:w-1/2 md:w-1/5 p-2">
              <div className="flex flex-col justify-start items-center">
                <Link
                  href={`/especialidades/${code}`}
                  className={`${classes.card} flex flex-col gap-2 justify-start items-center`}
                >
                  <Image
                    className={classes.image}
                    src={picture}
                    alt={name}
                    height="85"
                    width="85"
                  />
                  <h3 className={`${classes.cardTitle} font-bold h-12`}>{name}</h3>
                </Link>
                <Link
                  href={countBySpecialty[code] <= 0 ? `/especialidades/${code}/solicitud` : `/especialidades/${code}`}
                  className={`rounded-full border-2 border-indigo-500 px-2 text-indigo-500 min-w-[140px] min-h-7 text-center ${countBySpecialty[code] > 0 ? 'bg-indigo-500 text-white' : 'bg-white'}`}
                >
                  {countBySpecialty[code] <= 0
                    ? 'Solicítalo aquí'
                    : `${countBySpecialty[code]}${isPlural(countBySpecialty[code], ' Sobrecupo')}`}
                </Link>
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Specialties;
