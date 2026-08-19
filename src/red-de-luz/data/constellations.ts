type BaseConstellation = {
  id: "despega" | "dtmm" | "ingles" | "lectura" | "vitalbeat";
  name: string;
  shortName: string;
  eyebrow: string;
  summary: string;
  context: string;
  metaphor: string;
  figure: "aquila" | "lyra" | "gemini" | "corona-borealis" | "leo";
  accent: string;
  coordinate: { x: number; y: number };
};

export type ActiveConstellation = BaseConstellation & {
  status: "active";
  cta: {
    label: string;
    href: string;
    external: boolean;
  };
};

export type SuspendedConstellation = BaseConstellation & {
  status: "suspended";
};

export type Constellation = ActiveConstellation | SuspendedConstellation;

export const CONSTELLATIONS: readonly Constellation[] = [
  {
    id: "despega",
    name: "DESPEGA",
    shortName: "DESPEGA",
    eyebrow: "Introspección estructurada",
    summary: "Siete pasos para soltar la vida que no es tuya y volver a elegirte.",
    context: "Una metodología de introspección estructurada para ordenar lo interno y tomar decisiones propias.",
    metaphor: "Aquila · el vuelo",
    figure: "aquila",
    accent: "#d4823f",
    coordinate: { x: 24, y: 24 },
    status: "active",
    cta: {
      label: "Recorrer el método",
      href: "/despega/",
      external: false,
    },
  },
  {
    id: "dtmm",
    name: "De tu Mente al Mundo",
    shortName: "DTMM",
    eyebrow: "Creación y conocimiento aplicado",
    summary: "Convierte una idea en algo que puedas mostrar, usar y seguir construyendo.",
    context: "Clases y experiencias aplicadas sobre presencia digital, creación e inteligencia artificial.",
    metaphor: "Lyra · la creación",
    figure: "lyra",
    accent: "#d2a928",
    coordinate: { x: 72, y: 18 },
    status: "active",
    cta: {
      label: "Conocer De tu Mente al Mundo",
      href: "https://detumentealmundo.lareddeluz.com/",
      external: true,
    },
  },
  {
    id: "ingles",
    name: "¡Hablemos Inglés!",
    shortName: "Inglés",
    eyebrow: "Sesiones en vivo",
    summary: "Un espacio para practicar, equivocarnos y aprender en comunidad.",
    context: "Sesiones en vivo para practicar inglés hablando con personas reales, sin presión.",
    metaphor: "Gemini · dos voces",
    figure: "gemini",
    accent: "#ba3f35",
    coordinate: { x: 58, y: 72 },
    status: "active",
    cta: {
      label: "Entrar al grupo de Inglés",
      href: "https://chat.whatsapp.com/Iw8zFKhkPVaFTGHrMPtTWi",
      external: true,
    },
  },
  {
    id: "lectura",
    name: "Club de Lectura",
    shortName: "Lectura",
    eyebrow: "Ideas que se leen en comunidad",
    summary: "Lee una idea y descubre en qué se convierte cuando pasa por otras personas.",
    context: "Lecturas compartidas y conversaciones para pensar en comunidad.",
    metaphor: "Corona Borealis · el círculo",
    figure: "corona-borealis",
    accent: "#a78bd4",
    coordinate: { x: 48, y: 50 },
    status: "active",
    cta: {
      label: "Entrar al Club de Lectura",
      href: "https://chat.whatsapp.com/BxRf4AsM93G7DocbbtQGF7",
      external: true,
    },
  },
  {
    id: "vitalbeat",
    name: "VitalBeat",
    shortName: "VitalBeat",
    eyebrow: "Constelación suspendida",
    summary: "Aquí no entrenamos solas, crecemos juntas.",
    context: "Estudio boutique para mujeres con Barre y entrenamiento funcional, grupos pequeños y acompañamiento cercano.",
    metaphor: "Leo · el pulso",
    figure: "leo",
    accent: "#75836f",
    coordinate: { x: 86, y: 60 },
    status: "suspended",
  },
] as const;
