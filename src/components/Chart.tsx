import { useEffect, useRef, useState } from "react";
import type {
  BarChart,
  Chart as ChartData,
  LineChart,
  MapChart,
  PieChart,
  ProcessChart,
  TableChart,
} from "../data/types";
import "../css/chart.css";

// draws every Task 1 visual from plain data (data/task1.ts), no chart library

const M = { t: 16, r: 20, b: 44, l: 56 };

// shorter plots on short laptop screens, so the task fits without scrolling
// compact: two charts side by side (mixed tasks)
const chartHeight = (compact: boolean) =>
  Math.round(Math.max(200, compact ? Math.min(260, window.innerHeight - 520) : Math.min(340, window.innerHeight - 470)));

function useChartHeight(compact = false) {
  const [height, setHeight] = useState(() => chartHeight(compact));
  useEffect(() => {
    const onResize = () => setHeight(chartHeight(compact));
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [compact]);
  return height;
}

// draw at the real pixel width so text stays 12px on phones instead of shrinking
function useWidth(fallback = 640) {
  const ref = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(fallback);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ro = new ResizeObserver(([entry]) => setWidth(Math.max(300, Math.round(entry.contentRect.width))));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);
  return [ref, width] as const;
}

// line dash per series, so lines stay readable in black & white (like the exam paper)
const DASH = ["", "8 5", "2 4", "12 4 2 4"];

const color = (i: number) => `var(--s${(i % 8) + 1})`;

function niceScale(max: number) {
  const raw = max / 5 || 1;
  const mag = 10 ** Math.floor(Math.log10(raw));
  const norm = raw / mag;
  const step = (norm <= 1 ? 1 : norm <= 2 ? 2 : norm <= 2.5 ? 2.5 : norm <= 5 ? 5 : 10) * mag;
  const top = Math.ceil(max / step) * step;
  const ticks: number[] = [];
  for (let v = 0; v <= top + step / 2; v += step) ticks.push(+v.toFixed(6));
  return { top, ticks };
}

const fmt = (v: number) => v.toLocaleString("en", { maximumFractionDigits: 1 });
const withUnit = (v: number, unit: string) =>
  unit === "%" ? `${fmt(v)}%` : unit === "$" ? `$${fmt(v)}` : `${fmt(v)} ${unit}`;

function Legend({ names, lines }: { names: string[]; lines?: boolean }) {
  return (
    <ul className="chart-legend">
      {names.map((name, i) => (
        <li key={name}>
          <svg width="28" height="12" aria-hidden>
            {lines ? (
              <line x1="2" y1="6" x2="26" y2="6" stroke={color(i)} strokeWidth="2.5" strokeDasharray={DASH[i % 4]} />
            ) : (
              <rect x="8" y="0" width="12" height="12" rx="3" fill={color(i)} />
            )}
          </svg>
          {name}
        </li>
      ))}
    </ul>
  );
}

