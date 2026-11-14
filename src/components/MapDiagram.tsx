import { createContext, useContext, useId } from "react";
import { useWidth } from "../hooks/LOCAL/useWidth";
import type { AreaType, LineType, MapChart, MapFeature, Pt } from "../data/types";

// Task 1 maps drawn like a printed exam map: patterned land use, cased roads,
// rivers, buildings, trees, halo labels, compass, scale bar and an automatic key

const r2 = (v: number) => Math.round(v * 100) / 100;
const pt = (p: readonly number[]) => `${r2(p[0])},${r2(p[1])}`;

// straight segments, or a Catmull-Rom curve through the points when smooth
function pathD(pts: Pt[], closed: boolean, smooth?: boolean) {
  if (!smooth || pts.length < 3) return `M${pts.map(pt).join("L")}${closed ? "Z" : ""}`;
  const n = pts.length;
  const get = (i: number) => (closed ? pts[(i + n) % n] : pts[Math.max(0, Math.min(n - 1, i))]);
  let d = `M${pt(pts[0])}`;
  for (let i = 0; i < (closed ? n : n - 1); i++) {
    const [p0, p1, p2, p3] = [get(i - 1), get(i), get(i + 1), get(i + 2)];
    const c1 = [p1[0] + (p2[0] - p0[0]) / 6, p1[1] + (p2[1] - p0[1]) / 6];
    const c2 = [p2[0] - (p3[0] - p1[0]) / 6, p2[1] - (p3[1] - p1[1]) / 6];
    d += `C${pt(c1)} ${pt(c2)} ${pt(p2)}`;
  }
  return closed ? `${d}Z` : d;
}

const centroid = (pts: Pt[]): Pt => [
  pts.reduce((s, p) => s + p[0], 0) / pts.length,
  pts.reduce((s, p) => s + p[1], 0) / pts.length,
];

// painted bottom → top
const AREA_ORDER: AreaType[] = [
  "sea",
  "land",
  "lake",
  "swim",
  "farm",
  "forest",
  "park",
  "zone",
  "housing",
  "beach",
  "parking",
];
const LINE_ORDER: LineType[] = ["river", "footpath", "track", "pier", "road", "railway", "mainroad", "motorway"];

const AREA_NAMES: Partial<Record<AreaType, string>> = {
  sea: "Sea",
  lake: "Lake",
  swim: "Swimming area",
  beach: "Beach",
  farm: "Farmland",
  park: "Park / gardens",
  forest: "Woodland",
  housing: "Housing",
  parking: "Car park",
};

const LINE_NAMES: Record<LineType, string> = {
  motorway: "Motorway",
  mainroad: "Main road",
  road: "Road",
  track: "Vehicle track",
  footpath: "Footpath",
  railway: "Railway",
  river: "River",
  pier: "Pier",
};

// label sizes in screen pixels; converted to map units so text stays the same size at any map width
const LABEL_PX = { s: 10.5, m: 12.5, l: 15 };

// map units per screen pixel for the panel being drawn
const Scale = createContext(0.32);

// fill for an area: flat colour + a pattern for textured land uses
const areaFill = (type: AreaType, id: string) =>
  type === "farm" || type === "beach" || type === "housing" || type === "forest" || type === "sea" || type === "swim"
    ? `url(#${id}-${type})`
    : undefined;

