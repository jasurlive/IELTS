import { useState } from "react";
import { FaTelegramPlane } from "react-icons/fa";
import { FiCopy } from "react-icons/fi";
import { useLocalStorage } from "../hooks/LOCAL/useLocalStorage";
import "../css/feedback.css";

const BOT = "jasurlive_bot";
const BOT_URL = `https://t.me/${BOT}`;

// feedback goes straight to the author's Telegram bot
export default function Feedback() {
  const [message, setMessage] = useLocalStorage("ielts.feedback.draft", "");
  const [copied, setCopied] = useState(false);

  // Telegram can't prefill a message to a bot, so copy it and open the chat
  const send = async () => {
    try {
      await navigator.clipboard.writeText(`[IELTS Live] ${message.trim()}`);
      setCopied(true);
    } catch {
      setCopied(false);
    }
    window.open(BOT_URL, "_blank", "noopener");
  };

  return (
    <div className="wide-container">
      <h1 className="page-title">Feedback</h1>
      <p className="page-text">
        Found a bug, a wrong answer, or want a feature? Message me on Telegram at{" "}
        <a href={BOT_URL} target="_blank" rel="noreferrer" className="feedback-link">
          @{BOT}
        </a>
        .
      </p>

      <div className="feedback-form">
        <textarea
          className="input"
          rows={5}
          placeholder="Write your message here (optional), then press the button. It's copied so you can paste it in Telegram."
          value={message}
          onChange={(e) => {
            setMessage(e.target.value);
            setCopied(false);
          }}
        />
        <div className="feedback-actions">
          {copied && (
            <span className="hint">
              <FiCopy /> Copied. Paste it in the Telegram chat.
            </span>
          )}
          {message.trim() ? (
            <button type="button" className="btn btn-primary" onClick={send}>
              <FaTelegramPlane /> Copy &amp; open Telegram
            </button>
          ) : (
            <a href={BOT_URL} target="_blank" rel="noreferrer" className="btn btn-primary">
              <FaTelegramPlane /> Open @{BOT}
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
