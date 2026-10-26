import { Link } from "react-router";
import { FiBarChart2, FiClock, FiEdit3, FiHeadphones, FiCheckSquare, FiMessageSquare } from "react-icons/fi";
import Header from "../components/Header";
import { task1, task2 } from "../data";
import { useAttempts } from "../hooks/LOCAL/useAttempts";
import "../css/home.css";

const CARDS = [
  { to: "/test", icon: <FiClock />, title: "Real test", text: "Random Task 1 + Task 2 with a 60-minute clock, like exam day." },
  { to: "/practice", icon: <FiEdit3 />, title: "Practice", text: "Choose any task from the library and write it on its own." },
  { to: "/answer-sheet", icon: <FiHeadphones />, title: "Listening & Reading", text: "40-question answer sheet: tick ✓ / ✗ or use the answer key, get your band." },
  { to: "/history", icon: <FiBarChart2 />, title: "History", text: "Read back everything you've written." },
  { to: "/todo", icon: <FiCheckSquare />, title: "To-do list", text: "Plan which books and tests to do next." },
  { to: "/feedback", icon: <FiMessageSquare />, title: "Feedback", text: "Message me on Telegram: @jasurlive_bot." },
];

export default function Home() {
  const { attempts, doneIds } = useAttempts();
  const total = task1.length + task2.length;

  return (
    <div className="home-container">
      <Header />

      <main className="home-content">
        <div className="home-stats">
          <div>
            <strong>{total}</strong>
            <span>writing tasks ({task1.length} Task 1, {task2.length} Task 2)</span>
          </div>
          <div>
            <strong>{doneIds.length}</strong>
            <span>tasks done</span>
          </div>
          <div>
            <strong>{attempts.filter((a) => a.mode === "test").length}</strong>
            <span>real tests taken</span>
          </div>
        </div>

        <ul className="home-grid">
          {CARDS.map((c) => (
            <li key={c.to}>
              <Link to={c.to} className="home-card">
                <span className="home-card-icon">{c.icon}</span>
                <strong>{c.title}</strong>
                <span>{c.text}</span>
              </Link>
            </li>
          ))}
        </ul>

        <p className="home-foot">
          Made by <a href="https://jasurlive.uz">jasurlive</a>. Tasks follow the Cambridge IELTS Academic format.
          Your work is saved in this browser only.
        </p>
      </main>
    </div>
  );
}
