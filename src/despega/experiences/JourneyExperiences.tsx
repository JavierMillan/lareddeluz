import { useMemo, useState } from "react";
import type { ExerciseAnswer, CustomKind } from "../exerciseExperiences";
import { parseSprintTasks } from "../exerciseExperiences";
import { loadAnswer } from "../exerciseStorage";

type Props = { answer: ExerciseAnswer; onChange: (answer: ExerciseAnswer) => void };
const asText = (value: ExerciseAnswer[string]) => Array.isArray(value) ? value.join("\n") : value ?? "";
const asList = (value: ExerciseAnswer[string]) => Array.isArray(value) ? value : value?.trim() ? [value] : [];

function Field({ answerKey, label, help, placeholder, answer, onChange, rows = 4 }: Props & { answerKey: string; label: string; help?: string; placeholder: string; rows?: number }) {
  return <label className="journey-field"><span>{label}</span>{help && <small>{help}</small>}<textarea aria-label={label} rows={rows} value={asText(answer[answerKey])} onChange={(event) => onChange({ ...answer, [answerKey]: event.target.value })} placeholder={placeholder} /><div className="print-value">{asText(answer[answerKey])}</div></label>;
}

function ListBuilder({ answerKey, label, placeholder, answer, onChange, limit, moveTo, moveLabel }: Props & { answerKey: string; label: string; placeholder: string; limit?: number; moveTo?: string; moveLabel?: string }) {
  const [draft, setDraft] = useState("");
  const [hint, setHint] = useState("");
  const items = asList(answer[answerKey]);
  const say = (message: string) => { setHint(message); window.setTimeout(() => setHint(""), 4000); };
  const add = () => {
    const value = draft.trim();
    if (!value) { say("Escribe algo antes de agregarlo."); return; }
    if (limit && items.length >= limit) { say(`Aquí caben ${limit}. Quita uno para seguir.`); return; }
    if (items.includes(value)) { say("Eso ya está en esta lista."); return; }
    setHint("");
    onChange({ ...answer, [answerKey]: [...items, value] });
    setDraft("");
  };
  /* Clasificar es cambiar de opinión: lo que entra en una columna tiene que
     poder pasarse a la otra sin borrarlo y volverlo a escribir. */
  const move = (item: string) => {
    if (!moveTo) return;
    const target = asList(answer[moveTo]);
    onChange({
      ...answer,
      [answerKey]: items.filter((value) => value !== item),
      [moveTo]: target.includes(item) ? target : [...target, item],
    });
  };
  return <section className="journey-list"><h3>{label}</h3><ul>{items.map((item, index) => <li key={`${item}-${index}`}>
    <p>{item}</p>
    {moveTo && <button type="button" className="list-move" onClick={() => move(item)} aria-label={`Mover "${item}" a ${moveLabel}`} title={`Mover a ${moveLabel}`}>{moveLabel}</button>}
    <button type="button" onClick={() => onChange({ ...answer, [answerKey]: items.filter((_, itemIndex) => itemIndex !== index) })} aria-label={`Quitar ${item}`}>×</button>
  </li>)}</ul>
  <div className="journey-list__add"><input aria-label={label} value={draft} onChange={(event) => setDraft(event.target.value)} onKeyDown={(event) => { if (event.key === "Enter") add(); }} placeholder={placeholder} /><button type="button" onClick={add}>Agregar</button></div>
  <p className="field-hint" role="status" aria-live="polite" data-shown={hint ? "" : undefined}>{hint ? <><span aria-hidden="true">!</span>{hint}</> : null}</p>
  </section>;
}

function ImportCue({ from, label, onImport }: { from: string; label: string; onImport: () => void }) {
  return <button type="button" className="import-cue" onClick={onImport}><span>Continuidad opcional · {from}</span>{label} <b>→</b></button>;
}

