import { BrowserRouter, Route, Routes } from 'react-router'
import '../css/reset.css'
import '../css/theme.css'
import '../css/page.css'
import '../css/ui.css'
import Layout from '../components/Layout'
import Home from '../pages/Home'
import Practice from '../pages/Practice'
import PracticeTask from '../pages/PracticeTask'
import RealTest from '../pages/RealTest'
import AnswerSheet from '../pages/AnswerSheet'
import History from '../pages/History'
import ToDo from '../pages/ToDo'
import Feedback from '../pages/Feedback'
import Settings from '../pages/Settings'
import Info from '../pages/Info'
import NotFound from '../pages/NotFound'

// add a page: create it in pages, add a <Route> here and an item in Menu.tsx
export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="practice" element={<Practice />} />
          <Route path="practice/:id" element={<PracticeTask />} />
          <Route path="test" element={<RealTest />} />
          <Route path="answer-sheet" element={<AnswerSheet />} />
          <Route path="history" element={<History />} />
          <Route path="todo" element={<ToDo />} />
          <Route path="feedback" element={<Feedback />} />
          <Route path="settings" element={<Settings />} />
          <Route path="info" element={<Info />} />
          {/* old links */}
          <Route path="writing" element={<RealTest />} />
          <Route path="to-do-list" element={<ToDo />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
