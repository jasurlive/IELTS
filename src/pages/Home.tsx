import { Link } from "react-router";
import { FiArrowRight, FiEdit3, FiHeadphones } from "react-icons/fi";
import Header from "../components/Header";
import { task1, task2 } from "../data";
import { useAttempts } from "../hooks/LOCAL/useAttempts";
import "../css/home.css";

// kept short on purpose: two choices for first-time visitors, the rest is in the footer links
export default function Home() {
  const { attempts, doneIds } = useAttempts();
  const tests = attempts.filter((a) => a.mode === "test").length;

  return (
    <div className="home-container">
      <Header />

      <main className="home-content">
        <h2 className="home-question">What do you want to practise?</h2>

        <div className="home-choices">
          <section className="home-choice">
            <span className="home-card-icon">
              <FiEdit3 />
            </span>
            <h3>Writing</h3>
            <p>
              Academic Task 1 graphs and Task 2 essays ({task1.length + task2.length} tasks). Write on screen with a
              timer, like the computer-delivered exam.
            </p>
            <div className="home-actions">
              <Link to="/test" className="btn btn-primary">
                Start a real test <FiArrowRight />
              </Link>
              <Link to="/practice" className="btn">
                Practise one task
              </Link>
            </div>
          </section>

          <section className="home-choice">
            <span className="home-card-icon">
              <FiHeadphones />
            </span>
            <h3>Listening & Reading</h3>
            <p>Doing a test from a book? Type your 40 answers here, check them against the key and get your band.</p>
            <div className="home-actions">
              <Link to="/answer-sheet" className="btn btn-primary">
                Open answer sheet <FiArrowRight />
              </Link>
            </div>
          </section>
        </div>

        {/* progress only once there is some, so a new visitor doesn't see a row of zeros */}
        {attempts.length > 0 && (
          <p className="home-progress">
            So far: {doneIds.length} {doneIds.length === 1 ? "task" : "tasks"} done
            {tests > 0 && `, ${tests} real ${tests === 1 ? "test" : "tests"}`}. <Link to="/history">See history</Link>
          </p>
        )}

        <footer className="home-foot">
          <nav className="home-links">
            <Link to="/history">History</Link>
            <Link to="/todo">To-do list</Link>
            <Link to="/feedback">Feedback</Link>
            <Link to="/info">Help</Link>
          </nav>
          <p>
            Made by <a href="https://jasurlive.uz">jasurlive</a>. Tasks follow the Cambridge IELTS Academic format.
            Your work is saved in this browser only.
          </p>
        </footer>
      </main>
    </div>
  );
}
