import { BrowserRouter, Route, Routes } from 'react-router'
import '../tools/css/reset.css'
import '../tools/css/theme.css'
import '../tools/css/page.css'
import '../tools/css/ui.css'
import Layout from '../tools/components/Layout'
import Home from '../tools/pages/Home'
import Practice from '../tools/pages/Practice'
import PracticeTask from '../tools/pages/PracticeTask'
import RealTest from '../tools/pages/RealTest'
import AnswerSheet from '../tools/pages/AnswerSheet'
import History from '../tools/pages/History'
import ToDo from '../tools/pages/ToDo'
import Feedback from '../tools/pages/Feedback'
import NotFound from '../tools/pages/NotFound'

// add a page: create it in tools/pages, add a <Route> here and an item in Menu.tsx
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
          {/* old links */}
          <Route path="writing" element={<RealTest />} />
          <Route path="to-do-list" element={<ToDo />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
