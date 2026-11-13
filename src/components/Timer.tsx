import { FiPause, FiPlay, FiRotateCcw } from "react-icons/fi";
import { formatTime } from "../hooks/LOCAL/useCountdown";
import type { useCountdown } from "../hooks/LOCAL/useCountdown";

// display + controls for a useCountdown() clock
export default function Timer({
  clock,
  controls = true,
}: {
  clock: ReturnType<typeof useCountdown>;
  controls?: boolean;
}) {
  const { left, running, start, pause, reset } = clock;

  return (
    <div className={`timer ${left <= 300 && left > 0 ? "timer-low" : ""} ${left === 0 ? "timer-done" : ""}`}>
      <span className="timer-time" aria-live="off">
        {formatTime(left)}
      </span>
      {controls && (
        <>
          <button
            type="button"
            className="icon-button"
            onClick={running ? pause : start}
            disabled={left === 0}
            title={running ? "Pause" : "Start"}
          >
            {running ? <FiPause /> : <FiPlay />}
          </button>
          <button type="button" className="icon-button" onClick={() => reset()} title="Reset">
            <FiRotateCcw />
          </button>
        </>
      )}
    </div>
  );
}