function DataTable({ columns, rows }: { columns: string[]; rows: (string | number)[][] }) {
  return (
    <table className="chart-table">
      <thead>
        <tr>
          {columns.map((c) => (
            <th key={c}>{c}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((row, r) => (
          <tr key={r}>
            {row.map((cell, c) => (
              <td key={c}>{typeof cell === "number" ? fmt(cell) : cell}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

// axes, grid and hover columns shared by line and bar charts
function XYChart({ data, compact, children }: { data: LineChart | BarChart; compact?: boolean; children: (y: (v: number) => number, band: number, base: number) => React.ReactNode }) {
  const [hover, setHover] = useState<number | null>(null);
  const [ref, W] = useWidth();
  const H = useChartHeight(compact);
  const PW = W - M.l - M.r;
  const PH = H - M.t - M.b;
  const max = Math.max(...data.series.flatMap((s) => s.values));
  const { top, ticks } = niceScale(max);
  const y = (v: number) => M.t + PH - (v / top) * PH;
  const band = PW / data.categories.length;
  const isLine = data.kind === "line";
  const cx = (i: number) => M.l + band * i + band / 2;

  return (
    <div className="chart-xy">
      {data.series.length > 1 && <Legend names={data.series.map((s) => s.name)} lines={isLine} />}
      <div className="chart-plot" ref={ref}>
        <svg viewBox={`0 0 ${W} ${H}`} role="img" aria-label={data.title}>
          {ticks.map((t) => (
            <g key={t}>
              <line className="chart-grid" x1={M.l} x2={W - M.r} y1={y(t)} y2={y(t)} />
              <text className="chart-tick" x={M.l - 8} y={y(t)} dy="0.32em" textAnchor="end">
                {data.unit === "%" ? `${fmt(t)}%` : fmt(t)}
              </text>
            </g>
          ))}
          <line className="chart-axis" x1={M.l} x2={W - M.r} y1={M.t + PH} y2={M.t + PH} />
          {data.categories.map((c, i) => (
            <text key={c} className="chart-tick" x={cx(i)} y={M.t + PH + 20} textAnchor="middle">
              {c}
            </text>
          ))}
          <text className="chart-label" transform={`translate(14 ${M.t + PH / 2}) rotate(-90)`} textAnchor="middle">
            {data.yLabel}
          </text>
          {hover !== null && <rect className="chart-hover-band" x={M.l + band * hover} y={M.t} width={band} height={PH} />}
          {children(y, band, M.t + PH)}
          {data.categories.map((c, i) => (
            <rect
              key={c}
              x={M.l + band * i}
              y={M.t}
              width={band}
              height={PH}
              fill="transparent"
              onMouseEnter={() => setHover(i)}
              onMouseLeave={() => setHover(null)}
              onClick={() => setHover(i)}
            />
          ))}
        </svg>
        {hover !== null && (
          <div
            className="chart-tooltip"
            style={{
              left: `${(cx(hover) / W) * 100}%`,
              transform: `translateX(${hover > data.categories.length / 2 ? "-105%" : "5%"})`,
            }}
          >
            <strong>{data.categories[hover]}</strong>
            {data.series.map((s, i) => (
              <div key={s.name} className="chart-tooltip-row">
                <span className="chart-swatch" style={{ background: color(i) }} />
                <span>{s.name}</span>
                <b>{withUnit(s.values[hover], data.unit)}</b>
              </div>
            ))}
          </div>
        )}
      </div>
      {data.xLabel && <p className="chart-note">{data.xLabel}</p>}
    </div>
  );
}

function Line({ data, compact }: { data: LineChart; compact?: boolean }) {
  return (
    <XYChart data={data} compact={compact}>
      {(y, band) =>
        data.series.map((s, si) => {
          const pts = s.values.map((v, i) => [M.l + band * i + band / 2, y(v)] as const);
          return (
            <g key={s.name}>
              <polyline
                points={pts.map((p) => p.join(",")).join(" ")}
                fill="none"
                stroke={color(si)}
                strokeWidth="2.5"
                strokeDasharray={DASH[si % 4]}
                strokeLinejoin="round"
              />
              {pts.map(([px, py], i) => (
                <circle key={i} cx={px} cy={py} r="4" fill={color(si)} className="chart-ring" />
              ))}
            </g>
          );
        })
      }
    </XYChart>
  );
}

// bar with rounded top corners, anchored flat on the baseline
function barPath(x: number, y: number, w: number, h: number) {
  const r = Math.min(4, w / 2, h);
  return `M${x},${y + h}V${y + r}Q${x},${y} ${x + r},${y}H${x + w - r}Q${x + w},${y} ${x + w},${y + r}V${y + h}Z`;
}

function Bar({ data, compact }: { data: BarChart; compact?: boolean }) {
  return (
    <XYChart data={data} compact={compact}>
      {(y, band, base) => {
        const n = data.series.length;
        const groupW = Math.min(band * 0.72, n * 34);
        const gap = 2;
        const w = (groupW - gap * (n - 1)) / n;
        return data.categories.map((c, ci) => {
          const x0 = M.l + band * ci + (band - groupW) / 2;
          return (
            <g key={c}>
              {data.series.map((s, si) => {
                const top = y(s.values[ci]);
                return <path key={s.name} d={barPath(x0 + si * (w + gap), top, w, base - top)} fill={color(si)} />;
              })}
            </g>
          );
        });
      }}
    </XYChart>
  );
}

function slicePath(cx: number, cy: number, r: number, a0: number, a1: number) {
  const p = (a: number) => `${cx + r * Math.sin(a)},${cy - r * Math.cos(a)}`;
  if (a1 - a0 >= Math.PI * 2 - 1e-6) return `M${cx - r},${cy}a${r},${r} 0 1,0 ${r * 2},0a${r},${r} 0 1,0 ${-r * 2},0`;
  return `M${cx},${cy}L${p(a0)}A${r},${r} 0 ${a1 - a0 > Math.PI ? 1 : 0},1 ${p(a1)}Z`;
}

function Pie({ data }: { data: PieChart }) {
  const [hover, setHover] = useState<string | null>(null);
  // same slice name = same color in every pie
  const names = [...new Set(data.pies.flatMap((p) => p.slices.map((s) => s.name)))];
  const idx = (name: string) => names.indexOf(name);
  const R = 84;
  const S = 260;

  return (
    <div>
      <Legend names={names} />
      <div className="chart-pies">
        {data.pies.map((pie) => {
          const total = pie.slices.reduce((sum, s) => sum + s.value, 0);
          let angle = 0;
          return (
            <figure key={pie.label} className="chart-pie">
              <figcaption>{pie.label}</figcaption>
              <svg viewBox={`0 0 ${S} ${S}`} role="img" aria-label={`${data.title}: ${pie.label}`}>
                {pie.slices.map((s) => {
                  const a0 = angle;
                  const a1 = (angle += (s.value / total) * Math.PI * 2);
                  const mid = (a0 + a1) / 2;
                  const lr = R + 22;
                  const lx = S / 2 + lr * Math.sin(mid);
                  const ly = S / 2 - lr * Math.cos(mid);
                  const pct = Math.round((s.value / total) * 100);
                  return (
                    <g
                      key={s.name}
                      onMouseEnter={() => setHover(s.name)}
                      onMouseLeave={() => setHover(null)}
                      opacity={hover && hover !== s.name ? 0.35 : 1}
                    >
                      <path d={slicePath(S / 2, S / 2, R, a0, a1)} fill={color(idx(s.name))} className="chart-ring">
                        <title>{`${s.name}: ${pct}%`}</title>
                      </path>
                      <text className="chart-tick chart-pie-label" x={lx} y={ly} dy="0.32em" textAnchor="middle">
                        {pct}%
                      </text>
                    </g>
                  );
                })}
              </svg>
            </figure>
          );
        })}
      </div>
    </div>
  );
}

function Process({ data }: { data: ProcessChart }) {
  return (
    <ol className={`chart-process ${data.cyclic ? "chart-cycle" : ""}`}>
      {data.steps.map((step, i) => (
        <li key={i}>
          <span className="chart-step">{i + 1}</span>
          {step}
        </li>
      ))}
      {data.cyclic && <li className="chart-cycle-back">↻ back to stage 1</li>}
    </ol>
  );
}

function MapPanels({ data }: { data: MapChart }) {
  return (
    <div className="chart-maps">
      {data.panels.map((panel) => (
        <figure key={panel.label} className="chart-map">
          <figcaption>{panel.label}</figcaption>
          <svg viewBox="0 0 100 70" role="img" aria-label={`${data.title}: ${panel.label}`}>
            <rect className="chart-map-bg" x="0" y="0" width="100" height="70" />
            {panel.features.map((f) => (
              <g key={f.name}>
                <rect className={`map-${f.type}`} x={f.x} y={f.y} width={f.w} height={f.h} rx={f.type === "building" ? 1 : 0} />
                <text className="chart-map-text" x={f.x + f.w / 2} y={f.y + f.h / 2} dy="0.35em" textAnchor="middle">
                  {f.type === "parking" ? `P ${f.name}` : f.name}
                </text>
              </g>
            ))}
            <text className="chart-map-north" x="95" y="7" textAnchor="middle">N↑</text>
          </svg>
        </figure>
      ))}
    </div>
  );
}

function Table({ data }: { data: TableChart }) {
  return <DataTable columns={data.columns} rows={data.rows} />;
}

function seriesRows(data: LineChart | BarChart) {
  return {
    columns: ["", ...data.series.map((s) => s.name)],
    rows: data.categories.map((c, i) => [c, ...data.series.map((s) => s.values[i])]),
  };
}

export default function Chart({ data, compact }: { data: ChartData; compact?: boolean }) {
  if (data.kind === "image") {
    return <img className="chart-image" src={data.src} alt={data.alt} />;
  }

  const hasData = data.kind === "line" || data.kind === "bar" || data.kind === "pie";

  return (
    <figure className="chart">
      <figcaption className="chart-title">{data.title}</figcaption>
      {data.kind === "line" && <Line data={data} compact={compact} />}
      {data.kind === "bar" && <Bar data={data} compact={compact} />}
      {data.kind === "pie" && <Pie data={data} />}
      {data.kind === "table" && <Table data={data} />}
      {data.kind === "process" && <Process data={data} />}
      {data.kind === "map" && <MapPanels data={data} />}
      {hasData && (
        <details className="chart-details">
          <summary>Show data as a table</summary>
          {data.kind === "pie" ? (
            <DataTable
              columns={["", ...data.pies.map((p) => p.label)]}
              rows={[...new Set(data.pies.flatMap((p) => p.slices.map((s) => s.name)))].map((name) => [
                name,
                ...data.pies.map((p) => {
                  const v = p.slices.find((s) => s.name === name)?.value;
                  return v === undefined ? "–" : `${v}%`;
                }),
              ])}
            />
          ) : (
            <DataTable {...seriesRows(data)} />
          )}
        </details>
      )}
    </figure>
  );
}
