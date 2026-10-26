import { task1 } from './task1'
import { task2 } from './task2'
import type { Task, Task1, Task2 } from './types'

export { task1, task2 }
export const allTasks: Task[] = [...task1, ...task2]

export const findTask = (id: string) => allTasks.find((t) => t.id === id)

// random item, skipping ids in `exclude` (e.g. already done) unless that empties the list
export function pickRandom<T extends { id: string }>(list: T[], exclude: string[] = []): T {
  const pool = list.filter((item) => !exclude.includes(item.id))
  const from = pool.length ? pool : list
  return from[Math.floor(Math.random() * from.length)]
}

export const randomTest = (exclude?: string[]): [Task1, Task2] => [
  pickRandom(task1, exclude),
  pickRandom(task2, exclude),
]
