/**
 * Los 20 ejercicios de DESPEGA 3.0.
 *
 * El libro principal manda en objetivo, instrucciones y secuencia. El
 * workbook solo aporta estructuras visuales cuando ayudan. Cada ejercicio conserva su
 * codigo (D1, EJ2, A1) para poder saltar del libro a la hoja sin buscar.
 */

export type Exercise = {
  /** Codigo del cuaderno: D1, E2, EJ1, A2... */
  code: string;
  /** 1-20, el orden del cuaderno */
  num: number;
  /** id del capitulo en letters.ts */
  letter: string;
  title: string;
  /** Para que sirve */
  purpose: string;
  /** Que necesitas antes de empezar */
  needs: string;
  /** Los pasos, cuando el ejercicio los tiene */
  steps: string[];
  /** Aviso del autor que debe leerse antes de comenzar */
  notice?: string;
  /** Que esperar mientras lo haces */
  expect: string;
  /** Como sabes que funciono */
  signal: string;
};

export const EXERCISES: Exercise[] = [
  {
    code: "D1",
    num: 1,
    letter: "d",
    title: "Escúchate",
    purpose: "Para comprobar en tu propia cabeza que existe una voz que no controlas. Es la base de todo lo demás.",
    needs: "Diez segundos.",
    steps: [],
    expect: "",
    signal: "",
  },
  {
    code: "D2",
    num: 2,
    letter: "d",
    title: "Ponle nombre a tu creencia",
    purpose: "Para poder cacharla en vivo. Mientras la creencia no tenga nombre no la ves, se siente como que así son las cosas y ya. En cuanto la nombras empiezas a detectarla justo en el momento en que la estás repitiendo, y ahí es donde por fin puedes hacer algo.",
    needs: "Media hora, un cuaderno y estar solo. No lo hagas entre pendientes ni con el teléfono al lado.",
    notice: "Antes de empezar, léeme esto. Este ejercicio te va a pedir que recuerdes, y quiero ser muy claro con hasta dónde vamos. Buscamos un recuerdo cotidiano, de esos que cualquiera tiene: un comentario que se te quedó, una comparación con un hermano, una regla de la casa, algo que te dijeron un día y no se te olvidó. Nada más que eso. Si al hacerlo se te aparece algo grande, de eso que te mueve el piso o que llevas años esquivando, detente ahí. En serio. No es cobardía, es criterio. Eso no se trabaja solo con un cuaderno un martes por la noche, se trabaja con alguien preparado para acompañarte, y yo no lo soy ni este libro tampoco. Yo fui a terapia para eso y fue de las mejores decisiones que he tomado. Cierra el cuaderno y busca a un profesional; el ejercicio va a seguir aquí cuando estés listo.",
    steps: [
      "Encuentra el momento. Piensa en algo que te hayan dicho o que hayas visto de chico y que se te quedó grabado. No busques el momento más doloroso de tu vida, que no es de eso de lo que se trata: busca uno de los ordinarios, esos que cuentas en la sobremesa sin que nadie se alarme. Te doy ejemplos del tamaño que estoy hablando. Que en tu casa se dijera que el dinero cuesta mucho trabajo. Que te compararan con alguien que sacaba mejores calificaciones. Que una vez levantaste la mano en clase y alguien se rio. Que te dijeran que no anduvieras presumiendo. Que te felicitaran solo cuando traías diez. Escríbelo tal cual lo recuerdas: qué pasó, más o menos cuántos años tenías, quién estaba ahí.",
      "Encuentra la conclusión que sacaste. Aquí está lo importante. Después de ese momento, tu cabeza sacó una conclusión para orientarse. Escríbela en una sola frase, en primera persona, empezando con «si» o con «yo». La mía fue: si no soy perfecto, no merezco ser visto. Otras que he escuchado: si pido ayuda soy débil. Si me muestro me van a lastimar. Si no controlo todo, algo se va a caer. Para tener dinero hay que romperse la espalda. Que sea corta y que la reconozcas. Y la señal de que le atinaste no es lo que sientas al leerla: es que puedas nombrar tres momentos de este mes en los que actuaste desde ahí. Si no encuentras esos tres, todavía no es la tuya. Sigue buscando.",
      "Ve dónde te ha servido. Este paso casi nadie lo hace y es el que a mí me destrabó todo. Escribe tres momentos en los que esa creencia te funcionó, en serio, tres, porque no la traes cargando por tonto: la traes cargando porque en algún momento te salvó de algo o te dio resultados. En mi caso me hizo un empleado confiable, me evitó exponerme a rechazos y me dio fama de que entrego bien, porque no suelto nada hasta que está impecable. Y te aviso que este paso te va a costar más que los anteriores, pero no porque no haya qué escribir. Es que tu cabeza no está entrenada para eso. Fíjate cómo funciona: terminas un proyecto entero y de lo único que te acuerdas es del error de la página quince. Te dan nueve comentarios buenos y uno malo, y adivina cuál vas a estar repitiendo en la noche. Eso no es que seas pesimista, así venimos configurados. A nuestros antepasados les servía más detectar la amenaza que disfrutar el paisaje, porque el que se quedaba viendo el atardecer no dejaba descendencia. Somos los nietos de los que sí veían el peligro. El problema es que hoy ya casi no hay depredadores y esa misma alarma se activa con un correo del jefe o con un mensaje visto y no contestado. Y de paso, cuando te sientas a revisarte, esa alarma solo te enseña lo que hiciste mal. Así que este paso hay que hacerlo a propósito y aguantándose las ganas de minimizarlo. No es positivismo ni palmadita en la espalda: es completar el expediente. Lo que sí funcionó también es información real, nada más que tu cabeza no te la va a entregar por su cuenta. Cuando ves eso, dejas de pelearte contigo. No estás corrigiendo un defecto, estás jubilando una herramienta que ya no te sirve para donde vas. En Japón hay una técnica que me encanta y que va justo de esto. Se llama Kintsugi: cuando se les rompe una pieza de cerámica, en lugar de tirarla o de pegarla disimulando la grieta, la reparan con oro. La grieta queda a la vista, brillando, y la pieza vale más rota y reparada de lo que valía entera. Nadie finge que nunca se quebró. Eso es lo que estamos haciendo aquí. No vamos a borrar por dónde te rompiste, vamos a que esa grieta deje de ser el secreto que cargas. Ojo, tampoco te estoy diciendo que andes contándole tus traumas al del Uber. Es entre tú y tú, pero sin que te dé pena mirarlo.",
      "Escribe la despedida. Ahora, con eso claro, escríbelo así: Gracias, [tu creencia], por cuidarme cuando [el momento]. Ya no te necesito. De aquí en adelante elijo creer que [lo nuevo]. La mía quedó parecida a esto: gracias por protegerme cuando tenía ocho años y decir cualquier cosa era arriesgarme a que se burlaran. Ya no tengo ocho años. Elijo creer que puedo mostrar algo sin terminar y seguir mereciendo respeto. Léela en voz alta. Suena ridículo, ya sé. Léela de todos modos, porque leerla en voz alta y escucharte decirla no se siente igual que pensarla. Y te aviso cómo se siente, porque a mí me agarró desprevenido. Duele. No metafóricamente: se siente en el pecho, apretado, y el simple hecho de escribirlo pesa más de lo que te imaginas. Yo creía que iba a ser un trámite bonito, algo así como cerrar un ciclo, y no fue eso. Lo entendí después. Esa creencia no es un archivo que borras: es una parte de ti. Es la que te cuidó cuando eras chico y no tenías nada más con qué defenderte, y llevas años cargándola porque en su momento sí sirvió. Cuando escribes la despedida, tu cabeza registra que esa parte se tiene que ir, y hace lo que hace cualquiera que no quiere que lo dejen: pelear para quedarse. Por eso los días siguientes vas a sentir el jalón de regresar a la idea vieja. Y al mismo tiempo, y esto es lo raro, se siente alivio. Porque debajo del apretón hay algo más: la sensación de que vas caminando hacia alguien que tú sí escogiste ser, y no hacia el que armaste para sobrevivir. Las dos cosas conviven, el peso y el alivio, y está bien que así sea. Eso es un duelo, no una limpieza.",
      "Déjala a la vista. Escribe la frase nueva en un papel y ponla donde la veas seguido. En el espejo, junto a la pantalla, donde sea. Y esto no es magia ni afirmación. Es un recordatorio operativo, y para esto sirve: los siguientes días vas a sorprenderte actuando desde la creencia vieja. Vas a estar a punto de no mandar algo porque «todavía no está listo». Vas a callarte una idea en una junta. Vas a decir que no a algo por miedo a que salga mal. Y por primera vez lo vas a ver mientras está pasando. A mí ese fue el momento en que empecé a entender por qué me daba más miedo marcarle a una persona que cruzar un camino de brasas. No era el teléfono. Era la creencia decidiendo por mí antes de que yo alcanzara a opinar.",
    ],
    expect: "El paso 1 y el 2 pueden remover cosas, así que no lo hagas de prisa ni antes de una junta. Si al escribir la creencia se te cierra algo en el pecho, vas bien, esa es la señal de que diste con la buena. Y si de plano lo que aparece es más grande de lo que puedes sostener solo, ya sabes lo que sigue: eso se trabaja acompañado, no en un cuaderno.",
    signal: "Cuando en los días siguientes te veas a punto de hacer algo desde la creencia vieja y lo reconozcas en el momento. No cuando desaparezca, porque no desaparece. Cuando la veas venir.",
  },
  {
    code: "D3",
    num: 3,
    letter: "d",
    title: "Caza una frase",
    purpose: "Para empezar a cambiar tu historia desde hoy, sin esperar a tener tiempo ni ganas. Es el ejercicio más chiquito del libro y de los que más rinden, porque estas frases las dices decenas de veces al día.",
    needs: "Nada. Solo prestar atención mientras haces tu vida normal.",
    steps: [
      "Durante un día completo, pon atención a lo que contestas en automático. Sobre todo cuando te agradecen, cuando te felicitan, cuando pides algo o cuando te equivocas. Ahí es donde se esconden.",
      "Elige una sola. La que más digas y que, ya vista de frente, no te represente.",
      "Pregúntate qué historia está contando esa frase de ti. No lo que quieres decir, sino lo que literalmente dice. \"Por nada\" dice que lo tuyo no vale. \"Perdón por molestarte\" dice que tu presencia es una carga.",
      "Escoge con qué la vas a reemplazar y decídelo ahorita, no en el momento, porque en el momento va a ganar la vieja. Ten lista la nueva.",
      "Úsala. Cada vez que se te salga la vieja, corrígela en voz alta ahí mismo si se puede, o mentalmente si ya pasó.",
    ],
    expect: "Las primeras veces se va a sentir falso y forzado, y varias veces se te va a salir la vieja antes de que alcances a pensar. Es normal, ya sabes por qué: la carretera contra la vereda. Se siente falso por nuevo, no por mentira.",
    signal: "Cuando un día la nueva te sale sola, sin pensarla. Ahí ya no estás corrigiendo, ya cambiaste.",
  },
  {
    code: "D4",
    num: 4,
    letter: "d",
    title: "Grábate y audítate",
    purpose: "Para ver de golpe todo lo que tu cuerpo hace sin que tú lo hayas decidido. Es la manera más rápida que conozco de volver visible el piloto automático.",
    needs: "Tu teléfono y quince minutos. Nada más.",
    steps: [
      "Grábate dos o tres minutos hablando de algo que te importe. Puede ser contándole a la cámara un proyecto que traes, explicando algo que sepas hacer, o respondiendo esta pregunta: ¿qué me gustaría que cambiara en mi vida este año? No lo ensayes. Si te sale mal, mejor, así es como hablas de verdad.",
      "Déjalo reposar unas horas, o mejor hasta el día siguiente. Si te ves inmediatamente vas a estar demasiado metido en cómo te sentiste al grabar.",
      "Escucha solo el audio, sin ver la pantalla. Pon atención a tu tono, a tus muletillas, a las veces que te disculpas o te minimizas sin necesidad. Anota lo que se repita.",
      "Ahora mira solo el video, con el volumen en cero. Fíjate en tus manos, en tu postura, en tu cara. ¿Estás encogido? ¿Te tocas algo cuando dudas? ¿Tu cara dice lo mismo que estás diciendo?",
      "Al final velo completo, con audio e imagen, y escribe tres cosas que hacías y no sabías que hacías.",
    ],
    expect: "Te va a incomodar, y mucho. A nadie le gusta verse en video, todos pensamos \"¿así me veo?, ¿así hablo?\", y la primera reacción es querer apagarlo y borrarlo. Aguántate. Esa incomodidad no significa que lo estés haciendo mal, significa que estás viendo algo que llevabas años sin ver. Y no te metas a criticarte el peinado ni la papada, que no venimos a eso: venimos a cazar automatismos.",
    signal: "Cuando en los siguientes días te caches haciendo alguno de esos gestos o diciendo alguna de esas muletillas, en vivo, mientras hablas con alguien. Ahí ya lo hiciste consciente.",
  },
  {
    code: "E1",
    num: 5,
    letter: "e",
    title: "Encuentra tu respiración",
    purpose: "Para que salgas de este capítulo con una técnica que sea tuya y que puedas usar en el momento en que la necesites, sin tener que acordarte de nada.",
    needs: "Cinco minutos y un lugar donde nadie te interrumpa.",
    steps: [
      "Siéntate con la espalda derecha, sin ponerte rígido. Puedes cerrar los ojos o dejarlos entreabiertos mirando un punto fijo.",
      "Prueba la primera: inhala contando cuatro, retén cuatro, exhala contando ocho. Hazla cinco veces seguidas y fíjate cómo te deja.",
      "Ahora prueba la de caja: inhala cuatro, retén cuatro, exhala cuatro, y antes de volver a inhalar espera otros cuatro. Cinco veces también.",
      "Prueba la tercera: inhala rápido por la nariz, retén todo lo que aguantes cómodamente, y suelta el aire despacio, como si estuvieras empañando un vidrio. Cinco veces.",
      "Quédate con la que te dejó más tranquilo. No la que te pareció más interesante ni la que suene más avanzada: la que te bajó de verdad.",
    ],
    expect: "Te vas a distraer y vas a perder la cuenta. Vas por el cuatro y de pronto ya estás pensando en un pendiente del trabajo o en algo que dijiste hace tres años y te dio pena. Eso está bien, ni siquiera es un error, es literalmente el ejercicio: cada vez que notas que te fuiste y regresas, ahí es donde estás entrenando. También puede darte algo de mareo si respiras muy profundo de golpe, así que si pasa, bájale.",
    signal: "Cuando te acuerdes de usarla sin planearlo. Un día vas a estar en algo tenso y vas a notar que ya estás respirando distinto sin habértelo propuesto. Ahí ya la hiciste tuya.",
  },
  {
    code: "E2",
    num: 6,
    letter: "e",
    title: "Auditoría de energía",
    purpose: "Para encontrar el hueco por donde se te está drenando la energía, y para darte cuenta de si tus días traen algo que te recargue o son puro gasto.",
    needs: "Una hoja partida en tres columnas, y hacerlo al final del día durante una semana. Te toma dos minutos diarios.",
    steps: [
      "Divide la hoja en tres columnas: lo que me drena, lo neutro, lo que me recarga.",
      "Cada noche anota lo que hiciste ese día en la columna que le toque, con la hora aproximada. No lo pienses mucho, ponlo donde sientas que va.",
      "Al terminar la semana, míralas juntas. La pregunta no es cuánto te drenó, es si hubo algo que te recargara y cuándo.",
      "Si la columna de la derecha está vacía o casi, ahí está tu respuesta. Y no necesitas rediseñar tu vida: mete una sola cosa que te recargue, deliberadamente, en el día. Aunque sean quince minutos.",
    ],
    expect: "Lo más probable es que te sorprenda dónde está el desbalance. A veces lo que más drena no es el trabajo, sino una conversación de diez minutos o un pendiente que llevas semanas sin resolver y que te está cobrando renta en la cabeza todos los días.",
    signal: "Cuando puedas ver tu semana antes de que pase y notar que viene demasiado cargada de un lado. Ahí ya puedes ajustar antes de tronarte, en lugar de después.",
  },
  {
    code: "S1",
    num: 7,
    letter: "s",
    title: "La lista de lo que drena y no devuelve",
    purpose: "Para convertir sensaciones sueltas en un patrón que puedas ver. Mientras no lo escribas, tu cabeza va a seguir encontrándole justificación a todo.",
    needs: "Tu cuaderno y dos semanas de observación. Cinco minutos al día.",
    steps: [
      "Retoma la auditoría de energía del capítulo anterior. Ya tienes ahí lo que te drena y lo que te recarga.",
      "Ahora separa lo que te drena en dos grupos. En uno pon lo que drena pero sí te devuelve algo: el gimnasio, una conversación difícil que había que tener, el trabajo que te da de comer, cuidar a alguien que amas. Eso cuesta y vale.",
      "En el otro pon lo que drena y no te devuelve nada. Aquí es donde tienes que ser honesto. La reunión a la que vas por compromiso. El grupo de mensajes que ya nada más te estresa. La suscripción que pagas y no usas. La relación que sostienes por costumbre. El proyecto que ya no quieres pero te da pena soltar.",
      "Durante dos semanas, cada vez que algo de esa segunda lista te vuelva a drenar, ponle una palomita al lado.",
      "A las dos semanas mira las palomitas. Lo que tenga más es lo que primero hay que atender, y ya no lo vas a poder discutir contigo mismo porque ahí está la cuenta.",
    ],
    expect: "Te vas a descubrir justificando mientras escribes. \"Es que ahorita no es buen momento\", \"es que si lo dejo van a pensar que...\". Escribe la justificación también, porque esa justificación es información: te dice qué te está deteniendo en realidad.",
    signal: "Cuando veas algo en tu lista y sientas incomodidad de solo verlo escrito. Esa incomodidad significa que ya lo sabías y llevabas rato evitándolo.",
  },
  {
    code: "S2",
    num: 8,
    letter: "s",
    title: "Dilo en voz alta",
    purpose: "Para cachar tus propias justificaciones. Pensar algo y decirlo frente a otra persona son dos cosas completamente distintas, y la segunda te delata.",
    needs: "Una persona de confianza y una hora libre. No lo hagas en el pasillo, ni entre juntas, ni con el celular boca arriba en la mesa.",
    steps: [
      "Elige a alguien que te escuche sin salir corriendo a darte consejos. No necesitas que te resuelva nada, necesitas que te escuche.",
      "Dile de qué se trata antes de empezar. Algo así: «quiero contarte algo que estoy pensando soltar y nada más quiero decirlo en voz alta, no necesito que me digas qué hacer».",
      "Cuéntale lo que traes de tu lista y por qué crees que ya no te corresponde. Habla de corrido, sin editarte.",
      "Pon atención a un momento específico: cuando te oigas justificando por qué todavía no lo sueltas. Ahí, en esa frase, está tu verdadero obstáculo.",
      "Después de la plática escribe la justificación que se te salió. Textual, con las palabras que usaste.",
    ],
    expect: "Es probable que te dé pena decirlo en voz alta, y también es probable que la otra persona te diga que ya lo sabía. Eso pasa seguido: la gente cercana ve estas cosas mucho antes que uno.",
    signal: "Cuando al escucharte hablar te suene ridícula tu propia excusa. Ahí ya se acabó, aunque todavía tardes en actuar.",
  },
  {
    code: "S3",
    num: 9,
    letter: "s",
    title: "La despedida",
    purpose: "Porque esto es un duelo y los duelos se cierran. Si sueltas algo sin despedirte, se te queda dando vueltas y regresa.",
    needs: "Veinte minutos solo, tu cuaderno, y que no te interrumpan.",
    steps: [
      "Elige una sola cosa de tu lista. La que estés listo para soltar hoy, no la más grande.",
      "Escríbele lo que te dio. En serio, hazlo: qué te dio esa amistad, ese trabajo, esa versión tuya, ese hábito. Todo lo tuviste por una razón y en algún momento te sirvió.",
      "Escribe por qué ya no te corresponde. Sin culpar a nadie y sin culparte tú. No tiene que haber un villano, las cosas simplemente dejan de encajar.",
      "Escribe qué te llevas. Siempre queda algo: un aprendizaje, una habilidad, un recuerdo bueno. Eso no se suelta.",
      "Ciérralo con una frase tuya. Puede ser tan simple como «gracias, ya no te necesito para donde voy». Léela en voz alta.",
    ],
    expect: "Te puede dar tristeza y está bien, es exactamente lo que debe pasar. También puede darte culpa, sobre todo si lo que sueltas involucra a alguien. La culpa no significa que estés haciendo algo malo, significa que te importa.",
    signal: "Cuando pienses en eso que soltaste y te dé nostalgia en lugar de peso. La nostalgia se puede cargar. El peso no.",
  },
  {
    code: "S4",
    num: 10,
    letter: "s",
    title: "Se va o se queda",
    purpose: "Para sacar la decisión de tu cabeza, donde todo es negociable, y ponerla en un lugar donde ya no puedas discutirla.",
    needs: "Una hoja y quince minutos.",
    steps: [
      "Parte la hoja en dos columnas. De un lado lo que se va, del otro lo que se queda.",
      "Llénalas con lo que sacaste de los ejercicios anteriores. En frases cortas, sin explicaciones ni párrafos, para que quepan de un vistazo.",
      "Déjala donde la veas seguido. No en un cajón, no en un archivo del celular que no vas a abrir.",
      "Cada vez que sueltes algo de la columna izquierda, táchalo. Con línea firme, no con un tachecito discreto.",
    ],
    expect: "Vas a querer mover cosas de columna varias veces antes de decidirte, y eso está bien. Lo que no está bien es no escribirlas por no saber todavía dónde van: ponlas donde creas hoy y ya las moverás.",
    signal: "Cuando taches el primero y no lo vuelvas a meter a la lista la semana siguiente. Esa es la señal, no lo que sientas al tacharlo.",
  },
  {
    code: "P1",
    num: 11,
    letter: "p",
    title: "Escribe a tu súper tú",
    purpose: "Para tener por escrito hacia dónde vas. Sin esto, todo lo que soltaste deja un hueco que se va a llenar solo, y probablemente con lo mismo de antes.",
    needs: "Una hora y estar solo. Este no lo hagas entre pendientes.",
    steps: [
      "Escribe en primera persona, empezando cada frase con «soy». No pongas «quiero ser» ni «algún día seré», porque tu subconsciente lee eso como que todavía no lo eres y ahí se queda. Escribe soy.",
      "No te limites. Escribe la versión más completa que puedas imaginar, sin preguntarte todavía si es alcanzable. Eso lo revisamos después.",
      "Cuando termines, cuenta cuántas de esas frases hablan de ti y cuántas de lo que le das a otros. Ese balance te dice algo sobre lo que de verdad te mueve.",
      "Búscale nombre. Puede ser un apodo que ya te dicen, un diminutivo, o algo que te inventes. Lo importante es que al decirlo sientas algo.",
    ],
    expect: "Te va a dar pena escribirlo, sobre todo las frases más ambiciosas, y probablemente pienses \"yo no soy así\". Exacto, todavía no. De eso se trata. Y si al leerlo completo no sientes nada, es que te quedaste corto: súbele.",
    signal: "Cuando te descubras en una situación difícil preguntándote qué haría esa versión tuya. Ahí ya dejó de ser un papel y se volvió una brújula.",
  },
  {
    code: "P2",
    num: 12,
    letter: "p",
    title: "La brecha",
    purpose: "Para convertir a tu súper tú en una lista de cosas concretas por conseguir, en lugar de un ideal que se queda en el cajón.",
    needs: "Las dos listas que ya tienes, tu inventario y tu súper tú, frente a frente.",
    steps: [
      "Toma cada frase de tu súper tú y pregúntate qué necesita esa persona para ser así. Desglósalo en cuatro cosas: habilidades, creencias, personas alrededor y hábitos.",
      "Marca lo que ya tienes. Vas a encontrar más de lo que crees, y eso va directo a la columna de lo que se queda de tu lista anterior.",
      "Marca lo que te falta pero sabes cómo conseguir. Eso ya es tarea, no misterio.",
      "Marca lo que te falta y no tienes idea de cómo se consigue. Sepáralo, porque eso es justo lo que vamos a planear en el siguiente capítulo.",
      "De todo lo del paso 3, elige una sola cosa. La más chiquita. Esa es por donde empiezas.",
    ],
    expect: "La lista va a salir larga y te va a abrumar. Es normal, no la tienes que resolver toda: nada más necesitas saber qué hay. Y ojo con algo que a mí me pasó: vas a querer empezar por lo más grande e impresionante. No lo hagas, empieza por lo más chiquito, porque de eso trata el uno por ciento del que ya hablamos.",
    signal: "Cuando puedas decir en una frase qué te falta para ser quien quieres ser. Si todavía no lo puedes decir en una frase, sigue desglosando.",
  },
  {
    code: "P3",
    num: 13,
    letter: "p",
    title: "Encuentra tu territorio",
    purpose: "Para dejar de sentirte disperso y encontrar dónde convergen las cosas que sabes hacer. Si eres multidisciplinario, este ejercicio te va a servir más que cualquier diagrama.",
    needs: "Una hoja grande y una hora.",
    steps: [
      "Escribe todo lo que sabes hacer. Todo. Habilidades técnicas, cosas que aprendiste por gusto, oficios raros, lo que sea. No filtres nada por parecer irrelevante y no te censures por creer que no eres tan bueno. Si alguien te pagaría por eso, o si podrías enseñárselo a otro, va en la lista.",
      "Ahora busca parentescos. Ve cuáles de esas habilidades se podrían usar juntas en un mismo trabajo o proyecto. No te preocupes si algunas se te quedan solas.",
      "Ponle nombre al grupo más grande. ¿En qué campo caben la mayoría? Ese nombre es tu territorio y probablemente ya existe como industria o como oficio.",
      "Ahora aterrízalo con estas preguntas: ¿dónde se usa eso? ¿A quién le sirve? ¿Alguien te contrataría por eso? Si no puedes contestar las tres, el territorio todavía está muy abstracto y hay que hacerlo más concreto.",
      "Escríbelo en una sola frase, empezando con «yo ayudo a». Y tiene que ser una frase que puedas decir en voz alta sin sentir que estás inventando.",
    ],
    expect: "Vas a querer meter todo en el mismo grupo, y no se puede. Algunas habilidades se van a quedar fuera y eso duele un poquito, sobre todo si son de las que más disfrutas. Déjalas fuera, no se van a ningún lado.",
    signal: "Cuando alguien te pregunte a qué te dedicas y puedas contestar sin dar rodeos ni la lista completa de todo lo que sabes hacer.",
  },
  {
    code: "P4",
    num: 14,
    letter: "p",
    title: "Diseña tu primer miniviaje",
    purpose: "Para salir de este capítulo con algo que puedas empezar mañana, en lugar de con un plan bonito que se queda en el cuaderno.",
    needs: "Quince minutos y honestidad con tu calendario real.",
    steps: [
      "Regresa a tu lista de la brecha, a lo que te falta para ser tu súper tú. De ahí elige una sola cosa, y elige de las que ya sabes cómo se consiguen. Las que no sabes cómo se consiguen se resuelven después, no en tu primer miniviaje.",
      "Conviértela en una meta que quepa en una a tres semanas. Aplícale la prueba: si al leerla piensas «esto lo puedo hacer sin morir en el intento», vas bien. Si piensas «va a estar difícil», hazla más chica. No estás midiendo tu capacidad, estás construyendo el hábito de terminar lo que empiezas.",
      "Escribe cómo te quieres sentir mientras lo haces. Una palabra basta.",
      "Ahora la parte incómoda: cuántos días a la semana le puedes dedicar de verdad, sin que se te caigan los otros platos. Considera tu trabajo, tu familia, tus otras responsabilidades y el descanso que necesitas. Si te sale menos de lo que quisieras, ese es el número bueno.",
      "Ponle fecha de revisión y anótala en tu calendario, como si fuera una cita con alguien más. Porque lo es.",
      "Junta todo en una frase: «Durante las próximas [X semanas] voy a [meta], sintiendo [emoción], dedicándole [X días] por semana, y lo reviso el [fecha].»",
      "Léela en voz alta y pregúntate si es honesta y sostenible. Si algo te suena forzado, ajústalo ahorita y no a la mitad del camino.",
    ],
    expect: "Vas a querer poner una meta más grande de la que te toca. Todos lo hacemos, porque una meta chiquita se siente poca cosa y da pena escribirla. Escríbela de todos modos, porque es mucho mejor cumplir algo pequeño y seguir, que fallar en algo grande y abandonar.",
    signal: "Cuando llegue la fecha de revisión y te sientes a revisar. Aunque no hayas cumplido, aunque te haya ido mal. Cumplir la meta es lo de menos en tu primer miniviaje; lo que estamos construyendo es el hábito de revisar.",
  },
  {
    code: "EJ1",
    num: 15,
    letter: "ej",
    title: "Pesa lo que haces",
    purpose: "Para dejar de sentir que no avanzas cuando en realidad estás haciendo las cosas más difíciles. Y para entender por qué hay semanas que te dejan tirado sin razón aparente.",
    needs: "Una semana y anotar al final de cada día.",
    steps: [
      "Cada noche escribe lo que hiciste ese día relacionado con tu miniviaje.",
      "A cada cosa ponle puntos. Uno si te salió natural, dos si te costó concentración, tres si tuviste que vencerte a ti mismo para hacerlo.",
      "Al final de la semana suma. Vas a descubrir semanas de pocos pendientes con muchísimos puntos, y ahí está la explicación de tu cansancio.",
      "Fíjate en qué tareas te dan siempre tres puntos. Esas son las que hay que repartir, no acumular. Si tu semana trae cuatro cosas de tres puntos, algo hay que mover.",
    ],
    expect: "Al principio te va a costar asignar los puntos porque estamos entrenados para pensar que todo debería costarnos igual. Sé honesto: si algo te da ansiedad, vale tres, aunque objetivamente sea \"fácil\".",
    signal: "Cuando puedas ver tu semana antes de que empiece y notar que viene demasiado cargada de tres puntos. Ahí ya puedes repartirla en lugar de tronarte.",
  },
  {
    code: "EJ2",
    num: 16,
    letter: "ej",
    title: "El pivote",
    purpose: "Para ajustar sin abandonar, que es la diferencia entre alguien que avanza lento y alguien que empieza de cero cada seis meses.",
    needs: "Cinco minutos, en cuanto sientas que algo no está fluyendo. No esperes a la fecha de revisión.",
    steps: [
      "Detente y respira. Ya sabes cómo, veinte segundos bastan.",
      "Contesta tres preguntas, en este orden y sin adornar: ¿qué me está costando sostener esta semana? ¿Qué puedo hacer distinto sin romperme? ¿Le bajo a la meta o le cambio la forma?",
      "Ajusta el miniviaje ahí mismo. No pierdes el rumbo, lo recalculas.",
      "Anota qué ajustaste y por qué, porque eso es información valiosa para el siguiente tramo.",
    ],
    expect: "Te va a dar culpa bajarle a la meta, como si estuvieras haciendo trampa contigo mismo. No lo es. Lo que sí es trampa es sostener una meta imposible para poder decirte que al menos lo intentaste.",
    signal: "Cuando ajustes a media semana en lugar de abandonar en la tercera. Ese es todo el logro.",
  },
  {
    code: "G1",
    num: 17,
    letter: "g",
    title: "Tu retrospectiva",
    purpose: "Para que lo que te pasó se convierta en algo que puedas usar después, en lugar de evaporarse.",
    needs: "Cinco minutos al cerrar tu miniviaje, y tu cuaderno.",
    steps: [
      "Al terminar el tramo que planeaste, siéntate y traza tres columnas: qué salió bien, qué salió mal, cómo me sentí.",
      "Llénalas sin justificarte y sin adornar. En la primera van los avances, aunque sean chiquitos, sobre todo los chiquitos. En la segunda los tropiezos, sin echarle la culpa a nadie ni echártela tú. Y en la tercera las emociones reales, aunque no cuadren con los resultados.",
      "De la segunda columna saca máximo dos ajustes concretos para el siguiente miniviaje. Dos, no diez.",
      "Y antes de cerrar el cuaderno, escribe una cosa por la que estés agradecido de ese tramo. Suena cursi, ya sé. Hazlo de todos modos, porque tu cabeza no lo va a hacer sola.",
    ],
    expect: "La columna de \"cómo me sentí\" es la que más gente se salta y la que más información da. Puede pasarte que hayas cumplido todo y aun así te hayas sentido pésimo, y eso es un dato importantísimo: significa que estás avanzando hacia algo que no quieres, o que estás avanzando de una manera que no aguantas.",
    signal: "Cuando en el siguiente miniviaje te descubras a punto de repetir un error y te acuerdes de que ya lo tenías anotado.",
  },
  {
    code: "G2",
    num: 18,
    letter: "g",
    title: "Tu registro mínimo",
    purpose: "Para no perder el hábito en los días malos, que son justamente los días donde más material hay que guardar.",
    needs: "Dos minutos antes de dormir. Nada más.",
    steps: [
      "Elige tu momento y que sea siempre el mismo. Antes de dormir, en la ducha, mientras te tomas el café, caminando. El momento importa menos que la constancia.",
      "Hazte una sola pregunta: ¿qué necesito recordar de hoy?",
      "Si tienes energía, escríbelo. Si no, con dejarlo pasar por tu cabeza conscientemente basta.",
      "Los días que sí escribas, no te edites. Nadie va a leer eso.",
    ],
    expect: "Los primeros días vas a sentir que no tienes nada que anotar, y es normal, porque no estás entrenado para notar. A las dos semanas vas a empezar a cachar cosas durante el día pensando \"esto lo voy a anotar en la noche\", y ahí ya cambió algo importante: empezaste a vivir prestando atención.",
    signal: "Cuando lo hagas sin acordarte de que es un ejercicio.",
  },
  {
    code: "A1",
    num: 19,
    letter: "a",
    title: "Analiza tu sistema",
    purpose: "Para dejar de querer cambiar tu vida entera cuando lo que falla es una pieza. Este ejercicio te va a ahorrar decisiones caras y arrepentimientos.",
    needs: "Una hoja, media hora, y estar dispuesto a mirar algo tuyo con frialdad.",
    steps: [
      "Elige una sola área que no esté funcionando. Tu trabajo, un proyecto, una relación, tu rutina. Una, no todas.",
      "Haz tres columnas. En la primera escribe qué le estás metiendo: horas por semana, dinero, energía mental, atención. Sé específico, pon números donde puedas.",
      "En la segunda, qué te está devolviendo. Dinero, aprendizaje, satisfacción, contactos, salud. Otra vez concreto, nada de «crecimiento personal» a secas.",
      "En la tercera, parte esa área en pedazos. Si es tu trabajo, no escribas «mi trabajo»: escribe las juntas, el código, el jefe, los horarios, los compañeros, el trayecto. Cada pieza en su renglón.",
      "Ahora califica cada pieza por separado. ¿Cuáles están bien y cuáles están podridas? Vas a descubrir, casi siempre, que lo que te tiene mal son dos o tres piezas, no las diez.",
      "Pregúntate por esas dos o tres: ¿se pueden cambiar, delegar, reducir o negociar? Si la respuesta es sí en al menos una, todavía no toca tirar nada.",
    ],
    expect: "Te va a incomodar el paso 3, porque hay áreas donde llevas años metiendo mucho y te vas a dar cuenta de que devuelven poco. Anótalo aunque duela; ese es justo el dato que viniste a buscar.",
    signal: "Cuando puedas decir en una sola frase qué es exactamente lo que está fallando. Si sigues diciendo \"es que todo está mal\", vuelve al paso 4, porque no partiste lo suficiente.",
  },
  {
    code: "A2",
    num: 20,
    letter: "a",
    title: "La decisión que traes atorada",
    purpose: "Para desatorar esa decisión que llevas semanas o meses dándole vueltas sin resolver. Todos traemos una.",
    needs: "Una hoja partida en tres columnas, veinte minutos, y estar solo.",
    steps: [
      "Antes de escribir nada, respira. Tres minutos con la exhalación más larga que la inhalación, como lo trabajaste en el capítulo E. No es relleno: si decides con el cuerpo acelerado, vas a decidir desde el miedo.",
      "Escribe arriba la decisión, en una frase y sin adornos. «¿Renuncio o no?» «¿Cierro el negocio?» «¿Tengo esa conversación?»",
      "Primera columna: los hechos. Solo lo que podrías probarle a alguien más. Números, fechas, cosas que se dijeron textualmente. Nada de interpretaciones.",
      "Segunda columna: lo que tú estás agregando. Lo que crees que piensan los demás, lo que supones que va a pasar, lo que te estás contando. Sé honesto, porque esta columna casi siempre es la más larga.",
      "Tercera columna: parte los riesgos en dos grupos, los reales y los inventados. Real es «me quedo sin ingreso tres meses». Inventado es «todos van a pensar que fracasé».",
      "Ahora sí, la pregunta: ¿qué haría tu súper tú, viendo solo la primera y la tercera columna?",
      "Haz una cosa hoy, que te tome menos de cinco minutos, en la dirección de esa respuesta.",
    ],
    expect: "El paso 4 incomoda porque vas a ver por escrito cuánto de tu parálisis era invento tuyo. También puede pasar que descubras que la decisión correcta es quedarte, y eso es igual de válido; ajustar no significa siempre irse.",
    signal: "Cuando puedas explicarle tu decisión a alguien en dos minutos sin ponerte a la defensiva. Si necesitas justificarte mucho, todavía estás decidiendo desde la segunda columna.",
  },
];

/** Los ejercicios de un capitulo, en el orden del cuaderno. */
export const exercisesFor = (letter: string) => EXERCISES.filter((item) => item.letter === letter);
