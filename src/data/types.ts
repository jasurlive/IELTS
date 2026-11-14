import type { ProcessIcon } from '../lib/icons'

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
  // set when slices are amounts (e.g. "units"), not percentages
  unit?: string
  pies: { label: string; slices: { name: string; value: number }[] }[]
}

export type TableChart = {
  kind: 'table'
  title: string
  columns: string[]
  rows: (string | number)[][]
}

export type ProcessStep = {
  label: string
  note?: string // small detail line, e.g. "24–48 hours"
  icon?: ProcessIcon
  inputs?: string[] // things added at this stage, e.g. ["sand", "water"]
}

export type ProcessChart = {
  kind: 'process'
  title: string
  steps: ProcessStep[]
  cyclic?: boolean // drawn as a loop; last stage leads back to the first
  center?: string // label in the middle of a cycle
}

// maps: coordinates are on a 100 × 70 grid, [x, y] from the top-left
export type Pt = [number, number]

export type AreaType =
  | 'land' // an island / coast on a sea background
  | 'sea'
  | 'lake'
  | 'swim' // swimming area marked in the water
  | 'beach'
  | 'farm'
  | 'park'
  | 'forest'
  | 'housing'
  | 'parking'
  | 'zone' // coloured development zone, see MapChart.zones

export type LineType = 'motorway' | 'mainroad' | 'road' | 'track' | 'footpath' | 'railway' | 'river' | 'pier'

export type MapFeature =
  | { kind: 'area'; type: AreaType; points: Pt[]; label?: string; at?: Pt; zone?: number; smooth?: boolean }
  | { kind: 'line'; type: LineType; points: Pt[]; label?: string; at?: Pt; angle?: number; smooth?: boolean }
  | { kind: 'building'; x: number; y: number; w: number; h: number; label?: string; at?: Pt; tone?: 'plain' | 'civic' | 'new' }
  | { kind: 'houses'; points: Pt[] } // small house symbols
  | { kind: 'trees'; points: Pt[] }
  | { kind: 'label'; text: string; at: Pt; size?: 's' | 'm' | 'l'; italic?: boolean }

export type MapChart = {
  kind: 'map'
  title: string
  base?: 'land' | 'sea'
  scale?: string // e.g. "100 m"
  zones?: string[] // legend for 'zone' areas, index = zone number
  panels: { label: string; features: MapFeature[] }[]
}

export type Chart = LineChart | BarChart | PieChart | TableChart | ProcessChart | MapChart

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
