import type { CSSProperties } from "react";
import { LETTERS } from "./letters";

type Props = { activeIndex: number; onSelect: (index: number) => void };

/**
 * Las siete coordenadas, en linea.
 *
 * Cada una es un medallon de cobre: bisel, brillo interior y guardas en las
 * esquinas. El tramo recorrido se llena de cobre solido; lo que falta queda
 * punteado.
 */
export function FlightPath({ activeIndex, onSelect }: Props) {
  const progress = activeIndex / (LETTERS.length - 1);
  return (
    <nav className="flight-path" aria-label="Capítulos de DESPEGA">
      <div className="flight-path__rail" aria-hidden="true">
        <span className="flight-path__travelled" style={{ transform: `scaleX(${progress})` }} />
      </div>
      <ol>
        {LETTERS.map((item, index) => {
          const active = index === activeIndex;
          const done = index < activeIndex;
          const label = item.verb[0] + item.verb.slice(1).toLowerCase();
          return (
            <li key={item.id}>
              <button
                type="button"
                aria-current={active ? "step" : undefined}
                aria-label={`${label}${active ? ", capítulo actual" : ""}`}
                data-done={done || undefined}
                onClick={() => onSelect(index)}
                style={{ "--i": index } as CSSProperties}
              >
                <span className="flight-path__medal">
                  <i className="flight-path__guard" aria-hidden="true" />
                  <b>{item.letter}</b>
                </span>
                <small>{String(index + 1).padStart(2, "0")}</small>
                <em>{label}</em>
              </button>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