function BeliefExperience(props: Props) {
  return <div className="belief-experience journey-instrument"><header className="instrument-intro"><p className="instrument-kicker">Ve despacio</p><h2>No tienes que resolver tu vida entera.</h2><p>Busca un momento cotidiano. Si aparece algo que te mueve demasiado, cierra esta hoja y busca acompañamiento. Aquí no hay premio por empujarte de más.</p></header><div className="belief-story">
    <section data-testid="belief-moment"><span className="belief-story__number">01</span><Field {...props} answerKey="moment" label="Lo que pasó" help="Qué pasó, cuántos años tenías y quién estaba ahí." placeholder="Recuerdo que…" /></section>
    <section data-testid="belief-moment" className="belief-story__turn"><span className="belief-story__number">02</span><Field {...props} answerKey="belief" label="Lo que aprendí a creer" help="Escríbelo como una frase que empiece con «si» o «yo»." placeholder="Yo… / Si…" /><Field {...props} answerKey="served" label="Alguna vez me protegió así" help="No la cargas porque sí. Nombra brevemente cuándo te cuidó o te dio resultados." placeholder="Me sirvió cuando…" rows={3} /></section>
    <section data-testid="belief-moment"><span className="belief-story__number">03</span><Field {...props} answerKey="newBelief" label="Lo que hoy elijo" help="Una frase nueva que puedas reconocer cuando aparezca la vieja." placeholder="Ahora elijo creer que…" rows={3} /></section>
  </div><section className="belief-closing"><p className="instrument-kicker">Cierra el ciclo con tus palabras</p><Field {...props} answerKey="goodbye" label="Mi despedida" placeholder="Gracias por cuidarme cuando… Ya no te necesito para lo que sigue." rows={3} /></section></div>;
}

function PhraseExperience(props: Props) {
  const oldPhrase = asText(props.answer.old) || "la frase vieja";
  const newPhrase = asText(props.answer.new) || "la frase que sí me representa";
  return <div className="phrase-experience journey-instrument"><header className="instrument-intro"><p className="instrument-kicker">Una frase · no todo tu vocabulario</p><h2>Lo que dices sin pensarlo cuenta una historia.</h2><p>Elige una sola frase de las que ya notaste durante el día. La vamos a desarmar y dejar lista su sustitución.</p></header><div className="phrase-lab"><Field {...props} answerKey="old" label="La frase automática" placeholder="Por nada. Perdón por molestarte…" rows={2} /><span aria-hidden="true">→</span><Field {...props} answerKey="story" label="Lo que literalmente dice de mí" placeholder="Dice que lo mío no vale…" rows={3} /><span aria-hidden="true">→</span><Field {...props} answerKey="new" label="La frase que elijo" placeholder="Es un placer. Gracias por decírmelo…" rows={2} /></div><blockquote className="phrase-card">Cuando aparezca <b>{oldPhrase}</b>, voy a elegir <b>{newPhrase}</b>.</blockquote></div>;
}

function DrainLedgerExperience(props: Props) {
  const [imported, setImported] = useState("");
  const importE2 = () => {
    const drains = asList(loadAnswer("E2").drena);
    const current = asList(props.answer.empty);
    const fresh = drains.filter((item) => !current.includes(item));
    setImported(drains.length === 0
      ? "No hay nada marcado como drenaje en E2 todavía."
      : fresh.length === 0
        ? "Ya habías traído todo lo de E2."
        : `Llegaron ${fresh.length} de E2. Muévelas al lado que les toque.`);
    window.setTimeout(() => setImported(""), 6000);
    if (fresh.length) props.onChange({ ...props.answer, empty: [...current, ...fresh] });
  };
  return <div className="drain-ledger journey-instrument"><header className="instrument-intro"><p className="instrument-kicker">Costo no es lo mismo que desperdicio</p><h2>Separa lo que cuesta y vale de lo que sólo se lleva algo.</h2></header><ImportCue from="E2" label="Traer lo que marqué como drenaje" onImport={importE2} /><p className="field-hint" role="status" aria-live="polite" data-shown={imported ? "" : undefined}>{imported ? <><span aria-hidden="true">!</span>{imported}</> : null}</p><div className="ledger-scale"><ListBuilder {...props} answerKey="returns" label="Drena y devuelve" placeholder="Cuesta, pero sí vale…" moveTo="empty" moveLabel="No devuelve →" /><div className="scale-spine" aria-hidden="true">↔</div><ListBuilder {...props} answerKey="empty" label="Drena y no devuelve" placeholder="Se repite y no regresa nada…" moveTo="returns" moveLabel="← Sí vale" /></div><Field {...props} answerKey="counts" label="Lo que más se repitió" help="Cuenta las apariciones en tu registro. Eso es lo primero que toca atender." placeholder="Apareció ___ veces…" rows={3} /></div>;
}

