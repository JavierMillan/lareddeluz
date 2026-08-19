import { LETTERS } from "./letters";

type Props = { activeIndex: number; onSelect: (index: number) => void };

export function FlightPath({ activeIndex, onSelect }: Props) {
  return (
    <nav className="flight-path" aria-label="Capítulos de DESPEGA">
      <div className="flight-path__line" aria-hidden="true"><span style={{ transform: `scaleX(${activeIndex / (LETTERS.length - 1)})` }} /></div>
      <ol>
        {LETTERS.map((item, index) => {
          const active = index === activeIndex;
          const label = item.verb[0] + item.verb.slice(1).toLowerCase();
          return <li key={item.id}><button type="button" aria-current={active ? "step" : undefined} aria-label={`${label}${active ? ", capítulo actual" : ""}`} onClick={() => onSelect(index)}><span>{item.letter}</span><small>{String(index + 1).padStart(2, "0")}</small></button></li>;
        })}
      </ol>
    </nav>
  );
}
