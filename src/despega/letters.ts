/**
 * Las siete letras del método.
 *
 * Cada una carga un estado que se siente antes de leerse — ver
 * brand-profile-despega.md. El clima (`amb`) tiñe el aire de su
 * sección; la temperatura del recorrido cambia conforme bajas.
 *
 * El texto es seco a propósito: la página abre la puerta, el libro
 * cuenta la historia.
 */

export type Letter = {
  id: string;
  letter: string;
  verb: string;
  coord: string;
  sub: string;
  title: string;
  accent: string;
  body: string;
  ask: string;
  exercises: number;
  /** RGB del clima de la sección */
  amb: string;
  /** Intensidad del tinte ambiental */
  ambA: number;
};

export const LETTERS: Letter[] = [
  {
    id: "d",
    letter: "D",
    verb: "DESCUBRE",
    coord: "DESCUBRE",
    sub: "tu realidad",
    title: "No sabes cuándo",
    accent: "soltaste el timón.",
    body:
      "Vas en un barco a media agua. Levantas la cabeza y no reconoces nada: la rutina te jaló otra vez al piloto automático y no te diste cuenta de cuándo. Despertar no es bonito, es un susto. Pero es el único lugar desde donde se puede trazar una ruta.",
    ask: "¿Qué frase te llevas repitiendo tanto que ya ni la escuchas?",
    exercises: 4,
    amb: "188, 105, 59",
    ambA: 0.05,
  },
  {
    id: "e",
    letter: "E",
    verb: "ENVÍA CALMA",
    coord: "ENVÍA CALMA",
    sub: "a tu cuerpo",
    title: "Antes de decidir,",
    accent: "baja el ruido.",
    body:
      "Un sistema nervioso encendido no razona: reacciona. Si decides así, no decides tú — decide el personaje viejo, el que se formó cuando eras chiquito y nunca actualizó su información.",
    ask: "¿Cuándo fue la última vez que tu cuerpo se rindió, aunque por fuera seguías funcionando normal?",
    exercises: 2,
    amb: "207, 132, 82",
    ambA: 0.06,
  },
  {
    id: "s",
    letter: "S",
    verb: "SELECCIONA",
    coord: "SELECCIONA",
    sub: "tus tesoros",
    title: "No es lo que cuesta.",
    accent: "Es lo que no devuelve.",
    body:
      "Hay cosas que drenan y valen: el gimnasio cuesta, una conversación difícil cuesta. De lo que hablamos es de lo otro — lo que sostienes por costumbre, por culpa, o porque llevas tanto con eso que ya ni te preguntas por qué sigue ahí.",
    ask: "Si imaginas soltar eso que ya sabes, ¿qué sientes primero: miedo, o alivio?",
    exercises: 4,
    amb: "176, 82, 43",
    ambA: 0.07,
  },
  {
    id: "p",
    letter: "P",
    verb: "PLANIFICA",
    coord: "PLANIFICA",
    sub: "tu ruta",
    title: "Con un punto de partida",
    accent: "no se traza una ruta.",
    body:
      "Hace falta un destino. Aquí escribes a tu súper tú — la mejor versión posible de ti, en presente. No «algún día seré». Se escribe «soy», porque tu subconsciente lee el futuro como que todavía no.",
    ask: "Si dejaras de tenerle miedo al ridículo por un día completo, ¿qué harías distinto?",
    exercises: 4,
    amb: "226, 161, 103",
    ambA: 0.08,
  },
  {
    id: "ej",
    letter: "E",
    verb: "EJECUTA",
    coord: "EJECUTA",
    sub: "con foco",
    title: "Nadie del otro lado.",
    accent: "Y aun así temblabas.",
    body:
      "Grabar un audio no tiene a nadie escuchando todavía. Puedes borrarlo, repetirlo, y nadie se entera. Ahí está la prueba de que el problema nunca fue la otra persona.",
    ask: "¿Cuál es tu versión del audio de WhatsApp — esa cosa chiquita que llevas evitando aunque a nadie del otro lado le costaría nada?",
    exercises: 2,
    amb: "204, 103, 51",
    ambA: 0.06,
  },
  {
    id: "g",
    letter: "G",
    verb: "GUARDA",
    coord: "GUARDA",
    sub: "aprendizajes",
    title: "Cada sueño nació",
    accent: "de una herida.",
    body:
      "Cuando por fin conectas uno con otro, ves algo que llevabas toda la vida sin ver: no tendrías ese sueño si no hubieras tenido esa herida. Ahí el trauma deja de ser una piedra y se vuelve el origen de algo.",
    ask: "Si conectaras tu sueño más grande con la herida de la que salió, ¿qué verías que no habías querido ver?",
    exercises: 2,
    amb: "165, 91, 53",
    ambA: 0.07,
  },
  {
    id: "a",
    letter: "A",
    verb: "AJUSTA",
    coord: "AJUSTA",
    sub: "a tu rumbo",
    title: "Ya decidiste saltar.",
    accent: "Y aun así no te mueves.",
    body:
      "Es el mismo jalón hacia atrás en la orilla de un risco que frente a un teléfono. No se quita antes de saltar: se quita después, y solo si saltas. Por eso ajustar es el paso más difícil — casi siempre implica soltar algo que te costó construir.",
    ask: "¿Qué ya decidiste que tu cuerpo todavía no se cree?",
    exercises: 2,
    amb: "215, 127, 69",
    ambA: 0.04,
  },
];

/** Lo que drena y lo que cuesta pero vale — letra S */
export const WEIGH = [
  { text: "Una conversación difícil que había que tener", kind: "vale" },
  { text: "La reunión a la que vas por compromiso", kind: "drena" },
  { text: "El trabajo que te da de comer", kind: "vale" },
  { text: "El grupo de mensajes que ya solo te estresa", kind: "drena" },
  { text: "El proyecto que ya no quieres pero te da pena soltar", kind: "drena" },
] as const;

/** Heridas y los sueños que nacieron de ellas — letra G */
export const SCARS = [
  {
    wound: "Te enseñaron que ser distinto era peligroso",
    dream: "Que nadie más se sienta invisible",
  },
  {
    wound: "Creciste creyendo que era más seguro no tener amigos",
    dream: "Un círculo cercano fuerte, de esos con los que cuentas",
  },
];

/** El súper tú, en presente — letra P */
export const SUPER_YOU = [
  "Soy el que se para frente a miles y lo disfruta.",
  "Soy el que dice lo que piensa sin quedarse callado.",
  "Soy el que llega a un lugar y suma.",
];
