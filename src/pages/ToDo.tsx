import { useEffect, useState } from "react";
import { FiCornerUpLeft, FiCornerUpRight, FiEdit2, FiPlus, FiTrash2, FiX } from "react-icons/fi";
import { useHistory } from "../hooks/LOCAL/useHistory";
import { useShortcuts } from "../hooks/LOCAL/useShortcuts";
import "../css/todo.css";

type Item = { text: string; done: boolean };

function loadItems(): Item[] {
  try {
    // "items" is the key the old version of the site used, so existing lists carry over
    return (JSON.parse(localStorage.getItem("items") ?? "[]") as { text: string; completed?: boolean; done?: boolean }[]).map(
      (i) => ({ text: i.text, done: i.done ?? i.completed ?? false }),
    );
  } catch {
    return [];
  }
}

// study plan list with undo / redo (ctrl+z / ctrl+y)
export default function ToDo() {
  const { state: items, set, undo, redo, canUndo, canRedo } = useHistory<Item[]>(loadItems());
  const [input, setInput] = useState("");
  const [editing, setEditing] = useState<number | null>(null);

  useEffect(() => {
    try {
      localStorage.setItem("items", JSON.stringify(items));
    } catch {
      // ignore
    }
  }, [items]);

  useShortcuts({ "ctrl+z": undo, "ctrl+y": redo, "ctrl+shift+z": redo });

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const text = input.trim();
    if (!text) return;
    set(editing === null ? [...items, { text, done: false }] : items.map((it, i) => (i === editing ? { ...it, text } : it)));
    setInput("");
    setEditing(null);
  };

  return (
    <div className="wide-container">
      <h1 className="page-title">To-do list</h1>
      <p className="page-text">Plan your study: which books, tests and tasks to do next.</p>

      <form className="todo-form" onSubmit={submit}>
        <input
          className="input"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="e.g. Cambridge 18 Test 2 Reading"
        />
        <button type="submit" className="btn btn-primary">
          {editing === null ? <><FiPlus /> Add</> : "Update"}
        </button>
        {editing !== null && (
          <button type="button" className="btn" onClick={() => (setEditing(null), setInput(""))} title="Cancel">
            <FiX />
          </button>
        )}
      </form>

      <div className="notice-actions">
        <button type="button" className="btn" onClick={undo} disabled={!canUndo} title="Undo (Ctrl+Z)">
          <FiCornerUpLeft /> Undo
        </button>
        <button type="button" className="btn" onClick={redo} disabled={!canRedo} title="Redo (Ctrl+Y)">
          <FiCornerUpRight /> Redo
        </button>
        <button type="button" className="btn" onClick={() => set([])} disabled={!items.length}>
          <FiTrash2 /> Clear all
        </button>
        <span className="hint">
          {items.filter((i) => i.done).length}/{items.length} done
        </span>
      </div>

      <ul className="todo-list scroll-area">
        {items.map((item, i) => (
          <li key={i} className={`todo-item ${item.done ? "todo-done" : ""}`}>
            <label className="check">
              <input
                type="checkbox"
                checked={item.done}
                onChange={() => set(items.map((it, j) => (j === i ? { ...it, done: !it.done } : it)))}
              />
              <span>{item.text}</span>
            </label>
            <button type="button" className="icon-button" onClick={() => (setEditing(i), setInput(item.text))} title="Edit">
              <FiEdit2 />
            </button>
            <button type="button" className="icon-button" onClick={() => set(items.filter((_, j) => j !== i))} title="Delete">
              <FiTrash2 />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