function ConversationExperience(props: Props) {
  return <div className="conversation-experience journey-instrument"><header className="instrument-intro"><p className="instrument-kicker">Una conversación · dos momentos</p><h2>Antes de hablar, deja claro qué necesitas.</h2><p>No le estás pidiendo a alguien que te resuelva. Le estás pidiendo que te escuche.</p></header><div className="conversation-scene"><section><span>Antes</span><Field {...props} answerKey="prepared" label="Lo que necesito decir en voz alta" placeholder="Quiero contarte algo que estoy pensando soltar…" /></section><div className="conversation-pause"><i>Habla sin editarte</i><b aria-hidden="true">···</b></div><section><span>Después</span><Field {...props} answerKey="justification" label="La justificación que se me salió" help="Escríbela textual, con las palabras que usaste." placeholder="Todavía no lo suelto porque…" /></section></div></div>;
}

function FarewellExperience(props: Props) {
  const importS3 = () => { const source = loadAnswer("S3"); props.onChange({ ...props.answer, source: [...new Set([...asList(props.answer.source), ...asList(source.leaves)])] }); };
  return <div className="farewell-experience journey-instrument"><header className="instrument-intro"><p className="instrument-kicker">Ya viste qué se queda</p><h2>Ahora sí: escribe una despedida, no un reporte.</h2><p>Elige algo que ya decidiste soltar. La carta puede doler y aun así ser correcta.</p></header><ImportCue from="S3" label="Traer lo que decidí soltar" onImport={importS3} />{asList(props.answer.source).length > 0 && <div className="farewell-source">{asList(props.answer.source).map((item) => <span key={item}>{item}</span>)}</div>}<article className="farewell-letter"><p>Para eso que hoy dejo ir:</p><Field {...props} answerKey="gift" label="Gracias por…" placeholder="Lo que me diste fue…" /><Field {...props} answerKey="noLonger" label="Ya no me corresponde porque…" placeholder="Dejamos de encajar cuando…" /><Field {...props} answerKey="take" label="Me llevo conmigo…" placeholder="Esto sí se queda en mí…" /><Field {...props} answerKey="closing" label="Mi última frase" placeholder="Gracias. Ya no te necesito para donde voy." rows={3} /></article></div>;
}

function CommitmentExperience(props: Props) {
  const [draft, setDraft] = useState(""); const [side, setSide] = useState<"leaves" | "stays">("leaves");
  const move = (item: string, from: "leaves" | "stays") => { const to = from === "leaves" ? "stays" : "leaves"; props.onChange({ ...props.answer, [from]: asList(props.answer[from]).filter((value) => value !== item), [to]: [...asList(props.answer[to]), item] }); };
  const add = () => { const value = draft.trim(); if (!value) return; props.onChange({ ...props.answer, [side]: [...asList(props.answer[side]), value] }); setDraft(""); };
  const complete = (item: string) => props.onChange({ ...props.answer, leaves: asList(props.answer.leaves).filter((value) => value !== item), completed: [...asList(props.answer.completed), item] });
  return <div className="commitment-experience journey-instrument"><header className="instrument-intro"><p className="instrument-kicker">Puedes cambiar de opinión antes de decidir</p><h2>Haz visible lo que se va y lo que se queda.</h2></header><div className="commitment-add"><input aria-label="Nueva decisión" value={draft} onChange={(event) => setDraft(event.target.value)} placeholder="Una frase corta…" /><select aria-label="Lado inicial" value={side} onChange={(event) => setSide(event.target.value as typeof side)}><option value="leaves">Se va</option><option value="stays">Se queda</option></select><button type="button" onClick={add}>Colocar</button></div><div className="commitment-wall">{(["leaves", "stays"] as const).map((key) => <section key={key}><h3>{key === "leaves" ? "Lo que se va" : "Lo que se queda"}</h3><ul>{asList(props.answer[key]).map((item) => <li key={item}><p>{item}</p><button type="button" onClick={() => move(item, key)}>{key === "leaves" ? "Se queda →" : "← Se va"}</button>{key === "leaves" && <button type="button" className="strike-action" onClick={() => complete(item)}>Tachar</button>}</li>)}</ul></section>)}</div>{asList(props.answer.completed).length > 0 && <section className="commitment-done"><span>Ya solté</span>{asList(props.answer.completed).map((item) => <s key={item}>{item}</s>)}</section>}</div>;
}

