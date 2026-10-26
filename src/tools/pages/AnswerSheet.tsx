import { useState } from "react";
import confetti from "canvas-confetti";
import { FiCheck, FiCheckCircle, FiHeadphones, FiBookOpen, FiTrash2, FiKey, FiEdit3, FiX } from "react-icons/fi";
import Timer from "../components/Timer";
import { useCountdown } from "../hooks/LOCAL/useCountdown";
import { useLocalStorage } from "../hooks/LOCAL/useLocalStorage";
import "../css/answer-sheet.css";

type Section = "listening" | "reading";
type Mark = "right" | "wrong" | null;
// marks: ticks you set by hand; they win over the automatic answer-key check
type Sheet = { answers: string[]; key: string[]; marks: Mark[]; checked: boolean };

const blank = (): Sheet => ({
  answers: Array(40).fill(""),
  key: Array(40).fill(""),
  marks: Array(40).fill(null),
  checked: false,
});

// raw score -> approximate band (Academic), [min correct, band]
const BANDS: Record<Section, [number, number][]> = {
  listening: [[39, 9], [37, 8.5], [35, 8], [32, 7.5], [30, 7], [26, 6.5], [23, 6], [18, 5.5], [16, 5], [13, 4.5], [10, 4]],
  reading: [[39, 9], [37, 8.5], [35, 8], [33, 7.5], [30, 7], [27, 6.5], [23, 6], [19, 5.5], [15, 5], [13, 4.5], [10, 4]],
};

const band = (section: Section, score: number) => BANDS[section].find(([min]) => score >= min)?.[1] ?? 0;

// "  Ten  Pounds " == "ten pounds"; a key can list alternatives: "colour/color"
const norm = (s: string) => s.trim().toLowerCase().replace(/\s+/g, " ");
const isRight = (answer: string, key: string) =>
  !!norm(answer) && key.split("/").some((k) => norm(k) === norm(answer));

