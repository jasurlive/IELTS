import type { ProcessChart, ProcessStep } from "../data/types";
import { PROCESS_ICONS } from "../lib/icons";
import { useWidth } from "../hooks/LOCAL/useWidth";

// Task 1 process diagrams: a numbered flow (snaking rows) or a loop for life cycles

const GAP = 40; // room between stages for the arrow
const MIN_CARD = 150;

type Dir = "right" | "left" | "down" | null;

function Stage({ step, n, dir }: { step: ProcessStep; n: number; dir?: Dir }) {
  const Icon = step.icon ? PROCESS_ICONS[step.icon] : null;
  return (
    <div className="proc-card">
      <span className="proc-num">{n}</span>
      {Icon && (
        <span className="proc-icon" aria-hidden>
          <Icon />
        </span>
      )}
      <strong className="proc-label">{step.label}</strong>
      {step.note && <span className="proc-note">{step.note}</span>}
      {step.inputs && (
        <span className="proc-inputs">
          {step.inputs.map((x) => (
            <span key={x} className="proc-input">
              + {x}
            </span>
          ))}
        </span>
      )}
      {dir && <Arrow dir={dir} />}
    </div>
  );
}

function Arrow({ dir }: { dir: Exclude<Dir, null> }) {
  const horizontal = dir !== "down";
  return (
    <svg
      className={`proc-arrow proc-arrow-${dir}`}
      viewBox={horizontal ? "0 0 40 16" : "0 0 16 40"}
      aria-hidden
    >
      {horizontal ? (
        <g transform={dir === "left" ? "translate(40 0) scale(-1 1)" : undefined}>
          <line x1="5" y1="8" x2="28" y2="8" />
          <path d="M27 2 L37 8 L27 14 Z" />
        </g>
      ) : (
        <>
          <line x1="8" y1="5" x2="8" y2="28" />
          <path d="M2 27 L8 37 L14 27 Z" />
        </>
      )}
    </svg>
  );
}

// rows of stages that snake left→right, then right→left, so the arrows never cross
function Flow({ data, width }: { data: ProcessChart; width: number }) {
  const n = data.steps.length;
  const cols = Math.max(1, Math.min(4, n, Math.floor((width + GAP) / (MIN_CARD + GAP))));

  return (
    <>
      <div className="proc-flow" style={{ gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))` }}>
        {data.steps.map((step, i) => {
          const row = Math.floor(i / cols);
          const pos = i % cols;
          const col = row % 2 === 0 ? pos : cols - 1 - pos;
          let dir: Dir = null;
          if (i < n - 1) dir = Math.floor((i + 1) / cols) !== row ? "down" : row % 2 === 0 ? "right" : "left";
          return (
            <div key={i} className="proc-cell" style={{ gridRow: row + 1, gridColumn: col + 1 }}>
              <Stage step={step} n={i + 1} dir={dir} />
            </div>
          );
        })}
      </div>
      {data.cyclic && <p className="proc-loop-note">↻ The cycle then begins again at stage 1</p>}
    </>
  );
}

// life cycles: stages around an ellipse, arrowheads on the ring show the direction
function Cycle({ data, width }: { data: ProcessChart; width: number }) {
  const n = data.steps.length;
  const H = Math.round(Math.min(620, Math.max(440, width * 0.74)));
  const cardW = Math.round(Math.min(190, Math.max(130, width * 0.26)));
  const cx = width / 2;
  const cy = H / 2;
  const rx = cx - cardW / 2 - 6;
  const ry = cy - 82; // room for the top and bottom cards
  const angle = (i: number) => -Math.PI / 2 + (i * 2 * Math.PI) / n;
  const at = (t: number) => [cx + rx * Math.cos(t), cy + ry * Math.sin(t)] as const;

  return (
    <div className="proc-cycle" style={{ height: H }}>
      <svg className="proc-ring" width={width} height={H} aria-hidden>
        <ellipse cx={cx} cy={cy} rx={rx} ry={ry} />
        {data.steps.map((_, i) => {
          // arrowhead halfway between this stage and the next, pointing along the ring
          const t = angle(i) + Math.PI / n;
          const [x, y] = at(t);
          const deg = (Math.atan2(ry * Math.cos(t), -rx * Math.sin(t)) * 180) / Math.PI;
          return <path key={i} d="M-8,-7 L9,0 L-8,7 Z" transform={`translate(${x} ${y}) rotate(${deg})`} />;
        })}
      </svg>
      {data.center && <div className="proc-center">{data.center}</div>}
      {data.steps.map((step, i) => {
        const [x, y] = at(angle(i));
        return (
          <div key={i} className="proc-node" style={{ left: x, top: y, width: cardW }}>
            <Stage step={step} n={i + 1} />
          </div>
        );
      })}
    </div>
  );
}

export default function ProcessDiagram({ data }: { data: ProcessChart }) {
  const [ref, width] = useWidth(640, 260);
  const loop = data.cyclic && width >= 520 && data.steps.length <= 8;
  return (
    <div ref={ref} className="proc">
      {loop ? <Cycle data={data} width={width} /> : <Flow data={data} width={width} />}
    </div>
  );
}
