import { useMemo, useState } from "react";
import { composeStatement, parseSprintTasks, type ExerciseAnswer, type ExerciseExperience, type SprintTask } from "../exerciseExperiences";

type Props = { experience: Extract<ExerciseExperience, { kind: "sprint" }>; answer: ExerciseAnswer; onChange: (answer: ExerciseAnswer) => void };
const asText = (value: ExerciseAnswer[string]) => Array.isArray(value) ? value.join("\n") : value ?? "";

export default function SprintExperience({ experience, answer, onChange }: Props) {
  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState<SprintTask["priority"]>("alta");
  const [points, setPoints] = useState<SprintTask["points"]>(1);
  const tasks = parseSprintTasks(answer.tasks);
  const planned = tasks.reduce((total, task) => total + task.points, 0);
  const capacity = Math.max(0, Number(asText(answer.capacity)) || 0);
  const declaration = useMemo(() => composeStatement(experience.template, answer), [answer, experience.template]);

  const saveTasks = (next: SprintTask[]) => onChange({ ...answer, tasks: next.map((task) => JSON.stringify(task)) });
  const addTask = () => {
    const value = title.trim();
    if (!value) return;
    saveTasks([...tasks, { id: `${Date.now()}-${Math.random()}`, title: value, priority, points }]);
    setTitle("");
  };

  return <div className="sprint-experience">
    <header className="instrument-intro sprint-intro">
      <div><p className="instrument-kicker">Un tramo · no toda tu vida</p><h2>Arma un miniviaje que quepa en tu semana real.</h2></div>
      <label className="capacity-field">Capacidad semanal <input type="number" min="1" max="30" aria-label="Capacidad semanal" value={asText(answer.capacity)} onChange={(event) => onChange({ ...answer, capacity: event.target.value })} /><span>puntos</span></label>
    </header>
    <div className="sprint-contract">
      {experience.fields.map((field) => <label key={field.key}><span>{field.label}</span><input value={asText(answer[field.key])} onChange={(event) => onChange({ ...answer, [field.key]: event.target.value })} placeholder={field.placeholder} /></label>)}
    </div>
    <blockquote className="sprint-declaration">{declaration}</blockquote>
    <section className="sprint-board">
      <header><div><p className="instrument-kicker">Backlog de esta vuelta</p><h3>Tasks pequeñas, peso honesto.</h3></div><strong className={capacity > 0 && planned > capacity ? "is-over" : ""}>{planned} de {capacity || "—"} puntos planeados</strong></header>
      <div className="task-composer">
        <input aria-label="Nombre de la task" value={title} onChange={(event) => setTitle(event.target.value)} placeholder="Una acción que sí cabe en este tramo…" />
        <label>Prioridad<select aria-label="Prioridad" value={priority} onChange={(event) => setPriority(event.target.value as SprintTask["priority"])}><option value="alta">Alta</option><option value="media">Media</option><option value="baja">Baja</option></select></label>
        <label>Peso<select aria-label="Peso estimado" value={points} onChange={(event) => setPoints(Number(event.target.value) as SprintTask["points"])}><option value="1">1</option><option value="2">2</option><option value="3">3</option></select></label>
        <button type="button" onClick={addTask}>Agregar task</button>
      </div>
      {capacity > 0 && planned > capacity && <p className="capacity-warning">Tu sprint pesa más que tu semana. No es un error: es una invitación a recortar antes de empezar.</p>}
      <ol className="sprint-tasks">{tasks.map((task) => <li key={task.id}><span className={`task-priority task-priority--${task.priority}`}>{task.priority}</span><p>{task.title}</p><b>{task.points} pt</b><button type="button" onClick={() => saveTasks(tasks.filter((item) => item.id !== task.id))} aria-label={`Quitar ${task.title}`}>×</button></li>)}</ol>
    </section>
  </div>;
}

