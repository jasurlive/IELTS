import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import ErrorBoundary from '../components/ErrorBoundary'
import { trackVisit } from './track'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {/* last-resort catch, pages have their own inside Layout */}
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </StrictMode>,
)

trackVisit()
