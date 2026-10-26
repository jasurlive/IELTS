import { useEffect, useState } from 'react'

// useState that survives reloads; falls back to memory if storage is blocked
export function useLocalStorage<T>(key: string, initial: T) {
  const [value, setValue] = useState<T>(() => {
    try {
      const saved = localStorage.getItem(key)
      return saved !== null ? (JSON.parse(saved) as T) : initial
    } catch {
      return initial
    }
  })

  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(value))
    } catch {
      // private mode / quota: keep working in memory
    }
  }, [key, value])

  return [value, setValue] as const
}
