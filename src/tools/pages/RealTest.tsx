import { useState } from "react";
import { Link } from "react-router";
import { FiCheck, FiClock, FiPlay, FiRefreshCw } from "react-icons/fi";
import { findTask, randomTest } from "../data";
import { TASK_RULES, type Task } from "../data/types";
import TaskPrompt from "../components/TaskPrompt";
import Editor from "../components/Editor";
import Timer from "../components/Timer";
import { useLocalStorage } from "../hooks/LOCAL/useLocalStorage";
import { useCountdown } from "../hooks/LOCAL/useCountdown";
import { countWords, useAttempts, type Attempt } from "../hooks/LOCAL/useAttempts";
import "../css/writing.css";

const TOTAL = 60 * 60;

type TestState = {
  phase: "intro" | "writing" | "done";
  ids: [string, string];
  texts: [string, string];
  attempt: Attempt | null;
};

const EMPTY: TestState = { phase: "intro", ids: ["", ""], texts: ["", ""], attempt: null };

// full Academic Writing paper: random Task 1 + Task 2, one 60-minute clock
export default function RealTest() {
  const { add, doneIds } = useAttempts();
  const [test, setTest] = useLocalStorage<TestState>("ielts.test", EMPTY);
  const [tab, setTab] = useState<0 | 1>(0);
  const clock = useCountdown(TOTAL, "ielts.test.timer", () => submit());

  const tasks = test.ids.map(findTask) as [Task | undefined, Task | undefined];

  function start() {
    const [t1, t2] = randomTest(doneIds);
    setTest({ phase: "writing", ids: [t1.id, t2.id], texts: ["", ""], attempt: null });
    setTab(0);
    clock.restart();
  }

  function submit() {
    if (test.phase !== "writing") return;
    clock.pause();
    const attempt = add({
      mode: "test",
      seconds: clock.used,
      answers: test.ids.map((taskId, i) => ({ taskId, text: test.texts[i], words: countWords(test.texts[i]) })),
    });
    setTest({ ...test, phase: "done", attempt });
  }

  const setText = (i: 0 | 1, text: string) =>
    setTest((t) => ({ ...t, texts: (i === 0 ? [text, t.texts[1]] : [t.texts[0], text]) as [string, string] }));

  if (test.phase === "intro" || !tasks[0] || !tasks[1]) {
    return (
      <div className="wide-container">
        <h1 className="page-title">Real test</h1>
        <p className="page-text">
          A full IELTS Academic Writing paper under exam conditions. You get one random Task 1 and one random Task 2
          (ones you haven't done come first).
        </p>
        <ul className="rules">
          <li><FiClock /> 60 minutes for both tasks. The clock starts straight away and can't be paused.</li>
          <li>Task 1: at least 150 words (about 20 minutes).</li>
          <li>Task 2: at least 250 words (about 40 minutes). It's worth twice as much as Task 1.</li>
          <li>No spell-check, like the computer-delivered exam. When time runs out, your answers are submitted.</li>
        </ul>
        <button type="button" className="btn btn-primary btn-big" onClick={start}>
          <FiPlay /> Start test
        </button>
      </div>
    );
  }

  if (test.phase === "done") {
    return (
      <div className="wide-container">
        <h1 className="page-title">Test finished</h1>
        <p className="page-text">
          Time used: {Math.round((test.attempt?.seconds ?? TOTAL) / 60)} of 60 minutes. Your answers are saved in History.
        </p>
        <ul className="result-list">
          {tasks.map((t, i) => {
            const words = countWords(test.texts[i]);
            const min = TASK_RULES[t!.task].minWords;
            return (
              <li key={t!.id} className="result-item">
                <span className="tag">Task {t!.task}</span>
                <span className="result-title">{t!.title}</span>
                <span className={words >= min ? "words-ok" : "words-low"}>
                  {words} / {min} words
                </span>
              </li>
            );
          })}
        </ul>
        <p className="page-text">
          Check your answers yourself: did you answer every part of the question, give an overview (Task 1) and a
          clear position (Task 2)?
        </p>
        <div className="notice-actions">
          <Link to="/history" className="btn">Review answers</Link>
          <button type="button" className="btn btn-primary" onClick={start}>
            <FiRefreshCw /> New random test
          </button>
        </div>
      </div>
    );
  }

  const task = tasks[tab]!;

  return (
    <div className="workspace">
      <div className="workspace-bar">
        <div className="segmented" role="tablist">
          {tasks.map((t, i) => (
            <button
              key={t!.id}
              type="button"
              role="tab"
              aria-selected={tab === i}
              className={tab === i ? "active" : ""}
              onClick={() => setTab(i as 0 | 1)}
            >
              Task {i + 1} <span className="count">{countWords(test.texts[i])}w</span>
            </button>
          ))}
        </div>
        <span className="workspace-title" />
        <Timer clock={clock} controls={false} />
        <button
          type="button"
          className="btn btn-primary"
          onClick={() => confirm("Submit both tasks now? You can't change them afterwards.") && submit()}
        >
          <FiCheck /> Submit
        </button>
      </div>

      <div className="workspace-split">
        <TaskPrompt task={task} />
        <div className="workspace-answer">
          <Editor
            key={tab}
            value={test.texts[tab]}
            onChange={(text) => setText(tab, text)}
            minWords={TASK_RULES[task.task].minWords}
            placeholder={`Type your Task ${tab + 1} answer here…`}
          />
        </div>
      </div>
    </div>
  );
}
