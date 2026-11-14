import type { Task1 } from './types'

// Academic Writing Task 1 bank: tasks from the Cambridge IELTS practice books (figures as printed, rounded where
// the original chart has no exact labels). Every visual is drawn from the data below by components/Chart.tsx.
// add a task: copy an entry, give it a unique id, pick a chart kind from types.ts

export const SUMMARISE =
  'Summarise the information by selecting and reporting the main features, and make comparisons where relevant.'

// a ring of 8 hut positions around (x, y), for the island map
const ring = (x: number, y: number, r: number): [number, number][] =>
  Array.from({ length: 8 }, (_, i) => {
    const a = (i * Math.PI) / 4
    return [+(x + r * Math.cos(a)).toFixed(2), +(y + r * Math.sin(a) * 0.9).toFixed(2)]
  })

const ISLAND: [number, number][] = [
  [14, 32], [17, 19], [29, 11], [47, 8], [65, 10], [79, 16], [87, 28], [86, 43], [77, 55], [61, 61], [43, 62], [27, 57], [16, 46],
]
const ISLAND_BEACH: [number, number][] = [
  [20, 15.5], [16.8, 19.5], [15, 25], [13.8, 32], [14.4, 39], [16, 46], [21, 52.5], [24, 50.5], [21, 42], [19.6, 33], [20.4, 24], [23, 17.5],
]

