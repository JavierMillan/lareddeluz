import { motion } from "motion/react";

export type SkyPhase = "void" | "link" | "constellation" | "ecosystem";

type Props = {
  phase: SkyPhase;
  active: boolean;
};

const nodes = [
  [198, 292, 7],
  [414, 172, 5],
  [632, 324, 4],
  [864, 148, 6],
  [1032, 352, 4],
  [694, 82, 3],
  [326, 404, 3],
  [930, 414, 3],
] as const;

const links = [
  "M198 292L414 172",
  "M414 172L632 324",
  "M632 324L864 148",
  "M864 148L1032 352",
  "M414 172L694 82",
  "M694 82L864 148",
  "M198 292L326 404",
  "M632 324L930 414",
] as const;

export function SkyField({ phase, active }: Props) {
  return (
    <div className="rdl-sky" data-phase={phase} data-active={active}>
      <div className="rdl-sky__aurora" />
      <svg
        data-testid="sky-field"
        data-phase={phase}
        aria-hidden="true"
        viewBox="0 0 1200 500"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <radialGradient id="rdl-star">
            <stop stopColor="#f9f4e3" />
            <stop offset="1" stopColor="#e4cd85" />
          </radialGradient>
          <filter id="rdl-glow" x="-300%" y="-300%" width="700%" height="700%">
            <feGaussianBlur stdDeviation="5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        <g className="rdl-sky__links">
          {links.map((d, index) => (
            <motion.path
              key={d}
              d={d}
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 1.4, delay: index * 0.08 }}
            />
          ))}
        </g>

        <g className="rdl-sky__nodes">
          {nodes.map(([cx, cy, r], index) => (
            <circle
              key={`${cx}-${cy}`}
              cx={cx}
              cy={cy}
              r={r}
              style={{ animationDelay: `${index * -0.65}s` }}
            />
          ))}
        </g>
      </svg>
    </div>
  );
}