function Defs({ id }: { id: string }) {
  return (
    <defs>
      <pattern id={`${id}-farm`} width="2.4" height="2.4" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
        <rect width="2.4" height="2.4" className="mp-farm-bg" />
        <line x1="0" y1="0" x2="0" y2="2.4" className="mp-farm-line" />
      </pattern>
      <pattern id={`${id}-beach`} width="2" height="2" patternUnits="userSpaceOnUse">
        <rect width="2" height="2" className="mp-beach-bg" />
        <circle cx="0.5" cy="0.5" r="0.22" className="mp-beach-dot" />
        <circle cx="1.5" cy="1.5" r="0.22" className="mp-beach-dot" />
      </pattern>
      <pattern
        id={`${id}-housing`}
        width="2.2"
        height="2.2"
        patternUnits="userSpaceOnUse"
        patternTransform="rotate(45)"
      >
        <rect width="2.2" height="2.2" className="mp-housing-bg" />
        <line x1="0" y1="0" x2="0" y2="2.2" className="mp-housing-line" />
        <line x1="0" y1="0" x2="2.2" y2="0" className="mp-housing-line" />
      </pattern>
      <pattern id={`${id}-forest`} width="4" height="3.6" patternUnits="userSpaceOnUse">
        <rect width="4" height="3.6" className="mp-forest-bg" />
        <circle cx="1" cy="1" r="0.75" className="mp-forest-tree" />
        <circle cx="3" cy="2.8" r="0.75" className="mp-forest-tree" />
      </pattern>
      <pattern id={`${id}-sea`} width="8" height="4" patternUnits="userSpaceOnUse">
        <rect width="8" height="4" className="mp-sea-bg" />
        <path d="M0.5,2 q1,-0.8 2,0 t2,0" className="mp-sea-wave" />
      </pattern>
      <pattern id={`${id}-swim`} width="2.4" height="2.4" patternUnits="userSpaceOnUse">
        <rect width="2.4" height="2.4" className="mp-swim-bg" />
        <circle cx="1.2" cy="1.2" r="0.25" className="mp-swim-dot" />
      </pattern>
    </defs>
  );
}

function Label({
  text,
  at,
  size = "m",
  italic,
  water,
  angle,
}: {
  text: string;
  at: Pt;
  size?: "s" | "m" | "l";
  italic?: boolean;
  water?: boolean;
  angle?: number;
}) {
  // multi-line labels: "Post\nOffice"
  const lines = text.split("\n");
  const k = useContext(Scale);
  const fs = LABEL_PX[size] * k;
  return (
    <text
      className={`mp-label${water ? " mp-label-water" : ""}${italic ? " mp-label-italic" : ""}`}
      fontSize={fs}
      strokeWidth={fs * 0.28}
      textAnchor="middle"
      transform={`translate(${r2(at[0])} ${r2(at[1])})${angle ? ` rotate(${angle})` : ""}`}
    >
      {lines.map((l, i) => (
        <tspan key={i} x="0" dy={i === 0 ? `${0.35 - (lines.length - 1) * 0.55}em` : "1.1em"}>
          {l}
        </tspan>
      ))}
    </text>
  );
}

// zones: opaque tint of a series colour, so overlapping zones don't blend into a third colour
const zoneStyle = (zone = 0) => ({
  fill: `color-mix(in srgb, var(--s${(zone % 8) + 1}) 32%, var(--mp-land))`,
  stroke: `var(--s${(zone % 8) + 1})`,
});

function Area({ f, id }: { f: Extract<MapFeature, { kind: "area" }>; id: string }) {
  return (
    <path
      d={pathD(f.points, true, f.smooth)}
      className={`mp-area mp-${f.type}`}
      fill={areaFill(f.type, id)}
      style={f.type === "zone" ? zoneStyle(f.zone) : undefined}
    />
  );
}

function Line({ f }: { f: Extract<MapFeature, { kind: "line" }> }) {
  const d = pathD(f.points, false, f.smooth);
  // two strokes: dark casing underneath, fill on top (railway: white dashes over dark)
  return (
    <g className={`mp-line mp-${f.type}`}>
      <path d={d} className="mp-casing" />
      <path d={d} className="mp-fill" />
      {f.type === "motorway" && <path d={d} className="mp-centre" />}
    </g>
  );
}

const lineLabelAt = (pts: Pt[]): Pt => {
  const m = Math.floor((pts.length - 1) / 2);
  const a = pts[m];
  const b = pts[Math.min(pts.length - 1, m + 1)];
  return [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2];
};

