import { Link, useNavigate } from "react-router";
import { FiCheckCircle, FiShuffle } from "react-icons/fi";
import { pickRandom, task1, task2 } from "../data";
import { TASK1_TYPES, TASK2_TYPES, type Task } from "../data/types";
import { useAttempts } from "../hooks/LOCAL/useAttempts";
import { useLocalStorage } from "../hooks/LOCAL/useLocalStorage";
import "../css/writing.css";

type Filter = { task: 1 | 2; type: string; query: string; hideDone: boolean };

// task library: pick any task to practise on its own
export default function Practice() {
  const navigate = useNavigate();
  const { doneIds } = useAttempts();
  const [filter, setFilter] = useLocalStorage<Filter>("ielts.practiceFilter", {
    task: 1,
    type: "all",
    query: "",
    hideDone: false,
  });

  const types = filter.task === 1 ? TASK1_TYPES : TASK2_TYPES;
  const source: Task[] = filter.task === 1 ? task1 : task2;
  const q = filter.query.trim().toLowerCase();

  const list = source.filter(
    (t) =>
      (filter.type === "all" || t.type === filter.type) &&
      (!filter.hideDone || !doneIds.includes(t.id)) &&
      (!q || `${t.title} ${t.prompt} ${t.task === 2 ? t.topic : ""}`.toLowerCase().includes(q)),
  );

  const set = (patch: Partial<Filter>) => setFilter((f) => ({ ...f, ...patch }));

  const random = () => {
    navigate(`/practice/${pickRandom(list.length ? list : source, doneIds).id}`);
  };

  return (
    <div className="wide-container">
      <header className="page-head">
        <div>
          <h1 className="page-title">Practice</h1>
          <p className="page-text">Pick any Writing task and do it on its own, with a timer.</p>
        </div>
        <button type="button" className="btn btn-primary" onClick={random}>
          <FiShuffle /> Random task
        </button>
      </header>

      <div className="filters">
        <div className="segmented" role="tablist">
          {([1, 2] as const).map((n) => (
            <button
              key={n}
              type="button"
              role="tab"
              aria-selected={filter.task === n}
              className={filter.task === n ? "active" : ""}
              onClick={() => set({ task: n, type: "all" })}
            >
              Task {n} <span className="count">{n === 1 ? task1.length : task2.length}</span>
            </button>
          ))}
        </div>

        <select className="input" value={filter.type} onChange={(e) => set({ type: e.target.value })}>
          <option value="all">All types</option>
          {Object.entries(types).map(([value, label]) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </select>

        <input
          className="input filters-search"
          type="search"
          placeholder="Search tasks…"
          value={filter.query}
          onChange={(e) => set({ query: e.target.value })}
        />

        <label className="check">
          <input type="checkbox" checked={filter.hideDone} onChange={(e) => set({ hideDone: e.target.checked })} />
          Hide done
        </label>
      </div>

      {list.length === 0 ? (
        <p className="page-text">No tasks match these filters.</p>
      ) : (
        <ul className="task-grid scroll-area">
          {list.map((t) => (
            <li key={t.id}>
              <Link to={`/practice/${t.id}`} className="task-card">
                <span className="task-card-top">
                  <span className="tag tag-soft">
                    {t.task === 1 ? TASK1_TYPES[t.type] : t.topic}
                  </span>
                  {doneIds.includes(t.id) && (
                    <span className="done" title="You have done this task">
                      <FiCheckCircle /> Done
                    </span>
                  )}
                </span>
                <strong>{t.title}</strong>
                <span className="task-card-text">{t.prompt}</span>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
