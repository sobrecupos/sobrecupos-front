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
    path: "/especialidades/medicina-general",
    label: "Medicina general",
  },
  {
    id: "action",
    path: "/especialidades/neurologia",
    label: "Neurología",
  },
  {
    id: "action",
    path: "/especialidades/cirugia",
    label: "Cirugía",
  },
  {
    id: "action",
    path: "/especialidades/inmunologia-y-alergias",
    label: "Inmunología y alergias",
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
