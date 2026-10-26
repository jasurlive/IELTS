import { useLocalStorage } from './useLocalStorage'

export type Answer = { taskId: string; text: string; words: number }

export type Attempt = {
  id: string
  mode: 'practice' | 'test'
  date: string
  seconds: number // time spent
  answers: Answer[]
}

export const countWords = (text: string) => text.trim().split(/\s+/).filter(Boolean).length

// finished writing attempts, newest first (shown on the History page)
export function useAttempts() {
  const [attempts, setAttempts] = useLocalStorage<Attempt[]>('ielts.attempts', [])

  const add = (attempt: Omit<Attempt, 'id' | 'date'>) => {
    const saved: Attempt = { ...attempt, id: crypto.randomUUID(), date: new Date().toISOString() }
    setAttempts((list) => [saved, ...list])
    return saved
  }

  const remove = (id: string) => setAttempts((list) => list.filter((a) => a.id !== id))

  const doneIds = [...new Set(attempts.flatMap((a) => a.answers.map((x) => x.taskId)))]

  return { attempts, add, remove, doneIds }
}
