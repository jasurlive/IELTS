// shapes for the task bank (data/task1.ts, data/task2.ts)

export type Series = { name: string; values: number[] }

export type LineChart = {
  kind: 'line'
  title: string
  unit: string // shown on the y axis and in tooltips, e.g. "%", "millions"
  yLabel: string
  xLabel?: string
  categories: string[]
  series: Series[]
}

export type BarChart = Omit<LineChart, 'kind'> & { kind: 'bar' }

export type PieChart = {
  kind: 'pie'
  title: string
  pies: { label: string; slices: { name: string; value: number }[] }[]
}

export type TableChart = {
  kind: 'table'
  title: string
  columns: string[]
  rows: (string | number)[][]
}

export type ProcessChart = {
  kind: 'process'
  title: string
  steps: string[]
  cyclic?: boolean
}

export type MapFeature = {
  name: string
  type: 'building' | 'road' | 'green' | 'water' | 'parking' | 'beach'
  // 0-100 wide, 0-70 high
  x: number
  y: number
  w: number
  h: number
}

export type MapChart = {
  kind: 'map'
  title: string
  panels: { label: string; features: MapFeature[] }[]
}

export type ImageChart = { kind: 'image'; src: string; alt: string }

export type Chart = LineChart | BarChart | PieChart | TableChart | ProcessChart | MapChart | ImageChart

export type Task1Type = 'line' | 'bar' | 'pie' | 'table' | 'process' | 'map' | 'mixed'
export type Task2Type = 'opinion' | 'discussion' | 'advantages' | 'problem-solution' | 'two-part'

export type Task1 = {
  id: string
  task: 1
  type: Task1Type
  title: string
  prompt: string
  charts: Chart[]
}

export type Task2 = {
  id: string
  task: 2
  type: Task2Type
  title: string
  topic: string
  prompt: string
  question: string
}

export type Task = Task1 | Task2

export const TASK1_TYPES: Record<Task1Type, string> = {
  line: 'Line graph',
  bar: 'Bar chart',
  pie: 'Pie chart',
  table: 'Table',
  process: 'Process / diagram',
  map: 'Map',
  mixed: 'Mixed charts',
}

export const TASK2_TYPES: Record<Task2Type, string> = {
  opinion: 'Opinion (agree / disagree)',
  discussion: 'Discuss both views',
  advantages: 'Advantages & disadvantages',
  'problem-solution': 'Problem & solution',
  'two-part': 'Two-part question',
}

// recommended timings and minimum words in the real exam
export const TASK_RULES = {
  1: { minutes: 20, minWords: 150 },
  2: { minutes: 40, minWords: 250 },
} as const
