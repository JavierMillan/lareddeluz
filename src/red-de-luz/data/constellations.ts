type BaseConstellation = {
  id: "despega" | "dtmm" | "ingles" | "vitalbeat";
  name: string;
  shortName: string;
  eyebrow: string;
  summary: string;
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
    eyebrow: "Clases y creación",
    summary: "Conocimiento aplicado para convertir ideas en una presencia digital real.",
    accent: "#d2a928",
    coordinate: { x: 72, y: 18 },
    status: "active",
    cta: {
      label: "Explorar las clases",
      href: "https://detumentealmundo.lareddeluz.com/presentacion/",
      external: true,
    },
  },
  {
    id: "ingles",
    name: "¡Hablemos Inglés!",
    shortName: "Inglés",
    eyebrow: "Sesiones en vivo",
    summary: "Un espacio para practicar, equivocarnos y aprender en comunidad.",
    accent: "#ba3f35",
    coordinate: { x: 58, y: 72 },
    status: "active",
    cta: {
      label: "Entrar a las sesiones",
      href: "https://detumentealmundo.lareddeluz.com/ingles/",
      external: true,
    },
  },
  {
    id: "vitalbeat",
    name: "VitalBeat",
    shortName: "VitalBeat",
    eyebrow: "Constelación suspendida",
    summary: "Un espacio de movimiento y bienestar que podrá volver a encenderse.",
    accent: "#75836f",
    coordinate: { x: 86, y: 60 },
    status: "suspended",
  },
] as const;
