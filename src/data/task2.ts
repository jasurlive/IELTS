import type { Task2, Task2Type } from './types'

// Writing Task 2 bank, written in the Cambridge IELTS format.

const QUESTION: Record<Task2Type, string> = {
  opinion: 'To what extent do you agree or disagree?',
  discussion: 'Discuss both these views and give your own opinion.',
  advantages: 'Do the advantages of this outweigh the disadvantages?',
  'problem-solution': '',
  'two-part': '',
}

export const TASK2_FOOTER =
  'Give reasons for your answer and include any relevant examples from your own knowledge or experience.'

type Entry = [id: string, type: Task2Type, topic: string, title: string, prompt: string, question?: string]

const entries: Entry[] = [
  [
    't2-wealth-children', 'opinion', 'Family', 'Children from less wealthy families',
    'Children who are brought up in families that do not have large amounts of money are better prepared to deal with the problems of adult life than children brought up by wealthy parents.',
    'To what extent do you agree or disagree with this opinion?',
  ],
  [
    't2-museums-free', 'opinion', 'Culture', 'Free entry to museums',
    'Museums and art galleries should be free for everyone to visit, and governments should pay for their running costs.',
  ],
  [
    't2-university-jobs', 'discussion', 'Education', 'Purpose of university',
    'Some people believe that the main purpose of a university education is to prepare students for employment. Others think universities have much wider functions.',
  ],
  [
    't2-online-learning', 'advantages', 'Education', 'Studying online',
    'An increasing number of students now complete their entire degree online without ever attending classes on a university campus.',
  ],
  [
    't2-traffic', 'problem-solution', 'Cities', 'Traffic congestion',
    'In many large cities, traffic congestion is becoming worse every year.',
    'What are the causes of this problem, and what measures could be taken to reduce it?',
  ],
  [
    't2-rural-young', 'problem-solution', 'Society', 'Young people leaving the countryside',
    'In many countries, young people are moving away from rural areas to find work in cities, leaving mostly older people in the countryside.',
    'Why is this happening? What problems does it cause, and how can they be solved?',
  ],
  [
    't2-space', 'opinion', 'Science', 'Spending on space exploration',
    'Governments spend too much money on space exploration. This money would be better spent on solving problems on Earth.',
  ],
  [
    't2-sport-salaries', 'opinion', 'Sport', 'Salaries of sports stars',
    'Professional sportspeople earn far too much money compared with people in more important jobs, such as nurses and teachers.',
  ],
  [
    't2-competition-cooperation', 'discussion', 'Education', 'Competition or cooperation',
    'Some people think that children should be taught to be competitive at school. Others believe that it is more useful to teach them to cooperate with each other.',
  ],
  [
    't2-remote-work', 'advantages', 'Work', 'Working from home',
    'Many companies now allow their employees to work from home for some or all of the week.',
  ],
  [
    't2-plastic', 'problem-solution', 'Environment', 'Plastic waste',
    'The amount of plastic waste produced by households and businesses is causing serious damage to the environment.',
    'What are the main causes of this, and what can individuals and governments do about it?',
  ],
  [
    't2-climate-individual', 'discussion', 'Environment', 'Who should tackle climate change',
    'Some people think that individuals can do little to reduce climate change and that only governments and large companies can make a real difference. Others believe that every individual must take responsibility.',
  ],
  [
    't2-tourism', 'advantages', 'Travel', 'International tourism',
    'International tourism has grown enormously in recent decades, and some popular destinations now receive more visitors than residents.',
  ],
  [
    't2-older-workers', 'two-part', 'Work', 'Retirement age',
    'In many countries people are now working well beyond the traditional retirement age.',
    'Why is this happening? Is this a positive or negative development?',
  ],
  [
    't2-social-media-news', 'two-part', 'Media', 'News from social media',
    'More and more people now get their news from social media rather than from newspapers or television.',
    'Why is this the case? What effects does this have on society?',
  ],
  [
    't2-crime-prison', 'discussion', 'Crime', 'Prison versus education',
    'Some people think that the best way to reduce crime is to give longer prison sentences. Others, however, believe that education is a more effective way to prevent crime.',
  ],
  [
    't2-languages', 'discussion', 'Education', 'When to learn a foreign language',
    'Some people believe that children should start learning a foreign language at primary school. Others think it is better to wait until secondary school.',
  ],
  [
    't2-advertising-children', 'opinion', 'Media', 'Advertising aimed at children',
    'Advertising aimed at children should be banned completely, because it encourages them to want things they do not need.',
  ],
  [
    't2-healthy-food-tax', 'opinion', 'Health', 'Taxing unhealthy food',
    'The government should put a high tax on unhealthy foods such as fast food and sugary drinks in order to improve public health.',
  ],
  [
    't2-elderly-care', 'discussion', 'Family', 'Caring for elderly parents',
    'Some people think that adult children should look after their elderly parents at home. Others believe that it is better for older people to live in care homes run by professionals.',
  ],
  [
    't2-technology-friendship', 'two-part', 'Technology', 'Technology and friendship',
    'Modern technology means that people can communicate with friends at any time, yet many say they feel lonelier than ever.',
    'Why might this be? What can be done to help people build stronger relationships?',
  ],
  [
    't2-gap-year', 'advantages', 'Education', 'Taking a gap year',
    'In some countries, it is common for young people to take a year off between finishing school and starting university, in order to work or travel.',
  ],
  [
    't2-cities-housing', 'problem-solution', 'Cities', 'Expensive city housing',
    'In many major cities, the cost of buying or renting a home has become so high that many working people cannot afford to live there.',
    'What problems does this cause, and what solutions can you suggest?',
  ],
  [
    't2-art-funding', 'discussion', 'Culture', 'Government funding for the arts',
    'Some people believe that governments should spend money supporting artists, musicians and theatres. Others think this money should be spent on public services such as health and education.',
  ],
  [
    't2-zoos', 'opinion', 'Animals', 'Do we still need zoos?',
    'Zoos are cruel to animals and have no place in the modern world.',
  ],
  [
    't2-ai-jobs', 'two-part', 'Technology', 'Artificial intelligence at work',
    'Artificial intelligence is increasingly able to do tasks that were previously done by people, from writing reports to driving vehicles.',
    'What jobs are most likely to be affected? Do you think this is a positive or negative development?',
  ],
  [
    't2-homework', 'opinion', 'Education', 'Banning homework',
    'Primary school children should not be given any homework, so that they have more free time to play and spend with their families.',
  ],
  [
    't2-cashless', 'advantages', 'Economy', 'A cashless society',
    'In some countries, cash is rapidly disappearing as people pay for almost everything with cards and mobile phones.',
  ],
]

export const task2: Task2[] = entries.map(([id, type, topic, title, prompt, question]) => ({
  id,
  task: 2,
  type,
  topic,
  title,
  prompt,
  question: question ?? QUESTION[type],
}))