export const task1: Task1[] = [
  // ---------- line graphs ----------
  {
    id: 't1-aged-65',
    task: 1,
    type: 'line',
    title: 'Population aged 65 and over',
    prompt:
      'The graph below shows the proportion of the population aged 65 and over between 1940 and 2040 in three different countries.',
    charts: [
      {
        kind: 'line',
        title: 'Proportion of population aged 65 and over, 1940–2040*',
        unit: '%',
        yLabel: 'Percentage of total population',
        xLabel: '* figures from 2000 onwards are projections',
        categories: ['1940', '1960', '1980', '2000', '2020', '2040'],
        series: [
          { name: 'USA', values: [9, 9.5, 11, 13, 16, 23] },
          { name: 'Sweden', values: [7, 10, 13, 15, 20, 25] },
          { name: 'Japan', values: [5, 3, 4, 8, 19, 27] },
        ],
      },
    ],
  },
  {
    id: 't1-fish-meat',
    task: 1,
    type: 'line',
    title: 'Consumption of fish and meat',
    prompt:
      'The graph below shows the consumption of fish and some different kinds of meat in a European country between 1979 and 2004.',
    charts: [
      {
        kind: 'line',
        title: 'Consumption of fish and meat, 1979–2004',
        unit: 'g',
        yLabel: 'Grams per person per week',
        categories: ['1979', '1984', '1989', '1994', '1999', '2004'],
        series: [
          { name: 'Beef', values: [220, 205, 190, 175, 115, 105] },
          { name: 'Lamb', values: [150, 125, 110, 85, 65, 55] },
          { name: 'Chicken', values: [150, 160, 185, 215, 235, 250] },
          { name: 'Fish', values: [60, 58, 55, 52, 50, 50] },
        ],
      },
    ],
  },
  {
    id: 't1-usa-energy',
    task: 1,
    type: 'line',
    title: 'Energy consumption in the USA',
    prompt:
      'The graph below gives information from a 2008 report about consumption of energy in the USA since 1980 with projections until 2030.',
    charts: [
      {
        kind: 'line',
        title: 'Energy consumption in the USA by fuel, 1980–2030*',
        unit: 'quadrillion units',
        yLabel: 'Quadrillion units',
        xLabel: '* figures after 2008 are projections',
        categories: ['1980', '1990', '2000', '2010', '2020', '2030'],
        series: [
          { name: 'Petrol and oil', values: [35, 34, 39, 42, 46, 50] },
          { name: 'Natural gas', values: [20, 19, 23, 22, 24, 25] },
          { name: 'Coal', values: [16, 19, 22, 24, 27, 31] },
          { name: 'Nuclear', values: [4, 6, 8, 8, 7, 7] },
          { name: 'Solar / wind', values: [4, 4, 4, 5, 5, 5] },
          { name: 'Hydropower', values: [3, 3, 3, 3, 4, 4] },
        ],
      },
    ],
  },

  // ---------- bar charts ----------
  {
    id: 't1-uk-phone-calls',
    task: 1,
    type: 'bar',
    title: 'UK telephone calls by category',
    prompt:
      'The chart below shows the total number of minutes (in billions) of telephone calls in the UK, divided into three categories, from 1995 to 2002.',
    charts: [
      {
        kind: 'bar',
        title: 'UK telephone calls, by category, 1995–2002',
        unit: 'billion minutes',
        yLabel: 'Minutes (billions)',
        categories: ['1995', '1996', '1997', '1998', '1999', '2000', '2001', '2002'],
        series: [
          { name: 'Local – fixed line', values: [72, 73, 76, 81, 86, 90, 85, 72] },
          { name: 'National and international – fixed line', values: [38, 40, 43, 47, 51, 56, 59, 61] },
          { name: 'Mobiles (all calls)', values: [2, 3, 5, 8, 12, 21, 33, 46] },
        ],
      },
    ],
  },
  {
    id: 't1-housing-tenure',
    task: 1,
    type: 'bar',
    title: 'Owned and rented accommodation',
    prompt:
      'The chart below shows the percentage of households in owned and rented accommodation in England and Wales between 1918 and 2011.',
    charts: [
      {
        kind: 'bar',
        title: 'Households by tenure, England and Wales, 1918–2011',
        unit: '%',
        yLabel: 'Percentage of households',
        categories: ['1918', '1939', '1953', '1961', '1971', '1981', '1991', '2001', '2011'],
        series: [
          { name: 'Owned', values: [23, 32, 32, 42, 50, 58, 68, 69, 64] },
          { name: 'Rented', values: [77, 68, 68, 58, 50, 42, 32, 31, 36] },
        ],
      },
    ],
  },

  // ---------- pie charts ----------
  {
    id: 't1-electricity-sources',
    task: 1,
    type: 'pie',
    title: 'Electricity production in Australia and France',
    prompt:
      'The pie charts below show units of electricity production by fuel source in Australia and France in 1980 and 2000.',
    charts: [
      {
        kind: 'pie',
        title: 'Australia',
        unit: 'units',
        pies: [
          { label: '1980', slices: [{ name: 'Coal', value: 50 }, { name: 'Natural gas', value: 20 }, { name: 'Hydro power', value: 20 }, { name: 'Oil', value: 10 }] },
          { label: '2000', slices: [{ name: 'Coal', value: 130 }, { name: 'Natural gas', value: 2 }, { name: 'Hydro power', value: 36 }, { name: 'Oil', value: 2 }] },
        ],
      },
      {
        kind: 'pie',
        title: 'France',
        unit: 'units',
        pies: [
          { label: '1980', slices: [{ name: 'Coal', value: 25 }, { name: 'Natural gas', value: 25 }, { name: 'Hydro power', value: 5 }, { name: 'Oil', value: 20 }, { name: 'Nuclear power', value: 15 }] },
          { label: '2000', slices: [{ name: 'Coal', value: 25 }, { name: 'Natural gas', value: 25 }, { name: 'Hydro power', value: 2 }, { name: 'Oil', value: 2 }, { name: 'Nuclear power', value: 126 }] },
        ],
      },
    ],
  },
  {
    id: 't1-charity-budget',
    task: 1,
    type: 'pie',
    title: "A children's charity: revenue and spending",
    prompt:
      "The pie charts below show the average revenue sources and expenditures of a children's charity in the USA in one year.",
    charts: [
      {
        kind: 'pie',
        title: "Children's charity, USA – one year",
        pies: [
          {
            label: 'Revenue sources ($53,561,580)',
            slices: [
              { name: 'Donated food', value: 86.6 },
              { name: 'Community contributions', value: 10.4 },
              { name: 'Programme revenue', value: 2.2 },
              { name: 'Investment income', value: 0.2 },
              { name: 'Other income', value: 0.6 },
            ],
          },
          {
            label: 'Expenditures ($53,224,896)',
            slices: [
              { name: 'Programme services', value: 95.8 },
              { name: 'Fundraising', value: 2.6 },
              { name: 'Management and general', value: 1.6 },
            ],
          },
        ],
      },
    ],
  },

  // ---------- tables ----------
  {
    id: 't1-underground',
    task: 1,
    type: 'table',
    title: 'Underground railway systems',
    prompt: 'The table below gives information about the underground railway systems in six cities.',
    charts: [
      {
        kind: 'table',
        title: 'Underground railways',
        columns: ['City', 'Date opened', 'Kilometres of route', 'Passengers per year (millions)'],
        rows: [
          ['London', 1863, 394, 775],
          ['Paris', 1900, 199, 1191],
          ['Tokyo', 1927, 155, 1927],
          ['Washington DC', 1976, 126, 144],
          ['Kyoto', 1981, 11, 45],
          ['Los Angeles', 2001, 28, 50],
        ],
      },
    ],
  },
  {
    id: 't1-fairtrade',
    task: 1,
    type: 'table',
    title: 'Fairtrade coffee and bananas',
    prompt:
      'The tables below give information about sales of Fairtrade*-labelled coffee and bananas in 1999 and 2004 in five European countries.',
    charts: [
      {
        kind: 'table',
        title: 'Sales of Fairtrade-labelled coffee (millions of euros)',
        columns: ['Country', '1999', '2004'],
        rows: [
          ['UK', 1.5, 20],
          ['Switzerland', 3, 6],
          ['Denmark', 1.8, 2],
          ['Belgium', 1, 1.7],
          ['Sweden', 0.8, 1],
        ],
      },
      {
        kind: 'table',
        title: 'Sales of Fairtrade-labelled bananas (millions of euros)',
        columns: ['Country', '1999', '2004'],
        rows: [
          ['Switzerland', 15, 47],
          ['UK', 1, 5.5],
          ['Belgium', 0.6, 4],
          ['Sweden', 1.8, 1],
          ['Denmark', 2, 0.9],
        ],
      },
    ],
  },
  {
    id: 't1-consumer-spending',
    task: 1,
    type: 'table',
    title: 'Consumer spending in five countries',
    prompt:
      'The table below gives information on consumer spending on different items in five different countries in 2002.',
    charts: [
      {
        kind: 'table',
        title: 'Percentage of national consumer expenditure by category, 2002',
        columns: ['Country', 'Food / Drinks / Tobacco', 'Clothing / Footwear', 'Leisure / Education'],
        rows: [
          ['Ireland', '28.91%', '6.43%', '2.21%'],
          ['Italy', '16.36%', '9.00%', '3.20%'],
          ['Spain', '18.80%', '6.51%', '1.98%'],
          ['Sweden', '15.77%', '5.40%', '3.22%'],
          ['Turkey', '32.14%', '6.63%', '4.35%'],
        ],
      },
    ],
  },

  // ---------- processes ----------
  {
    id: 't1-bricks',
    task: 1,
    type: 'process',
    title: 'Manufacturing bricks',
    prompt: 'The diagram below shows the process by which bricks are manufactured for the building industry.',
    charts: [
      {
        kind: 'process',
        title: 'Brick manufacturing',
        steps: [
          { label: 'Clay is dug from the ground', note: 'by a large digger', icon: 'dig' },
          { label: 'Clay is passed through a metal grid', icon: 'sieve' },
          { label: 'A roller breaks the clay into small pieces', icon: 'roller' },
          { label: 'Clay is mixed', icon: 'mix', inputs: ['sand', 'water'] },
          { label: 'Shaped in a mould or cut by a wire cutter', icon: 'mould' },
          { label: 'Dried in a drying oven', note: '24–48 hours', icon: 'dry' },
          { label: 'Fired in a kiln', note: 'moderate heat 200–980°C, then high heat 870–1300°C', icon: 'heat' },
          { label: 'Cooled in a cooling chamber', note: '48–72 hours', icon: 'cool' },
          { label: 'Packaged', icon: 'pack' },
          { label: 'Delivered', icon: 'deliver' },
        ],
      },
    ],
  },
  {
    id: 't1-silk',
    task: 1,
    type: 'process',
    title: 'The silkworm and silk cloth',
    prompt:
      'The diagrams below show the life cycle of the silkworm and the stages in the production of silk cloth.',
    charts: [
      {
        kind: 'process',
        title: 'Life cycle of the silkworm',
        cyclic: true,
        center: 'Life cycle',
        steps: [
          { label: 'Eggs laid by the moth', note: 'hatch after about 10 days', icon: 'egg' },
          { label: 'Silkworm (larva)', note: 'feeds on mulberry leaves for 4–6 weeks', icon: 'larva' },
          { label: 'Cocoon', note: 'spun from silk thread in 3–8 days', icon: 'cocoon' },
          { label: 'Moth', note: 'emerges after 16 days', icon: 'moth' },
        ],
      },
      {
        kind: 'process',
        title: 'Production of silk cloth',
        steps: [
          { label: 'Cocoons are selected', icon: 'cocoon' },
          { label: 'Cocoons are boiled in water', icon: 'heat' },
          { label: 'Thread is unwound', note: '300–900 m from each cocoon', icon: 'thread' },
          { label: 'Threads are twisted together', icon: 'twist' },
          { label: 'Thread is dyed', icon: 'dye' },
          { label: 'Woven into silk cloth', icon: 'weave' },
        ],
      },
    ],
  },
  {
    id: 't1-cement',
    task: 1,
    type: 'process',
    title: 'Cement and concrete production',
    prompt:
      'The diagrams below show the stages and equipment used in the cement-making process, and how cement is used to produce concrete for building purposes.',
    charts: [
      {
        kind: 'process',
        title: 'Cement production',
        steps: [
          { label: 'Raw materials are collected', icon: 'dig', inputs: ['limestone', 'clay'] },
          { label: 'Crushed into a powder', note: 'in a crusher', icon: 'crush' },
          { label: 'Mixed together', note: 'in a mixer', icon: 'mix' },
          { label: 'Heated in a rotating heater', note: 'heat applied from a burner', icon: 'heat' },
          { label: 'Ground into fine powder', note: 'in a grinder', icon: 'grind' },
          { label: 'Cement is packed into bags', note: 'carried away on a conveyor belt', icon: 'pack' },
        ],
      },
      {
        kind: 'process',
        title: 'Concrete production',
        steps: [
          {
            label: 'Ingredients are combined',
            icon: 'stones',
            inputs: ['15% cement', '10% water', '25% sand', '50% gravel (small stones)'],
          },
          { label: 'Rotated in a concrete mixer', icon: 'mix' },
          { label: 'Concrete is ready for building', icon: 'deliver' },
        ],
      },
    ],
  },
  {
    id: 't1-salmon',
    task: 1,
    type: 'process',
    title: 'Life cycle of the salmon',
    prompt: 'The diagram below shows the life cycle of a species of large fish called the salmon.',
    charts: [
      {
        kind: 'process',
        title: 'Life cycle of the salmon',
        cyclic: true,
        center: 'Salmon',
        steps: [
          { label: 'Eggs', note: 'laid among reeds and small stones in the slow-moving upper river', icon: 'egg' },
          { label: 'Fry', note: '3–8 cm; stay in the upper river for 5–6 months', icon: 'fish' },
          { label: 'Smolt', note: '12–15 cm; live in the fast-moving lower river for 4 years', icon: 'river' },
          { label: 'Adult salmon', note: '70–76 cm; spend 5 years in the open sea', icon: 'sea' },
          { label: 'Return upriver', note: 'swim back to the upper river to lay eggs', icon: 'fish' },
        ],
      },
    ],
  },
  {
    id: 't1-pumped-hydro',
    task: 1,
    type: 'process',
    title: 'Hydroelectric power station',
    prompt:
      'The diagram below shows how electricity is generated in a hydroelectric power station.',
    charts: [
      {
        kind: 'process',
        title: 'Pumped-storage hydroelectric power',
        cyclic: true,
        center: 'Day / night cycle',
        steps: [
          { label: 'High-level reservoir', note: 'water is stored behind a dam', icon: 'water' },
          { label: 'Daytime: intake opens', note: 'water flows down to the power station', icon: 'day' },
          { label: 'Reversible turbines spin', note: 'inside the power station', icon: 'factory' },
          { label: 'Generators produce electricity', note: 'sent along power lines to the national grid', icon: 'power' },
          { label: 'Low-level reservoir', note: 'water collects below the station', icon: 'river' },
          { label: 'Night-time: water pumped up', note: 'turbines reverse and pump water back up', icon: 'night' },
        ],
      },
    ],
  },

  // ---------- maps ----------
  {
    id: 't1-island-tourism',
    task: 1,
    type: 'map',
    title: 'An island before and after tourism',
    prompt:
      'The two maps below show an island, before and after the construction of some tourist facilities.',
    charts: [
      {
        kind: 'map',
        title: 'Island before and after tourist development',
        base: 'sea',
        scale: '100 m',
        panels: [
          {
            label: 'Before',
            features: [
              { kind: 'area', type: 'land', points: ISLAND, smooth: true },
              { kind: 'area', type: 'beach', points: ISLAND_BEACH, smooth: true },
              {
                kind: 'trees',
                points: [
                  [30, 22], [36, 17], [43, 24], [50, 15], [58, 20], [66, 16], [73, 25], [79, 33], [70, 38], [62, 29], [54, 34],
                  [46, 40], [38, 35], [31, 44], [44, 51], [56, 48], [66, 49], [75, 45], [29, 31], [51, 26], [37, 54], [62, 56],
                ],
              },
              { kind: 'label', text: 'Beach', at: [7.5, 33], size: 's', italic: true },
              { kind: 'label', text: 'SEA', at: [50, 4], size: 's', italic: true },
              { kind: 'label', text: 'SEA', at: [88, 60], size: 's', italic: true },
            ],
          },
          {
            label: 'After',
            features: [
              { kind: 'area', type: 'land', points: ISLAND, smooth: true },
              { kind: 'area', type: 'beach', points: ISLAND_BEACH, smooth: true },
              { kind: 'area', type: 'swim', points: [[5, 25], [11.5, 23], [11.5, 41], [5, 43]], label: 'Swimming\narea', at: [9.5, 52] },
              { kind: 'line', type: 'pier', points: [[50, 60], [50, 68]], label: 'Pier', at: [56, 66] },
              { kind: 'line', type: 'track', points: [[50, 60.5], [51, 54], [48.5, 46], [48, 34]], smooth: true, label: 'Vehicle track', at: [39, 47] },
              { kind: 'line', type: 'footpath', points: [[44, 31], [37.8, 33]] },
              { kind: 'line', type: 'footpath', points: [[52, 31], [64.2, 35.5]] },
              { kind: 'line', type: 'footpath', points: [[52, 28.5], [57.5, 25]] },
              { kind: 'line', type: 'footpath', points: [[24.2, 33], [20, 33]] },
              { kind: 'houses', points: ring(31, 33, 6.6) },
              { kind: 'houses', points: ring(71, 36, 6.6) },
              { kind: 'trees', points: [[31, 33], [71, 36], [36, 17], [50, 14], [67, 15], [81, 31], [60, 52], [40, 55], [77, 48]] },
              { kind: 'building', x: 44, y: 28, w: 8, h: 5, tone: 'civic', label: 'Reception', at: [48, 37] },
              { kind: 'building', x: 56, y: 19.5, w: 9, h: 5, tone: 'civic', label: 'Restaurant', at: [60.5, 17.6] },
              { kind: 'label', text: 'Accommodation', at: [31, 23.4], size: 's' },
              { kind: 'label', text: 'Accommodation', at: [71, 27.2], size: 's' },
              { kind: 'label', text: 'Beach', at: [8.3, 20], size: 's', italic: true },
            ],
          },
        ],
      },
    ],
  },
  {
    id: 't1-stokeford',
    task: 1,
    type: 'map',
    title: 'Changes in the village of Stokeford',
    prompt: 'The maps below show changes that took place in the village of Stokeford between 1930 and 2010.',
    charts: [
      {
        kind: 'map',
        title: 'Stokeford, 1930 and 2010',
        scale: '100 m',
        panels: [
          {
            label: '1930',
            features: [
              { kind: 'area', type: 'farm', points: [[2, 16], [46, 17], [46, 33], [2, 33]], label: 'Farmland', at: [20, 25] },
              { kind: 'area', type: 'farm', points: [[54, 16], [98, 15], [98, 34], [54, 34]], label: 'Farmland', at: [78, 25] },
              { kind: 'area', type: 'farm', points: [[2, 45], [30, 45], [30, 68], [2, 68]], label: 'Farmland', at: [16, 56] },
              { kind: 'area', type: 'park', points: [[64, 48], [96, 48], [96, 68], [64, 68]], label: 'Gardens', at: [80, 66] },
              { kind: 'line', type: 'river', points: [[0, 11], [18, 8], [38, 12], [58, 8], [78, 11], [100, 7]], smooth: true, label: 'River Stoke', at: [28, 5.5] },
              { kind: 'line', type: 'mainroad', points: [[0, 40], [100, 40]], label: 'Main road', at: [38, 43.8] },
              { kind: 'line', type: 'road', points: [[50, 40], [50, 0]] },
              { kind: 'houses', points: [[30, 37], [36, 37], [58, 37], [64, 37], [70, 37], [70, 43], [76, 43]] },
              { kind: 'building', x: 41, y: 34.2, w: 5, h: 3.6, label: 'Shop', at: [43.5, 31.6] },
              { kind: 'building', x: 52, y: 42, w: 6, h: 3.6, tone: 'civic', label: 'Post office' },
              { kind: 'building', x: 36, y: 51, w: 10, h: 6, tone: 'civic', label: 'Primary school' },
              { kind: 'building', x: 74, y: 52, w: 11, h: 7, label: 'Large house', at: [79.5, 61.4] },
              { kind: 'trees', points: [[67.5, 52], [68, 60], [91, 52], [91, 60], [70, 65], [88, 65]] },
            ],
          },
          {
            label: '2010',
            features: [
              { kind: 'area', type: 'housing', points: [[2, 16], [46, 17], [46, 33], [2, 33]] },
              { kind: 'area', type: 'farm', points: [[66, 16], [98, 15], [98, 34], [66, 34]], label: 'Farmland', at: [82, 25] },
              { kind: 'area', type: 'housing', points: [[2, 45], [30, 45], [30, 68], [2, 68]] },
              { kind: 'area', type: 'park', points: [[64, 48], [96, 48], [96, 68], [64, 68]] },
              { kind: 'area', type: 'parking', points: [[66, 61], [80, 61], [80, 67], [66, 67]] },
              { kind: 'line', type: 'river', points: [[0, 11], [18, 8], [38, 12], [58, 8], [78, 11], [100, 7]], smooth: true, label: 'River Stoke', at: [28, 5.5] },
              { kind: 'line', type: 'mainroad', points: [[0, 40], [100, 40]], label: 'Main road', at: [38, 43.8] },
              { kind: 'line', type: 'road', points: [[50, 40], [50, 0]] },
              { kind: 'line', type: 'road', points: [[24, 40], [24, 17]] },
              { kind: 'line', type: 'road', points: [[16, 40], [16, 66]] },
              { kind: 'line', type: 'road', points: [[80, 40], [80, 48]] },
              {
                kind: 'houses',
                points: [
                  [8, 21], [8, 28], [14, 21], [14, 28], [19, 21], [19, 28], [30, 21], [30, 28], [36, 21], [36, 28], [42, 21],
                  [9, 50], [9, 57], [9, 64], [23, 50], [23, 57], [23, 64],
                  [30, 37], [36, 37], [58, 37], [64, 37], [70, 37], [76, 37], [86, 37], [92, 37], [64, 43], [70, 43], [86, 43], [92, 43],
                ],
              },
              { kind: 'building', x: 39.5, y: 33.8, w: 7, h: 4, tone: 'new', label: 'Shops', at: [43, 31.4] },
              { kind: 'building', x: 52, y: 42, w: 6, h: 3.6, tone: 'civic', label: 'Post office' },
              { kind: 'building', x: 34, y: 51, w: 15, h: 7, tone: 'civic', label: 'Primary school\n(extended)', at: [41.5, 62.4] },
              { kind: 'building', x: 71, y: 50, w: 17, h: 7, tone: 'new', label: 'Retirement home', at: [79.5, 59.2] },
              { kind: 'trees', points: [[67.5, 52], [91, 52], [91, 60], [86, 65]] },
              { kind: 'label', text: 'Housing', at: [25, 31.5], size: 's' },
            ],
          },
        ],
      },
    ],
  },
  {
    id: 't1-chorleywood',
    task: 1,
    type: 'map',
    title: 'The development of Chorleywood',
    prompt:
      'The map below is of the town of Chorleywood, a village near London whose population has increased steadily since the middle of the nineteenth century. It shows the development of the village from 1868 to 1994.',
    charts: [
      {
        kind: 'map',
        title: 'Chorleywood village, 1868–1994',
        scale: '500 m',
        zones: ['1868–1883', '1883–1922', '1922–1970', '1970–1994'],
        panels: [
          {
            label: '',
            features: [
              { kind: 'area', type: 'park', points: [[66, 3], [88, 3], [88, 20], [66, 20]], label: 'Chorleywood\nPark & Golf\nCourse', at: [77, 11.5] },
              { kind: 'area', type: 'zone', zone: 2, points: [[20, 14], [42, 12], [46, 30], [44, 50], [26, 50], [18, 32]], smooth: true },
              { kind: 'area', type: 'zone', zone: 2, points: [[74, 24], [92, 25], [94, 44], [76, 48]], smooth: true },
              { kind: 'area', type: 'zone', zone: 1, points: [[44, 22], [56, 19], [70, 26], [73, 37], [70, 48], [58, 51], [47, 48], [45, 36]], smooth: true },
              { kind: 'area', type: 'zone', zone: 0, points: [[57, 33], [66, 31], [69, 39], [63, 45], [57, 43]], smooth: true },
              { kind: 'area', type: 'zone', zone: 3, points: [[26, 60], [42, 60], [44, 67], [26, 67]], smooth: true },
              { kind: 'line', type: 'motorway', points: [[10, 0], [12, 35], [9, 70]], smooth: true, label: 'Motorway (1970)', at: [5.5, 40], angle: -90 },
              { kind: 'line', type: 'railway', points: [[52, 0], [50, 30], [54, 70]], smooth: true, label: 'Railway (1909)', at: [56.5, 15], angle: 90 },
              { kind: 'line', type: 'mainroad', points: [[0, 57], [30, 55], [60, 57], [100, 54]], smooth: true, label: 'Main road', at: [84, 51] },
              { kind: 'building', x: 49.3, y: 37, w: 3.8, h: 3, tone: 'civic', label: 'Station', at: [44.5, 38.6] },
            ],
          },
        ],
      },
    ],
  },

  // ---------- mixed ----------
  {
    id: 't1-exports',
    task: 1,
    type: 'mixed',
    title: "Value of one country's exports",
    prompt:
      "The chart below shows the value of one country's exports in various categories during 2015 and 2016. The table shows the percentage change in each category of exports in 2016 compared with 2015.",
    charts: [
      {
        kind: 'bar',
        title: 'Export earnings (2015–2016)',
        unit: 'billion $',
        yLabel: 'Billions of dollars',
        categories: ['Petroleum products', 'Engineered goods', 'Gems and jewellery', 'Agricultural products', 'Textiles'],
        series: [
          { name: '2015', values: [61.2, 57.5, 43.5, 30.3, 26.2] },
          { name: '2016', values: [63.0, 62.4, 41.2, 30.5, 30.2] },
        ],
      },
      {
        kind: 'table',
        title: 'Percentage change in values (2015–2016)',
        columns: ['Category', 'Change'],
        rows: [
          ['Petroleum products', '↑ 3%'],
          ['Engineered goods', '↑ 8.5%'],
          ['Gems and jewellery', '↓ 5.18%'],
          ['Agricultural products', '↑ 0.81%'],
          ['Textiles', '↑ 15.24%'],
        ],
      },
    ],
  },
]
