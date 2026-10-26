import { useState } from 'react'

// state with undo / redo
export function useHistory<T>(initial: T) {
  const [history, setHistory] = useState<T[]>([initial])
  const [index, setIndex] = useState(0)

  const set = (next: T) => {
    const kept = history.slice(0, index + 1)
    setHistory([...kept, next])
    setIndex(kept.length)
  }

  return {
    state: history[index],
    set,
    undo: () => setIndex((i) => Math.max(0, i - 1)),
    redo: () => setIndex((i) => Math.min(history.length - 1, i + 1)),
    canUndo: index > 0,
    canRedo: index < history.length - 1,
  }
}
