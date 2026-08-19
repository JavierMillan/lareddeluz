import { useId } from "react";
import type { Constellation } from "../data/constellations";

type FigureId = Constellation["figure"];

type FigureGeometry = {
  label: string;
  paths: readonly string[];
  stars: readonly (readonly [number, number, number])[];
};

const FIGURES: Record<FigureId, FigureGeometry> = {
  aquila: {
    label: "Aquila",
    paths: [
      "M60 28L85 42L115 28",
      "M85 42L85 72L125 95",
      "M155 100L125 95",
      "M85 72L50 108L25 123",
      "M85 72L110 123",
    ],
    stars: [[60, 28, 2], [85, 42, 4], [115, 28, 2], [85, 72, 2], [125, 95, 2], [155, 100, 1.4], [50, 108, 1.5], [25, 123, 1.2], [110, 123, 1.5]],
  },
  lyra: {
    label: "Lyra",
    paths: ["M38 18L78 43L110 75L92 116L58 96L78 43"],
    stars: [[38, 18, 4.3], [78, 43, 2], [110, 75, 2], [92, 116, 1.8], [58, 96, 1.8]],
  },
  gemini: {
    label: "Gemini",
    paths: [
      "M42 19L60 43L66 73L54 108",
      "M66 73L34 88",
      "M60 43L102 48L116 79L123 111",
      "M116 79L146 93",
      "M102 48L127 29",
      "M102 48L87 20",
    ],
    stars: [[42, 19, 3.7], [60, 43, 2], [66, 73, 1.8], [54, 108, 1.5], [34, 88, 1.2], [102, 48, 3.3], [116, 79, 1.8], [123, 111, 1.5], [146, 93, 1.2], [127, 29, 1.5], [87, 20, 1.3]],
  },
  "corona-borealis": {
    label: "Corona Borealis",
    paths: ["M27 89L46 53L73 31L103 35L132 57L152 91L165 112"],
    stars: [[27, 89, 1.5], [46, 53, 2], [73, 31, 2.3], [103, 35, 4], [132, 57, 2], [152, 91, 1.8], [165, 112, 1.3]],
  },
  leo: {
    label: "Leo",
    paths: ["M28 85L60 62L95 73L130 101L158 81L143 42L117 25L98 45L95 73", "M28 85L45 107"],
    stars: [[28, 85, 1.7], [60, 62, 2], [95, 73, 3.4], [130, 101, 1.8], [158, 81, 1.6], [143, 42, 1.8], [117, 25, 1.7], [98, 45, 1.5], [45, 107, 1.2]],
  },
};

type Props = {
  figure: FigureId;
  label?: string;
  className?: string;
};

export function ConstellationFigure({ figure, label, className }: Props) {
  const geometry = FIGURES[figure];
  const gradientId = `constellation-gradient-${useId().replace(/:/g, "")}`;

  return (
    <svg
      role="img"
      aria-label={label ?? geometry.label}
      data-figure={figure}
      className={className}
      viewBox="0 0 180 135"
    >
      <title>{label ?? geometry.label}</title>
      <defs>
        <linearGradient id={gradientId}>
          <stop stopColor="currentColor" stopOpacity="0.2" />
          <stop offset="0.5" stopColor="currentColor" />
          <stop offset="1" stopColor="#f9f4e3" stopOpacity="0.55" />
        </linearGradient>
      </defs>
      <g className="rdl-figure__glow" aria-hidden="true">
        {geometry.paths.map((path) => <path key={`glow-${path}`} d={path} />)}
      </g>
      <g className="rdl-figure__lines" stroke={`url(#${gradientId})`} aria-hidden="true">
        {geometry.paths.map((path) => <path key={path} d={path} />)}
      </g>
      <g className="rdl-figure__stars" aria-hidden="true">
        {geometry.stars.map(([cx, cy, r], index) => (
          <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r={r} data-core={r >= 3 || undefined} style={{ animationDelay: `${index * -0.4}s` }} />
        ))}
      </g>
    </svg>
  );
}