function House({ p }: { p: Pt }) {
  const [x, y] = p;
  return (
    <path
      className="mp-house"
      d={`M${r2(x - 1.3)},${r2(y + 1.15)}V${r2(y - 0.25)}L${r2(x)},${r2(y - 1.45)}L${r2(x + 1.3)},${r2(y - 0.25)}V${r2(y + 1.15)}Z`}
    />
  );
}

function Tree({ p }: { p: Pt }) {
  return (
    <g className="mp-tree">
      <circle cx={p[0]} cy={p[1]} r="1.5" />
      <circle cx={p[0] - 0.35} cy={p[1] - 0.35} r="0.55" className="mp-tree-hi" />
    </g>
  );
}

// compass and scale bar keep the same on-screen size at any map width (designed at 0.24 units/px)
function Compass() {
  const z = useContext(Scale) / 0.24;
  return (
    <g className="mp-compass" transform={`translate(${100 - 6 * z} ${4 + 4 * z}) scale(${z})`}>
      <circle r="3.6" />
      <path d="M0,-3 L1.3,1.6 L0,0.8 L-1.3,1.6 Z" />
      <text y="-4.4" textAnchor="middle">
        N
      </text>
    </g>
  );
}

function ScaleBar({ label }: { label: string }) {
  const z = useContext(Scale) / 0.24;
  return (
    <g className="mp-scale" transform={`translate(4 ${70 - 5 * z}) scale(${z})`}>
      <rect x="0" y="0" width="7" height="1.1" className="mp-scale-dark" />
      <rect x="7" y="0" width="7" height="1.1" className="mp-scale-light" />
      <text x="0" y="-1" textAnchor="start">
        0
      </text>
      <text x="14" y="-1" textAnchor="middle">
        {label}
      </text>
    </g>
  );
}

function Panel({ data, panel, id }: { data: MapChart; panel: MapChart["panels"][number]; id: string }) {
  const f = panel.features;
  const areas = f
    .filter((x) => x.kind === "area")
    .sort((a, b) => AREA_ORDER.indexOf(a.type) - AREA_ORDER.indexOf(b.type));
  const lines = f
    .filter((x) => x.kind === "line")
    .sort((a, b) => LINE_ORDER.indexOf(a.type) - LINE_ORDER.indexOf(b.type));
  const buildings = f.filter((x) => x.kind === "building");
  const sea = data.base === "sea";
  const [ref, width] = useWidth(320, 200);

  return (
    <figure className="mp-panel" ref={ref}>
      {panel.label && <figcaption>{panel.label}</figcaption>}
      <Scale.Provider value={100 / width}>
        <svg viewBox="0 0 100 70" role="img" aria-label={`${data.title}: ${panel.label}`}>
          <rect
            width="100"
            height="70"
            className={sea ? "mp-sea" : "mp-land"}
            fill={sea ? `url(#${id}-sea)` : undefined}
          />
          {areas.map((a, i) => (
            <Area key={i} f={a} id={id} />
          ))}
          {lines.map((l, i) => (
            <Line key={i} f={l} />
          ))}
          {f.map((x, i) => x.kind === "trees" && x.points.map((p, j) => <Tree key={`${i}-${j}`} p={p} />))}
          {f.map((x, i) => x.kind === "houses" && x.points.map((p, j) => <House key={`${i}-${j}`} p={p} />))}
          {buildings.map((b, i) => (
            <g key={i}>
              <rect x={b.x + 0.4} y={b.y + 0.4} width={b.w} height={b.h} rx="0.3" className="mp-shadow" />
              <rect
                x={b.x}
                y={b.y}
                width={b.w}
                height={b.h}
                rx="0.3"
                className={`mp-building mp-building-${b.tone ?? "plain"}`}
              />
            </g>
          ))}

          {/* labels last so nothing covers them */}
          {areas.map(
            (a, i) =>
              a.label && (
                <Label
                  key={`a${i}`}
                  text={a.label}
                  at={a.at ?? centroid(a.points)}
                  water={a.type === "sea" || a.type === "lake" || a.type === "swim"}
                  italic={a.type === "sea" || a.type === "lake" || a.type === "swim"}
                />
              ),
          )}
          {lines.map(
            (l, i) =>
              l.label && (
                <Label
                  key={`l${i}`}
                  text={l.label}
                  at={l.at ?? lineLabelAt(l.points)}
                  angle={l.angle}
                  size="s"
                  italic={l.type === "river"}
                  water={l.type === "river" || l.type === "pier"}
                />
              ),
          )}
          {buildings.map(
            (b, i) =>
              b.label && <Label key={`b${i}`} text={b.label} at={b.at ?? [b.x + b.w / 2, b.y + b.h + 3]} size="s" />,
          )}
          {f.map(
            (x, i) =>
              x.kind === "label" && (
                <Label key={`t${i}`} text={x.text} at={x.at} size={x.size} italic={x.italic} water={sea && x.italic} />
              ),
          )}

          <Compass />
          {data.scale && <ScaleBar label={data.scale} />}
        </svg>
      </Scale.Provider>
    </figure>
  );
}

