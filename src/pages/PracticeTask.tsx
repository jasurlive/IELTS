import { Link, useNavigate, useParams } from "react-router";
import { FiArrowLeft, FiCheck, FiShuffle } from "react-icons/fi";
import { findTask, pickRandom, task1, task2 } from "../data";
import { TASK_RULES } from "../data/types";
import TaskPrompt from "../components/TaskPrompt";
import Editor from "../components/Editor";
import Timer from "../components/Timer";
import { useLocalStorage } from "../hooks/LOCAL/useLocalStorage";
import { useCountdown } from "../hooks/LOCAL/useCountdown";
import { countWords, useAttempts, type Attempt } from "../hooks/LOCAL/useAttempts";
import NotFound from "./NotFound";
import "../css/writing.css";

// one task, its own timer and an auto-saved draft
export default function PracticeTask() {
  const { id = "" } = useParams();
  const task = findTask(id);
  if (!task) return <NotFound />;
  // key: fresh draft/timer state per task
  return <Workspace key={id} id={id} />;
}

function Workspace({ id }: { id: string }) {
  const task = findTask(id)!;
  const rules = TASK_RULES[task.task];
  const navigate = useNavigate();
  const { add, doneIds } = useAttempts();
  const [text, setText] = useLocalStorage(`ielts.draft.${id}`, "");
  const [saved, setSaved] = useLocalStorage<Attempt | null>(`ielts.saved.${id}`, null);
  const clock = useCountdown(rules.minutes * 60, `ielts.timer.${id}`);

  const finish = () => {
    clock.pause();
    setSaved(add({ mode: "practice", seconds: clock.used, answers: [{ taskId: id, text, words: countWords(text) }] }));
  };

  const again = () => {
    setText("");
    setSaved(null);
    clock.reset();
  };

  const next = () => {
    const skip = [...doneIds, id];
    const nextTask = task.task === 1 ? pickRandom(task1, skip) : pickRandom(task2, skip);
    navigate(`/practice/${nextTask.id}`);
  };

  return (
    <div className="workspace">
      <div className="workspace-bar">
        <Link to="/practice" className="btn">
          <FiArrowLeft /> All tasks
        </Link>
        <h1 className="workspace-title">{task.title}</h1>
        <Timer clock={clock} />
        <button type="button" className="btn" onClick={next} title="Another random task of the same kind">
          <FiShuffle /> Next
        </button>
      </div>

      <div className="workspace-split">
        <TaskPrompt task={task} />

        <div className="workspace-answer">
          {saved ? (
            <div className="notice">
              <strong>Saved to History.</strong> {saved.answers[0].words} words in {Math.round(saved.seconds / 60)} min.
              {saved.answers[0].words < rules.minWords && " That's under the minimum, which costs marks in the exam."}
              <div className="notice-actions">
                <Link to="/history" className="btn">See history</Link>
                <button type="button" className="btn" onClick={again}>Write again</button>
                <button type="button" className="btn btn-primary" onClick={next}>Next task</button>
              </div>
            </div>
          ) : (
            !clock.running && clock.left === rules.minutes * 60 && !text && (
              <p className="hint">Press ▶ to start the {rules.minutes}-minute timer, or just start typing.</p>
            )
          )}
          <Editor
            value={text}
            onChange={(t) => {
              if (!clock.running && !saved && clock.left > 0) clock.start();
              setText(t);
            }}
            minWords={rules.minWords}
            placeholder={`Type your Task ${task.task} answer here…`}
            readOnly={!!saved}
          />
          {!saved && (
            <button type="button" className="btn btn-primary" onClick={finish} disabled={!text.trim()}>
              <FiCheck /> Finish &amp; save
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
