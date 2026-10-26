import type { Task1 } from './types'
import radioTv from '../img/task1.png'

// Academic Writing Task 1 bank, written in the Cambridge IELTS format.
// add a task: copy an entry, give it a unique id, pick a chart kind from types.ts

export const SUMMARISE =
  'Summarise the information by selecting and reporting the main features, and make comparisons where relevant.'

export const task1: Task1[] = [
  {
    id: 't1-radio-tv',
    task: 1,
    type: 'line',
    title: 'Radio and TV audiences in the UK',
    prompt: 'The graph below shows radio and television audiences throughout the day in 1992.',
    charts: [{ kind: 'image', src: radioTv, alt: 'Line graph of radio and television audiences in the UK, October to December 1992' }],
  },
  {
    id: 't1-drinks',
    task: 1,
    type: 'line',
    title: 'Hot and cold drink consumption',
    prompt:
      'The graph below shows the average number of cups of coffee, tea and soft drinks consumed per person each week in one European country between 1990 and 2020.',
    charts: [
      {
        kind: 'line',
        title: 'Weekly drink consumption per person, 1990–2020',
        unit: 'cups',
        yLabel: 'Cups per person per week',
        categories: ['1990', '1995', '2000', '2005', '2010', '2015', '2020'],
        series: [
          { name: 'Tea', values: [21, 19, 17, 15, 13, 12, 11] },
          { name: 'Coffee', values: [8, 9, 11, 13, 16, 18, 19] },
          { name: 'Soft drinks', values: [6, 9, 12, 13, 12, 10, 9] },
        ],
      },
    ],
  },
  {
    id: 't1-commute',
    task: 1,
    type: 'line',
    title: 'How commuters travel to work',
    prompt:
      'The graph below shows the percentage of commuters in a large city who travelled to work by car, bus, train and bicycle from 1970 to 2020, with projections to 2030.',
    charts: [
      {
        kind: 'line',
        title: 'Commuters by mode of transport, 1970–2030*',
        unit: '%',
        yLabel: 'Percentage of commuters',
        xLabel: '* 2030 figures are projections',
        categories: ['1970', '1980', '1990', '2000', '2010', '2020', '2030*'],
        series: [
          { name: 'Car', values: [28, 39, 48, 52, 47, 40, 31] },
          { name: 'Bus', values: [36, 30, 24, 20, 19, 18, 18] },
          { name: 'Train', values: [30, 26, 22, 21, 24, 27, 30] },
          { name: 'Bicycle', values: [6, 5, 4, 5, 9, 14, 20] },
        ],
      },
    ],
  },
  {
    id: 't1-visitors',
    task: 1,
    type: 'line',
    title: 'International visitors to three countries',
    prompt:
      'The graph below shows the number of international tourists who visited three countries between 2008 and 2022.',
    charts: [
      {
        kind: 'line',
        title: 'International tourist arrivals, 2008–2022',
        unit: 'million',
        yLabel: 'Visitors (millions)',
        categories: ['2008', '2010', '2012', '2014', '2016', '2018', '2020', '2022'],
        series: [
          { name: 'Country A', values: [42, 45, 50, 56, 61, 66, 18, 49] },
          { name: 'Country B', values: [25, 24, 27, 31, 36, 40, 11, 34] },
          { name: 'Country C', values: [9, 12, 16, 21, 26, 30, 7, 26] },
        ],
      },
    ],
  },
  {
    id: 't1-electricity',
    task: 1,
    type: 'line',
    title: 'Electricity generation by source',
    prompt:
      'The graph below shows how electricity was generated in one country from 2000 to 2025, measured in terawatt hours (TWh).',
    charts: [
      {
        kind: 'line',
        title: 'Electricity generation by source, 2000–2025',
        unit: 'TWh',
        yLabel: 'Terawatt hours',
        categories: ['2000', '2005', '2010', '2015', '2020', '2025'],
        series: [
          { name: 'Coal', values: [120, 115, 98, 70, 38, 12] },
          { name: 'Natural gas', values: [60, 82, 105, 110, 96, 80] },
          { name: 'Nuclear', values: [80, 76, 64, 62, 58, 55] },
          { name: 'Wind & solar', values: [2, 6, 18, 45, 88, 130] },
        ],
      },
    ],
  },
  {
    id: 't1-internet',
    task: 1,
    type: 'bar',
    title: 'Household internet access',
    prompt:
      'The chart below shows the percentage of households with internet access in five countries in 2005, 2015 and 2025.',
    charts: [
      {
        kind: 'bar',
        title: 'Households with internet access',
        unit: '%',
        yLabel: 'Percentage of households',
        categories: ['Canada', 'Brazil', 'Japan', 'Kenya', 'Poland'],
        series: [
          { name: '2005', values: [64, 13, 58, 2, 30] },
          { name: '2015', values: [85, 51, 80, 11, 75] },
          { name: '2025', values: [96, 84, 93, 38, 94] },
        ],
      },
    ],
  },
  {
    id: 't1-spending',
    task: 1,
    type: 'bar',
    title: 'Weekly household spending',
    prompt:
      'The bar chart below shows the average weekly spending of families in one country on five categories in 2000 and 2020.',
    charts: [
      {
        kind: 'bar',
        title: 'Average weekly household spending (USD)',
        unit: '$',
        yLabel: 'US dollars per week',
        categories: ['Housing', 'Food', 'Transport', 'Leisure', 'Clothing'],
        series: [
          { name: '2000', values: [140, 95, 70, 55, 40] },
          { name: '2020', values: [260, 110, 85, 90, 30] },
        ],
      },
    ],
  },
  {
    id: 't1-graduates',
    task: 1,
    type: 'bar',
    title: 'University graduates by subject and gender',
    prompt:
      'The chart below shows the number of male and female students who graduated in five subject areas from universities in one country in 2023.',
    charts: [
      {
        kind: 'bar',
        title: 'Graduates by subject and gender, 2023',
        unit: 'thousand',
        yLabel: 'Graduates (thousands)',
        categories: ['Engineering', 'Medicine', 'Law', 'Arts', 'Business'],
        series: [
          { name: 'Male', values: [42, 18, 15, 12, 38] },
          { name: 'Female', values: [11, 26, 19, 30, 35] },
        ],
      },
    ],
  },
  {
    id: 't1-water-use',
    task: 1,
    type: 'bar',
    title: 'Water use by sector in four regions',
    prompt:
      'The chart below shows the proportion of water used for agriculture, industry and domestic purposes in four regions of the world.',
    charts: [
      {
        kind: 'bar',
        title: 'Water use by sector',
        unit: '%',
        yLabel: 'Percentage of total water use',
        categories: ['Africa', 'Europe', 'N. America', 'S. Asia'],
        series: [
          { name: 'Agriculture', values: [84, 33, 40, 91] },
          { name: 'Industry', values: [6, 52, 47, 3] },
          { name: 'Domestic', values: [10, 15, 13, 6] },
        ],
      },
    ],
  },
  {
    id: 't1-waste',
    task: 1,
    type: 'pie',
    title: 'Household waste in one city',
    prompt: 'The pie charts below show the composition of household waste in one city in 2000 and 2020.',
    charts: [
      {
        kind: 'pie',
        title: 'Composition of household waste',
        pies: [
          {
            label: '2000',
            slices: [
              { name: 'Food', value: 38 },
              { name: 'Paper', value: 27 },
              { name: 'Plastic', value: 12 },
              { name: 'Glass', value: 9 },
              { name: 'Other', value: 14 },
            ],
          },
          {
            label: '2020',
            slices: [
              { name: 'Food', value: 29 },
              { name: 'Paper', value: 16 },
              { name: 'Plastic', value: 31 },
              { name: 'Glass', value: 6 },
              { name: 'Other', value: 18 },
            ],
          },
        ],
      },
    ],
  },
  {
    id: 't1-home-energy',
    task: 1,
    type: 'pie',
    title: 'Energy use in homes in two countries',
    prompt:
      'The pie charts below show how energy is used in a typical home in Canada and in Australia.',
    charts: [
      {
        kind: 'pie',
        title: 'Household energy use',
        pies: [
          {
            label: 'Canada',
            slices: [
              { name: 'Heating', value: 58 },
              { name: 'Water heating', value: 19 },
              { name: 'Appliances', value: 13 },
              { name: 'Lighting', value: 4 },
              { name: 'Cooling', value: 6 },
            ],
          },
          {
            label: 'Australia',
            slices: [
              { name: 'Heating', value: 32 },
              { name: 'Water heating', value: 27 },
              { name: 'Appliances', value: 24 },
              { name: 'Lighting', value: 6 },
              { name: 'Cooling', value: 11 },
            ],
          },
        ],
      },
    ],
  },
  {
    id: 't1-metro',
    task: 1,
    type: 'table',
    title: 'Underground railway systems',
    prompt: 'The table below gives information about the underground railway systems in six cities.',
    charts: [
      {
        kind: 'table',
        title: 'Underground railway systems',
        columns: ['City', 'Date opened', 'Kilometres of route', 'Passengers per year (millions)'],
        rows: [
          ['London', 1863, 402, 1350],
          ['Paris', 1900, 226, 1500],
          ['Madrid', 1919, 294, 680],
          ['Tokyo', 1927, 195, 2900],
          ['Seoul', 1974, 331, 2600],
          ['Dubai', 2009, 90, 250],
        ],
      },
    ],
  },
  {
    id: 't1-diet',
    task: 1,
    type: 'table',
    title: 'Weekly food consumption',
    prompt:
      'The table below shows the average amount of six types of food eaten per person each week in one country in 1980, 2000 and 2020 (grams).',
    charts: [
      {
        kind: 'table',
        title: 'Average weekly food consumption per person (grams)',
        columns: ['Food', '1980', '2000', '2020'],
        rows: [
          ['Red meat', 820, 640, 410],
          ['Chicken', 180, 290, 390],
          ['Fish', 150, 140, 160],
          ['Fresh fruit', 560, 720, 780],
          ['Sugar', 310, 210, 130],
          ['Ready meals', 40, 260, 480],
        ],
      },
    ],
  },
  {
    id: 't1-bricks',
    task: 1,
    type: 'process',
    title: 'Manufacturing bricks',
    prompt: 'The diagram below illustrates the process used to manufacture bricks for the building industry.',
    charts: [
      {
        kind: 'process',
        title: 'Brick manufacturing',
        steps: [
          'Clay is dug from the ground by a large digger',
          'Clay passes through a metal grid and a roller to break it up',
          'Sand and water are added and mixed',
          'Mixture is shaped in a mould or cut by a wire cutter',
          'Bricks are placed in a drying oven for 24–48 hours',
          'Bricks are heated in a kiln at 200–1300 °C',
          'Bricks are cooled in a chamber for 48–72 hours',
          'Bricks are packaged and delivered',
        ],
      },
    ],
  },
  {
    id: 't1-honeybee',
    task: 1,
    type: 'process',
    title: 'Life cycle of the honeybee',
    prompt: 'The diagram below shows the life cycle of the honeybee.',
    charts: [
      {
        kind: 'process',
        title: 'Life cycle of the honeybee',
        cyclic: true,
        steps: [
          'Queen lays an egg in a wax cell (day 1)',
          'Egg hatches into a larva (day 3)',
          'Larva is fed and grows rapidly (days 3–9)',
          'Cell is capped and larva becomes a pupa (days 9–20)',
          'Adult bee emerges from the cell (day 21)',
          'Adult works in the hive, then mates and the cycle repeats',
        ],
      },
    ],
  },
  {
    id: 't1-rainwater',
    task: 1,
    type: 'process',
    title: 'Rainwater for drinking',
    prompt:
      'The diagram below shows how rainwater is collected and treated in one Australian town so that it can be used as drinking water.',
    charts: [
      {
        kind: 'process',
        title: 'Collecting and treating rainwater',
        steps: [
          'Rain falls on roofs and runs into gutters',
          'Water travels through pipes to an underground tank',
          'Water is filtered to remove leaves and dirt',
          'Chemicals are added to kill bacteria',
          'Clean water is stored in a reservoir',
          'Water is piped to homes for drinking',
        ],
      },
    ],
  },
  {
    id: 't1-village',
    task: 1,
    type: 'map',
    title: 'Changes to a coastal village',
    prompt: 'The maps below show the village of Seaton in 1995 and the village today.',
    charts: [
      {
        kind: 'map',
        title: 'Seaton village',
        panels: [
          {
            label: '1995',
            features: [
              { name: 'Sea', type: 'water', x: 0, y: 0, w: 100, h: 12 },
              { name: 'Beach', type: 'beach', x: 0, y: 12, w: 100, h: 8 },
              { name: 'Main road', type: 'road', x: 0, y: 44, w: 100, h: 6 },
              { name: 'Farmland', type: 'green', x: 4, y: 24, w: 40, h: 16 },
              { name: 'Fishing huts', type: 'building', x: 60, y: 24, w: 22, h: 10 },
              { name: 'Houses', type: 'building', x: 8, y: 54, w: 26, h: 12 },
              { name: 'Shop', type: 'building', x: 42, y: 54, w: 12, h: 10 },
              { name: 'Forest', type: 'green', x: 62, y: 54, w: 34, h: 14 },
            ],
          },
          {
            label: 'Today',
            features: [
              { name: 'Sea', type: 'water', x: 0, y: 0, w: 100, h: 12 },
              { name: 'Beach', type: 'beach', x: 0, y: 12, w: 100, h: 8 },
              { name: 'Main road', type: 'road', x: 0, y: 44, w: 100, h: 6 },
              { name: 'Hotel', type: 'building', x: 4, y: 24, w: 22, h: 14 },
              { name: 'Car park', type: 'parking', x: 30, y: 26, w: 16, h: 12 },
              { name: 'Restaurants', type: 'building', x: 60, y: 24, w: 22, h: 10 },
              { name: 'Houses', type: 'building', x: 8, y: 54, w: 26, h: 12 },
              { name: 'Supermarket', type: 'building', x: 38, y: 54, w: 20, h: 12 },
              { name: 'Golf course', type: 'green', x: 62, y: 54, w: 34, h: 14 },
            ],
          },
        ],
      },
    ],
  },
  {
    id: 't1-campus',
    task: 1,
    type: 'map',
    title: 'Planned changes to a school',
    prompt: 'The plans below show a secondary school now and the changes planned for next year.',
    charts: [
      {
        kind: 'map',
        title: 'School site',
        panels: [
          {
            label: 'Now',
            features: [
              { name: 'School Road', type: 'road', x: 0, y: 62, w: 100, h: 8 },
              { name: 'Main building', type: 'building', x: 6, y: 34, w: 34, h: 22 },
              { name: 'Car park', type: 'parking', x: 46, y: 40, w: 24, h: 16 },
              { name: 'Playing field', type: 'green', x: 6, y: 4, w: 60, h: 24 },
              { name: 'Library', type: 'building', x: 76, y: 40, w: 18, h: 16 },
              { name: 'Garden', type: 'green', x: 72, y: 4, w: 22, h: 24 },
            ],
          },
          {
            label: 'Next year',
            features: [
              { name: 'School Road', type: 'road', x: 0, y: 62, w: 100, h: 8 },
              { name: 'Main building', type: 'building', x: 6, y: 34, w: 34, h: 22 },
              { name: 'Sports hall', type: 'building', x: 46, y: 40, w: 24, h: 16 },
              { name: 'Playing field', type: 'green', x: 6, y: 4, w: 36, h: 24 },
              { name: 'Car park', type: 'parking', x: 46, y: 4, w: 20, h: 24 },
              { name: 'Library', type: 'building', x: 76, y: 40, w: 18, h: 16 },
              { name: 'Science block', type: 'building', x: 72, y: 4, w: 22, h: 24 },
            ],
          },
        ],
      },
    ],
  },
  {
    id: 't1-jobs-mixed',
    task: 1,
    type: 'mixed',
    title: 'Employment and income by sector',
    prompt:
      'The bar chart shows the number of people employed in four sectors in one country in 1990 and 2020. The table shows the average annual income in each sector in 2020.',
    charts: [
      {
        kind: 'bar',
        title: 'Employment by sector',
        unit: 'million',
        yLabel: 'Workers (millions)',
        categories: ['Agriculture', 'Manufacturing', 'Services', 'Technology'],
        series: [
          { name: '1990', values: [4.2, 6.8, 9.5, 0.6] },
          { name: '2020', values: [1.5, 4.1, 14.2, 3.4] },
        ],
      },
      {
        kind: 'table',
        title: 'Average annual income, 2020',
        columns: ['Sector', 'Income (USD)'],
        rows: [
          ['Agriculture', '24,000'],
          ['Manufacturing', '41,000'],
          ['Services', '38,000'],
          ['Technology', '76,000'],
        ],
      },
    ],
  },
  {
    id: 't1-reading-mixed',
    task: 1,
    type: 'mixed',
    title: 'Reading habits of adults',
    prompt:
      'The line graph shows the percentage of adults in one country who read printed books and e-books from 2010 to 2025. The pie chart shows the main reasons people gave for reading in 2025.',
    charts: [
      {
        kind: 'line',
        title: 'Adults who read at least one book a month',
        unit: '%',
        yLabel: 'Percentage of adults',
        categories: ['2010', '2013', '2016', '2019', '2022', '2025'],
        series: [
          { name: 'Printed books', values: [61, 57, 52, 48, 45, 44] },
          { name: 'E-books', values: [4, 12, 21, 27, 33, 38] },
          { name: 'Audiobooks', values: [2, 4, 7, 12, 19, 26] },
        ],
      },
      {
        kind: 'pie',
        title: 'Main reason for reading, 2025',
        pies: [
          {
            label: 'All readers',
            slices: [
              { name: 'Relaxation', value: 41 },
              { name: 'Work / study', value: 27 },
              { name: 'Self-improvement', value: 19 },
              { name: 'Other', value: 13 },
            ],
          },
        ],
      },
    ],
  },
]
