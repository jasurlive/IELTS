import { Link } from "react-router";
import { FiTrash2 } from "react-icons/fi";
import { findTask } from "../data";
import { TASK_RULES } from "../data/types";
import { useAttempts } from "../hooks/LOCAL/useAttempts";
import "../css/writing.css";

// every finished practice task and real test, saved in this browser
export default function History() {
  const { attempts, remove } = useAttempts();

  return (
    <div className="wide-container">
      <h1 className="page-title">History</h1>
      <p className="page-text">
        {attempts.length
          ? `${attempts.length} saved attempt${attempts.length > 1 ? "s" : ""}. Saved in this browser only.`
          : "Nothing yet. Finish a practice task or a real test and it will show up here."}
      </p>

      <ul className="history scroll-area">
        {attempts.map((a) => (
          <li key={a.id} className="history-item">
            <details>
              <summary>
                <span className={`tag ${a.mode === "test" ? "" : "tag-soft"}`}>
                  {a.mode === "test" ? "Real test" : "Practice"}
                </span>
                <span className="history-title">
                  {a.answers.map((x) => findTask(x.taskId)?.title ?? x.taskId).join(" + ")}
                </span>
                <span className="history-date">
                  {new Date(a.date).toLocaleString(undefined, { dateStyle: "medium", timeStyle: "short" })} ·{" "}
                  {Math.round(a.seconds / 60)} min
                </span>
              </summary>

              {a.answers.map((x) => {
                const task = findTask(x.taskId);
                const min = task ? TASK_RULES[task.task].minWords : 0;
                return (
                  <div key={x.taskId} className="history-answer">
                    <p className="history-answer-head">
                      {task ? <Link to={`/practice/${task.id}`}>Task {task.task}: {task.title}</Link> : x.taskId}
                      <span className={x.words >= min ? "words-ok" : "words-low"}>{x.words} words</span>
                    </p>
                    <p className="history-text">{x.text || <em>(no answer)</em>}</p>
                  </div>
                );
              })}

              <button
                type="button"
                className="btn btn-danger"
                onClick={() => confirm("Delete this attempt?") && remove(a.id)}
              >
                <FiTrash2 /> Delete
              </button>
            </details>
          </li>
        ))}
      </ul>
    </div>
  );
}