function IdentityExperience(props: Props) {
  return <div className="identity-experience journey-instrument"><header className="instrument-intro"><p className="instrument-kicker">No escribas “quiero ser”</p><h2>Escribe desde «soy».</h2><p>No estás llenando un perfil. Estás dejando por escrito hacia dónde caminas.</p></header><div className="identity-spread"><ListBuilder {...props} answerKey="statements" label="Lo que habla de mí" placeholder="Soy alguien que…" /><ListBuilder {...props} answerKey="gives" label="Lo que doy a otros" placeholder="Soy alguien que aporta…" /></div><section className="identity-name identity-signature"><p>Cuando lo escrito arriba se vuelva una sola presencia:</p><Field {...props} answerKey="name" label="Firma esta versión de ti" placeholder="Un nombre que al decirlo te mueva algo…" rows={2} /></section></div>;
}

type GapItem = { id: string; title: string; dimension: "habilidad" | "creencia" | "persona" | "hábito"; status: "tengo" | "sé" | "no-sé" };
function parseItems<T>(value: ExerciseAnswer[string]): T[] { return asList(value).flatMap((line) => { try { return [JSON.parse(line) as T]; } catch { return []; } }); }
function GapExperience(props: Props) {
  const [title, setTitle] = useState(""); const [dimension, setDimension] = useState<GapItem["dimension"]>("habilidad"); const [status, setStatus] = useState<GapItem["status"]>("tengo"); const items = parseItems<GapItem>(props.answer.items);
  const save = (next: GapItem[]) => props.onChange({ ...props.answer, items: next.map((item) => JSON.stringify(item)) });
  const add = () => { if (!title.trim()) return; save([...items, { id: `${Date.now()}-${Math.random()}`, title: title.trim(), dimension, status }]); setTitle(""); };
  const importP1 = () => { const p1 = loadAnswer("P1"); props.onChange({ ...props.answer, identitySource: [...new Set([...asList(props.answer.identitySource), ...asList(p1.statements), ...asList(p1.gives)])] }); };
  return <div className="gap-experience journey-instrument"><header className="instrument-intro"><p className="instrument-kicker">Tu ideal necesita piezas</p><h2>Convierte identidad en piezas concretas.</h2></header><ImportCue from="P1" label="Traer mis frases de identidad" onImport={importP1} />{asList(props.answer.identitySource).length > 0 && <div className="identity-source">{asList(props.answer.identitySource).map((item) => <span key={item}>{item}</span>)}</div>}<div className="gap-composer"><input aria-label="Nueva pieza de la brecha" value={title} onChange={(event) => setTitle(event.target.value)} placeholder="Algo que esta versión necesita…" /><select aria-label="Dimensión" value={dimension} onChange={(event) => setDimension(event.target.value as GapItem["dimension"])}><option>habilidad</option><option>creencia</option><option>persona</option><option>hábito</option></select><select aria-label="Estado" value={status} onChange={(event) => setStatus(event.target.value as GapItem["status"])}><option value="tengo">Ya lo tengo</option><option value="sé">Sé cómo conseguirlo</option><option value="no-sé">No sé todavía</option></select><button type="button" onClick={add}>Agregar</button></div><div className="gap-lanes">{(["tengo", "sé", "no-sé"] as const).map((lane) => <section key={lane}><h3>{lane === "tengo" ? "Ya está conmigo" : lane === "sé" ? "Ya es tarea" : "Todavía es pregunta"}</h3>{items.filter((item) => item.status === lane).map((item) => <article key={item.id}><span>{item.dimension}</span><p>{item.title}</p><button type="button" onClick={() => save(items.filter((entry) => entry.id !== item.id))}>×</button></article>)}</section>)}</div><Field {...props} answerKey="first" label="La cosa más pequeña por la que empiezo" placeholder="Una sola. La más chiquita…" rows={2} /></div>;
}