// Listening & Reading answer sheet for Cambridge books:
// tick answers right / wrong by hand, or enter the key and check automatically
export default function AnswerSheet() {
  const [section, setSection] = useLocalStorage<Section>("ielts.lr.section", "listening");
  const [sheets, setSheets] = useLocalStorage<Record<Section, Sheet>>("ielts.lr.sheets", {
    listening: blank(),
    reading: blank(),
  });
  const [editKey, setEditKey] = useState(false);
  const [paste, setPaste] = useState("");
  const listening = useCountdown(40 * 60, "ielts.lr.timer.listening");
  const reading = useCountdown(60 * 60, "ielts.lr.timer.reading");
  const clock = section === "listening" ? listening : reading;

  // sheets saved before ticks existed have no marks
  const sheet = { ...blank(), ...sheets[section] };
  const field = editKey ? "key" : "answers";
  const hasKey = sheet.key.some((k) => k.trim());

  const markOf = (i: number): Mark =>
    sheet.marks[i] ?? (sheet.checked && hasKey ? (isRight(sheet.answers[i], sheet.key[i]) ? "right" : "wrong") : null);
  const marks = sheet.answers.map((_, i) => markOf(i));
  const score = marks.filter((m) => m === "right").length;
  const marked = marks.filter(Boolean).length;

  const update = (patch: Partial<Sheet>) =>
    setSheets((all) => ({ ...all, [section]: { ...blank(), ...all[section], ...patch } }));

  const setCell = (i: number, value: string) => {
    const list = [...sheet[field]];
    list[i] = value;
    update({ [field]: list, checked: false });
  };

  // click ✓ or ✗; clicking your own tick again removes it
  const tick = (i: number, mark: Exclude<Mark, null>) => {
    const list = [...sheet.marks];
    list[i] = sheet.marks[i] === mark ? null : mark;
    update({ marks: list });
  };

  const check = () => {
    update({ checked: true });
    clock.pause();
    const auto = sheet.answers.map((a, i) => sheet.marks[i] ?? (isRight(a, sheet.key[i]) ? "right" : "wrong"));
    if (band(section, auto.filter((m) => m === "right").length) >= 7) {
      confetti({ particleCount: 160, spread: 90, origin: { y: 0.6 } });
    }
  };

  const applyPaste = () => {
    // one answer per line; a leading question number like "12." or "12)" is ignored
    const lines = paste.split(/\n/).map((l) => l.replace(/^\s*\d+\s*[.):-]?\s*/, "").trim());
    const key = [...sheet.key];
    lines.slice(0, 40).forEach((l, i) => (key[i] = l));
    update({ key, checked: false });
    setPaste("");
  };

  const focusNext = (e: React.KeyboardEvent<HTMLInputElement>, i: number) => {
    if (e.key !== "Enter") return;
    e.preventDefault();
    const next = document.querySelector<HTMLInputElement>(`[data-cell="${e.shiftKey ? i - 1 : i + 1}"]`);
    next?.focus();
    next?.select();
  };

  return (
    <div className="wide-container">
      <header className="sheet-head">
        <div className="sheet-head-title">
          <h1 className="page-title">Listening &amp; Reading</h1>
          <p className="hint">Tick each answer ✓ or ✗ against the book, or enter the answer key and check automatically.</p>
        </div>
        <div className="segmented" role="tablist">
          <button type="button" className={section === "listening" ? "active" : ""} onClick={() => setSection("listening")}>
            <FiHeadphones /> Listening
          </button>
          <button type="button" className={section === "reading" ? "active" : ""} onClick={() => setSection("reading")}>
            <FiBookOpen /> Reading
          </button>
        </div>
        <div className="segmented">
          <button type="button" className={!editKey ? "active" : ""} onClick={() => setEditKey(false)}>
            <FiEdit3 /> My answers
          </button>
          <button type="button" className={editKey ? "active" : ""} onClick={() => setEditKey(true)}>
            <FiKey /> Answer key
          </button>
        </div>
        <Timer clock={clock} />
      </header>

      {editKey && (
        <div className="paste-key">
          <textarea
            className="input"
            rows={3}
            placeholder={"Paste the key from the book, one answer per line:\n1 B\n2 library/the library\n…"}
            value={paste}
            onChange={(e) => setPaste(e.target.value)}
          />
          <button type="button" className="btn" onClick={applyPaste} disabled={!paste.trim()}>
            Fill key
          </button>
        </div>
      )}

      <div className="sheet">
        {sheet[field].map((value, i) => {
          const mark = editKey ? null : marks[i];
          const autoWrong = mark === "wrong" && !sheet.marks[i] && hasKey;
          return (
            <div key={i} className={`sheet-row ${mark ?? ""}`}>
              <label className="sheet-num" htmlFor={`cell-${i}`}>
                {i + 1}
              </label>
              <input
                id={`cell-${i}`}
                className="input"
                data-cell={i}
                value={value}
                onChange={(e) => setCell(i, e.target.value)}
                onKeyDown={(e) => focusNext(e, i)}
                autoComplete="off"
                spellCheck={false}
                title={autoWrong ? `Key: ${sheet.key[i] || "—"}` : undefined}
              />
              {!editKey && (
                <span className="ticks">
                  <button
                    type="button"
                    className={`tick tick-right ${mark === "right" ? "on" : ""}`}
                    onClick={() => tick(i, "right")}
                    aria-pressed={mark === "right"}
                    aria-label={`Question ${i + 1} correct`}
                  >
                    <FiCheck />
                  </button>
                  <button
                    type="button"
                    className={`tick tick-wrong ${mark === "wrong" ? "on" : ""}`}
                    onClick={() => tick(i, "wrong")}
                    aria-pressed={mark === "wrong"}
                    aria-label={`Question ${i + 1} wrong`}
                  >
                    <FiX />
                  </button>
                </span>
              )}
              {autoWrong && <span className="sheet-key">Key: {sheet.key[i] || "—"}</span>}
            </div>
          );
        })}
      </div>

      <div className="sheet-foot">
        {marked > 0 && !editKey && (
          <div className="score">
            <span>
              <strong>{score}/40</strong> correct
            </span>
            <span>
              {section === "listening" ? "Listening" : "Reading"} band ≈ <strong>{band(section, score).toFixed(1)}</strong>
            </span>
            <span className="hint">{marked}/40 marked</span>
          </div>
        )}
        {hasKey && (
          <button type="button" className="btn btn-primary" onClick={check}>
            <FiCheckCircle /> Check with key
          </button>
        )}
        <button
          type="button"
          className="btn"
          onClick={() =>
            update(
              editKey
                ? { key: Array(40).fill(""), checked: false }
                : { answers: Array(40).fill(""), marks: Array(40).fill(null), checked: false },
            )
          }
        >
          <FiTrash2 /> Clear {editKey ? "key" : "answers & ticks"}
        </button>
        {!editKey && marked > 0 && (
          <button type="button" className="btn" onClick={() => update({ marks: Array(40).fill(null), checked: false })}>
            <FiX /> Clear ticks
          </button>
        )}
      </div>
    </div>
  );
}
