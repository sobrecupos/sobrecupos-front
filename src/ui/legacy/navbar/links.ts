export const specialties = [
  {
    id: "action",
    path: "/especialidades/pediatria",
    label: "Pediatría",
  },
  {
    id: "action",
    path: "/especialidades/otorrino",
    label: "Otorrino",
  },
  {
    id: "action",
    path: "/especialidades/oftalmologia",
    label: "Oftalmologia",
  },
  {
    id: "action",
    path: "/especialidades/traumatologia",
    label: "Traumatología",
  },
  {
    id: "action",
    path: "/especialidades/cirugia",
    label: "Cirugía",
  },
  {
    id: "action",
    path: "/especialidades/dermatologia",
    label: "Dermatología",
  },
];

export const links = [
  { id: "action", path: "/", label: "Inicio", contents: [] },
  {
    id: "submenu",
    path: "/especialidades",
    label: "Especialidades",
    contents: specialties,
  },
  {
    id: "action",
    path: "/preguntas-frecuentes",
    label: "Preguntas frecuentes",
    contents: [],
  },
];