type EffortItem = { id: string; title: string; points: 1 | 2 | 3 };
function EffortExperience(props: Props) {
  const [title, setTitle] = useState(""); const [points, setPoints] = useState<EffortItem["points"]>(1); const entries = parseItems<EffortItem>(props.answer.entries); const total = entries.reduce((sum, item) => sum + item.points, 0);
  const save = (next: EffortItem[]) => props.onChange({ ...props.answer, entries: next.map((item) => JSON.stringify(item)), total: String(next.reduce((sum, item) => sum + item.points, 0)) });
  const importP4 = () => { const tasks = parseSprintTasks(loadAnswer("P4").tasks); save([...entries, ...tasks.filter((task) => !entries.some((entry) => entry.title === task.title)).map((task) => ({ id: task.id, title: task.title, points: 1 as const }))]); };
  const add = () => { if (!title.trim()) return; save([...entries, { id: `${Date.now()}-${Math.random()}`, title: title.trim(), points }]); setTitle(""); };
  return <div className="effort-experience journey-instrument"><header className="instrument-intro"><p className="instrument-kicker">Mide esfuerzo, no cantidad</p><h2>No todo pendiente pesa igual.</h2></header><ImportCue from="P4" label="Traer las tasks de mi miniviaje" onImport={importP4} /><div className="effort-meter"><strong>{total}</strong><span>puntos esta semana</span><i style={{ "--effort": Math.min(total, 24) / 24 } as React.CSSProperties} /></div><div className="effort-add"><input aria-label="Actividad realizada" value={title} onChange={(event) => setTitle(event.target.value)} placeholder="Lo que hiciste…" /><select aria-label="Esfuerzo real" value={points} onChange={(event) => setPoints(Number(event.target.value) as EffortItem["points"])}><option value="1">1 · Natural</option><option value="2">2 · Concentración</option><option value="3">3 · Vencerme</option></select><button type="button" onClick={add}>Registrar</button></div><ol className="effort-log">{entries.map((item) => <li key={item.id}><b>{item.points}</b><p>{item.title}</p><button type="button" onClick={() => save(entries.filter((entry) => entry.id !== item.id))}>×</button></li>)}</ol></div>;
}

function PivotExperience(props: Props) {
  const p4 = useMemo(() => loadAnswer("P4"), []);
  return <div className="pivot-experience journey-instrument"><header className="instrument-intro"><p className="instrument-kicker">Recalcular no es regresar</p><h2>Ajustar no es abandonar.</h2><p>Respira veinte segundos. Después mira el tramo, no tu valor como persona.</p></header>{asText(p4.goal) && <ImportCue from="P4" label={`Traer mi meta: ${asText(p4.goal)}`} onImport={() => props.onChange({ ...props.answer, adjusted: asText(p4.goal) })} />}<div className="pivot-dial"><Field {...props} answerKey="hard" label="¿Qué me está costando sostener?" placeholder="Esta semana se está trabando…" /><Field {...props} answerKey="different" label="¿Qué puedo hacer distinto sin romperme?" placeholder="Podría cambiar…" /><Field {...props} answerKey="choice" label="¿Le bajo a la meta o le cambio la forma?" placeholder="Elijo… porque…" /></div><section className="pivot-result"><Field {...props} answerKey="adjusted" label="Así queda el miniviaje" placeholder="La nueva versión sostenible…" /><Field {...props} answerKey="why" label="Qué ajusté y por qué" placeholder="Quiero recordar esta decisión porque…" rows={3} /></section></div>;
}

