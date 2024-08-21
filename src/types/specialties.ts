// types/specialties.ts
export interface SpecialtyResponse {
  code: string;
  name: string;
  picture: string;
}

export interface SpecialtiesProps {
  specialties: SpecialtyResponse[];
  countBySpecialty: { [key: string]: number };
}
