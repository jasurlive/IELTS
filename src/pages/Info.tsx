import { Link } from "react-router";

// how to use the app: keep this in sync when you add shortcuts (see Menu.tsx, ToDo.tsx) or features
const SHORTCUTS = [
  { keys: ["`"], action: "Collapse or expand the sidebar" },
  { keys: ["Ctrl", "J"], action: "Switch to the next theme" },
  { keys: ["Enter"], action: "Answer sheet: jump to the next answer (Shift+Enter goes back)" },
  { keys: ["Ctrl", "Z"], action: "To-do list: undo" },
  { keys: ["Ctrl", "Y"], action: "To-do list: redo (also Ctrl+Shift+Z)" },
];

const TIPS = [
  "Real test gives you a random Task 1 and Task 2 with a 60-minute timer, like the computer-delivered exam.",
  "Practice lets you pick any Task 1 graph or Task 2 essay and write it without the full test.",
  "Your essays are saved as drafts in this browser while you type, and finished attempts show up in History.",
  "Listening & Reading is an answer sheet for book tests: type your answers, paste the key and check them.",
  "The arrow at the top of the sidebar (or the ` key) collapses or expands it. Your choice is remembered.",
  "Pick a theme in Settings. It's saved in this browser. Settings also has a fullscreen button (Esc leaves it).",
  "On phones the menu is a bar at the bottom with the main pages. History, To-do list and Feedback are linked at the bottom of Home.",
  "Everything is stored in this browser only. Clearing site data removes your drafts and history.",
];

export default function Info() {
  return (
    <div className="page-container">
      <h1 className="page-title">Info</h1>

      <h2 className="page-subtitle">Keyboard shortcuts</h2>
      <ul className="info-list">
        {SHORTCUTS.map((s) => (
          <li key={s.action}>
            <span>
              {s.keys.map((k) => (
                <kbd key={k}>{k}</kbd>
              ))}
            </span>
            {s.action}
          </li>
        ))}
      </ul>
      <p className="page-text">On Mac, use ⌘ instead of Ctrl. Shortcuts are ignored while typing in a field.</p>

      <h2 className="page-subtitle">Using the app</h2>
      <ul className="info-list">
        {TIPS.map((t) => (
          <li key={t}>{t}</li>
        ))}
      </ul>

      <p className="page-text info-footer">
        <Link to="/todo">To-do list</Link> · <Link to="/feedback">Send feedback</Link> · © 2026 Jasur ·{" "}
        <a href="https://jasurlive.uz">jasurlive.uz</a>
      </p>
    </div>
  );
}