function RetrospectiveExperience(props: Props) {
  const p4 = useMemo(() => loadAnswer("P4"), []);
  return <div className="retro-experience journey-instrument"><header className="instrument-intro"><p className="instrument-kicker">Cerrar también es avanzar</p><h2>Mira el tramo completo.</h2>{asText(p4.goal) && <p>Miniviaje: {asText(p4.goal)}</p>}</header><div className="retro-board"><Field {...props} answerKey="good" label="Qué salió bien" placeholder="Incluye los avances pequeños…" /><Field {...props} answerKey="bad" label="Qué salió mal" placeholder="Sin justificarte ni castigarte…" /><Field {...props} answerKey="felt" label="Cómo me sentí" placeholder="Aunque no cuadre con los resultados…" /></div><div className="retro-close"><ListBuilder {...props} answerKey="adjustments" label="Máximo dos ajustes" placeholder="Un cambio concreto…" limit={2} /><Field {...props} answerKey="gratitude" label="Algo que agradezco de este tramo" placeholder="Agradezco…" rows={3} /></div></div>;
}

function DailyLogExperience(props: Props) {
  const value = asText(props.answer["0"]);
  return <div className="daily-experience journey-instrument"><header className="instrument-intro"><p className="instrument-kicker">Dos minutos · sin ponerte al corriente</p><h2>¿Qué necesito recordar de hoy?</h2><p>Si tienes energía, escríbelo. Si hoy sólo puedes pensarlo, también cuenta.</p></header><div className="daily-page"><time>{new Intl.DateTimeFormat("es-MX", { weekday: "long", day: "numeric", month: "long" }).format(new Date())}</time><textarea aria-label="¿Qué necesito recordar de hoy?" rows={8} value={value} onChange={(event) => props.onChange({ ...props.answer, "0": event.target.value })} placeholder="Una línea basta…" /><div className="print-value">{value}</div><button type="button" className={asText(props.answer.thoughtOnly) ? "is-marked" : ""} onClick={() => props.onChange({ ...props.answer, thoughtOnly: asText(props.answer.thoughtOnly) ? "" : new Date().toISOString() })}>Hoy sólo lo pensé</button></div></div>;
}

function SystemMapExperience(props: Props) {
  return <div className="system-experience journey-instrument"><header className="instrument-intro"><p className="instrument-kicker">Una pieza puede contaminar la vista completa</p><h2>No tires el sistema completo.</h2><p>Elige una sola área. La vamos a abrir hasta que puedas nombrar qué falla de verdad.</p></header><Field {...props} answerKey="area" label="El área que voy a mirar" placeholder="Mi trabajo, una relación, mi rutina…" rows={2} /><div className="system-flow"><Field {...props} answerKey="input" label="Qué le meto" help="Horas, dinero, energía y atención. Pon números donde puedas." placeholder="Le dedico…" /><span aria-hidden="true">→</span><Field {...props} answerKey="return" label="Qué me devuelve" help="Dinero, aprendizaje, satisfacción, contactos o salud." placeholder="Me devuelve…" /></div><section className="system-parts"><Field {...props} answerKey="parts" label="Parte el área en piezas" help="No escribas «mi trabajo»: escribe juntas, código, horarios, trayecto…" placeholder="Pieza por pieza, marca cuáles están bien y cuáles están podridas…" rows={7} /></section><section className="system-diagnosis"><Field {...props} answerKey="diagnosis" label="¿Qué puedes cambiar, delegar, reducir o negociar?" placeholder="Lo que realmente está fallando es… y puedo…" /></section></div>;
}

const COMPONENTS: Record<CustomKind, (props: Props) => JSX.Element> = {
  belief: BeliefExperience, phrase: PhraseExperience, "drain-ledger": DrainLedgerExperience,
  conversation: ConversationExperience, farewell: FarewellExperience, commitment: CommitmentExperience,
  identity: IdentityExperience, gap: GapExperience, effort: EffortExperience, pivot: PivotExperience,
  retrospective: RetrospectiveExperience, "daily-log": DailyLogExperience, "system-map": SystemMapExperience,
};

export default function JourneyExperience({ kind, ...props }: Props & { kind: CustomKind }) {
  const Component = COMPONENTS[kind];
  return <Component {...props} />;
}
