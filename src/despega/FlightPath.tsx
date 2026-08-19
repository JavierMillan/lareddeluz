import { LETTERS } from "./letters";

type Props = { activeIndex: number; onSelect: (index: number) => void };

/** Cada coordenada se posa mas alto que la anterior: el vuelo asciende. */
const LIFT = [0, 8, 15, 23, 31, 40, 50];
const CURVE = LIFT.map((lift, i) => `${(i / (LIFT.length - 1)) * 100},${100 - lift * 1.4}`).join(" ");

export function FlightPath({ activeIndex, onSelect }: Props) {
  const progress = activeIndex / (LETTERS.length - 1);
  return (
    <nav className="flight-path" aria-label="Capítulos de DESPEGA">
      {/* Trazo recorrido en cobre solido, lo que falta punteado. */}
      <svg className="flight-path__trace" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
        <polyline className="flight-path__remaining" points={CURVE} pathLength="1" />
        <polyline className="flight-path__travelled" points={CURVE} pathLength="1" style={{ strokeDasharray: 1, strokeDashoffset: 1 - progress }} />
      </svg>
      <ol>
        {LETTERS.map((item, index) => {
          const active = index === activeIndex;
          const label = item.verb[0] + item.verb.slice(1).toLowerCase();
          return <li key={item.id} style={{ "--lift": `${LIFT[index]}%` } as React.CSSProperties}><button type="button" aria-current={active ? "step" : undefined} aria-label={`${label}${active ? ", capítulo actual" : ""}`} onClick={() => onSelect(index)}><span>{item.letter}</span><small>{String(index + 1).padStart(2, "0")}</small></button></li>;
        })}
      </ol>
    </nav>
  );
}
