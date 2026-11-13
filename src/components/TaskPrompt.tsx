import Chart from "./Chart";
import { SUMMARISE } from "../data/task1";
import { TASK2_FOOTER } from "../data/task2";
import { TASK_RULES, TASK1_TYPES, TASK2_TYPES, type Task } from "../data/types";

// the question paper side: instructions box, then the chart(s) for Task 1
export default function TaskPrompt({ task }: { task: Task }) {
  const rules = TASK_RULES[task.task];

  return (
    <section className="task-paper">
      <p className="task-meta">
        <span className="tag">Task {task.task}</span>
        <span className="tag tag-soft">{task.task === 1 ? TASK1_TYPES[task.type] : TASK2_TYPES[task.type]}</span>
        <span className="task-meta-time">
          You should spend about {rules.minutes} minutes on this task.
          {task.task === 1 && <strong> Write at least {rules.minWords} words.</strong>}
        </span>
      </p>

      {task.task === 1 ? (
        <>
          {/* the bundled image already shows the instructions box */}
          {task.charts[0].kind !== "image" && (
            <div className="task-box">
              <p>{task.prompt}</p>
              <p>{SUMMARISE}</p>
            </div>
          )}
          <div className={task.charts.length > 1 ? "task-charts-multi" : "task-charts"}>
            {task.charts.map((chart, i) => (
              <Chart key={i} data={chart} compact={task.charts.length > 1} />
            ))}
          </div>
        </>
      ) : (
        <>
          <p>Write about the following topic:</p>
          <div className="task-box">
            <p>{task.prompt}</p>
            {task.question && <p>{task.question}</p>}
          </div>
          <p>{TASK2_FOOTER}</p>
          <p>Write at least {rules.minWords} words.</p>
        </>
      )}
    </section>
  );
}
