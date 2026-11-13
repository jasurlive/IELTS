import { countWords } from "../hooks/LOCAL/useAttempts";

// answer box with a live word count against the task minimum
export default function Editor({
  value,
  onChange,
  minWords,
  placeholder,
  readOnly,
}: {
  value: string;
  onChange: (text: string) => void;
  minWords: number;
  placeholder?: string;
  readOnly?: boolean;
}) {
  const words = countWords(value);
  const ok = words >= minWords;

  return (
    <div className="editor">
      <textarea
        className="editor-input"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        spellCheck={false}
        readOnly={readOnly}
      />
      <div className="editor-bar">
        <span className={ok ? "words-ok" : "words-low"}>
          {words} / {minWords} words
        </span>
        <span className="editor-progress">
          <span style={{ width: `${Math.min(100, (words / minWords) * 100)}%` }} />
        </span>
      </div>
    </div>
  );
}
