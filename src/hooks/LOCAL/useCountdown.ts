import { useEffect, useState } from 'react'
import { useLocalStorage } from './useLocalStorage'

type Clock = { endAt: number | null; left: number }

// countdown in seconds that keeps going across reloads (stores the end time, not ticks)
export function useCountdown(total: number, storageKey: string, onEnd?: () => void) {
  const [clock, setClock] = useLocalStorage<Clock>(storageKey, { endAt: null, left: total })
  const [now, setNow] = useState(() => Date.now())

  const running = clock.endAt !== null
  const left = running ? Math.max(0, Math.ceil((clock.endAt! - now) / 1000)) : clock.left

  useEffect(() => {
    if (!running) return
    const id = setInterval(() => setNow(Date.now()), 250)
    return () => clearInterval(id)
  }, [running])

  useEffect(() => {
    if (running && left === 0) {
      setClock({ endAt: null, left: 0 })
      onEnd?.()
    }
  }, [running, left, setClock, onEnd])

  const start = () => {
    if (running || left === 0) return
    setNow(Date.now())
    setClock({ endAt: Date.now() + left * 1000, left })
  }
  const pause = () => running && setClock({ endAt: null, left })
  const reset = (seconds = total) => setClock({ endAt: null, left: seconds })
  const restart = (seconds = total) => {
    setNow(Date.now())
    setClock({ endAt: Date.now() + seconds * 1000, left: seconds })
  }

  return { left, running, start, pause, reset, restart, used: total - left }
}

export const formatTime = (s: number) =>
  `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`