// key under the maps, built from what the panels actually use
function Key({ data, id }: { data: MapChart; id: string }) {
  const all = data.panels.flatMap((p) => p.features);
  const areaTypes = AREA_ORDER.filter((t) => AREA_NAMES[t] && all.some((f) => f.kind === "area" && f.type === t));
  const lineTypes = LINE_ORDER.filter((t) => all.some((f) => f.kind === "line" && f.type === t));
  const has = (k: MapFeature["kind"]) => all.some((f) => f.kind === k);

  const item = (key: string, label: string, swatch: React.ReactNode) => (
    <li key={key}>
      <svg viewBox="0 0 10 5" width="30" height="15" aria-hidden>
        {swatch}
      </svg>
      {label}
    </li>
  );

  return (
    <ul className="mp-key">
      {data.zones?.map((z, i) =>
        item(
          `z${i}`,
          z,
          <rect x="0.5" y="0.5" width="9" height="4" className="mp-area mp-zone" style={zoneStyle(i)} />,
        ),
      )}
      {areaTypes.map((t) =>
        item(
          t,
          AREA_NAMES[t]!,
          <rect x="0.5" y="0.5" width="9" height="4" className={`mp-area mp-${t}`} fill={areaFill(t, id)} />,
        ),
      )}
      {lineTypes.map((t) =>
        item(
          t,
          LINE_NAMES[t],
          <g className={`mp-line mp-${t}`}>
            <path d="M0.5,2.5H9.5" className="mp-casing" />
            <path d="M0.5,2.5H9.5" className="mp-fill" />
            {t === "motorway" && <path d="M0.5,2.5H9.5" className="mp-centre" />}
          </g>,
        ),
      )}
      {has("building") &&
        item(
          "building",
          "Building",
          <rect x="3" y="0.8" width="4" height="3.4" rx="0.3" className="mp-building mp-building-plain" />,
        )}
      {has("houses") && item("houses", "Houses", <House p={[5, 2.6]} />)}
      {has("trees") && item("trees", "Trees", <Tree p={[5, 2.5]} />)}
    </ul>
  );
}

export default function MapDiagram({ data }: { data: MapChart }) {
  // pattern ids must be unique per chart and valid inside url(#…)
  const id = `m${useId().replace(/[^a-zA-Z0-9]/g, "")}`;
  return (
    <div className="mp">
      <svg width="0" height="0" className="mp-defs" aria-hidden>
        <Defs id={id} />
      </svg>
      <div className="mp-panels">
        {data.panels.map((panel) => (
          <Panel key={panel.label} data={data} panel={panel} id={id} />
        ))}
      </div>
      <Key data={data} id={id} />
    </div>
  );
}
