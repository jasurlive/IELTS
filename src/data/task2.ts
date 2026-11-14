import type { Task2, Task2Type } from './types'

// Writing Task 2 bank: questions from the Cambridge IELTS practice books.

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
  // ---------- opinion ----------
  [
    't2-community-service', 'opinion', 'Education', 'Compulsory community service',
    'Some people believe that unpaid community service should be a compulsory part of high school programmes (for example working for a charity, improving the neighbourhood or teaching sports to younger children).',
  ],
  [
    't2-social-networks', 'opinion', 'Technology', 'Social networking sites',
    'Many people believe that social networking sites (such as Facebook) have had a huge negative impact on both individuals and society.',
  ],
  [
    't2-dying-languages', 'opinion', 'Culture', 'Languages dying out',
    'Every year several languages die out. Some people think that this is not important because life will be easier if there are fewer languages in the world.',
    'To what extent do you agree or disagree with this opinion?',
  ],
  [
    't2-printed-news', 'opinion', 'Media', 'The end of printed newspapers and books',
    'In the future, nobody will buy printed newspapers or books because they will be able to read everything they want online without paying.',
    'To what extent do you agree or disagree with this statement?',
  ],
  [
    't2-music-unites', 'opinion', 'Culture', 'Music brings people together',
    'Some people say that music is a good way of bringing people of different cultures and ages together.',
    'To what extent do you agree or disagree with this opinion?',
  ],
  [
    't2-foreign-language-living', 'opinion', 'Society', 'Living abroad in a foreign language',
    'Living in a country where you have to speak a foreign language can cause serious social problems, as well as practical problems.',
    'To what extent do you agree or disagree with this statement?',
  ],
  [
    't2-petrol-price', 'opinion', 'Environment', 'Raising the price of petrol',
    'Increasing the price of petrol is the best way to solve growing traffic and pollution problems.',
    'To what extent do you agree or disagree? What other measures do you think might be effective?',
  ],
  [
    't2-recycling-law', 'opinion', 'Environment', 'Making recycling a legal requirement',
    'Some people claim that not enough of the waste from homes is recycled. They say that the only way to increase recycling is for governments to make it a legal requirement.',
    'To what extent do you think laws are needed to make people recycle more of their waste?',
  ],

  // ---------- discuss both views ----------
  [
    't2-why-languages', 'discussion', 'Education', 'Reasons for learning a language',
    'Some people say that the only reason for learning a foreign language is in order to travel to or work in a foreign country. Others say that these are not the only reasons why someone should learn a foreign language.',
  ],
  [
    't2-competition-cooperation', 'discussion', 'Family', 'Competition or co-operation',
    'Some people think that a sense of competition in children should be encouraged. Others believe that children who are taught to co-operate rather than compete become more useful adults.',
  ],
  [
    't2-fixed-punishments', 'discussion', 'Crime', 'Fixed punishments for crimes',
    'Some people believe that there should be fixed punishments for each type of crime. Others, however, argue that the circumstances of an individual crime, and the motivation for committing it, should always be taken into account when deciding on the punishment.',
  ],
  [
    't2-university-subjects', 'discussion', 'Education', 'Choosing university subjects',
    'Some people think that all university students should study whatever they like. Others believe that they should only be allowed to study subjects that will be useful in the future, such as those related to science and technology.',
  ],
  [
    't2-accept-or-improve', 'discussion', 'Society', 'Accepting a bad situation',
    'Some people believe that it is best to accept a bad situation, such as an unsatisfactory job or shortage of money. Others argue that it is better to try and improve such situations.',
  ],
  [
    't2-economic-progress', 'discussion', 'Economy', 'Economic progress',
    'Many governments think that economic progress is their most important goal. Some people, however, think that other types of progress are equally important for a country.',
  ],
  [
    't2-robots', 'discussion', 'Technology', 'Robots and the future',
    "Some people think that robots are very important to humans' future development. Others, however, think that robots are a dangerous invention that could have negative effects on society.",
  ],
  [
    't2-species-loss', 'discussion', 'Environment', 'Loss of plant and animal species',
    'Some people say that the main environmental problem of our time is the loss of particular species of plants and animals. Others say that there are more important environmental problems.',
  ],
  [
    't2-local-customs', 'discussion', 'Culture', 'Visitors and local customs',
    'Some people believe that visitors to other countries should follow local customs and behaviour. Others disagree and think that the host country should welcome cultural differences.',
  ],

  // ---------- advantages & disadvantages ----------
  [
    't2-early-languages', 'advantages', 'Education', 'Foreign languages at primary school',
    'Some experts believe that it is better for children to begin learning a foreign language at primary school rather than secondary school.',
  ],
  [
    't2-museum-charges', 'advantages', 'Culture', 'Charging for museum entry',
    'Many museums charge for admission while others are free.',
    'Do you think the advantages of charging people for admission to museums outweigh the disadvantages?',
  ],
  [
    't2-ageing-population', 'advantages', 'Society', 'An ageing population',
    'In many countries, the proportion of older people is steadily increasing.',
    'Does this trend have more positive or negative effects on society?',
  ],

  // ---------- problem & solution ----------
  [
    't2-crime-causes', 'problem-solution', 'Crime', 'Rising crime',
    'In many countries the amount of crime is increasing.',
    'What do you think are the main causes of crime? How can we deal with those causes?',
  ],
  [
    't2-school-behaviour', 'problem-solution', 'Education', 'Student behaviour in schools',
    'In many countries schools have severe problems with student behaviour.',
    'What do you think are the causes of this? What solutions can you suggest?',
  ],

  // ---------- two-part question ----------
  [
    't2-happiness', 'two-part', 'Society', 'Defining happiness',
    'Happiness is considered very important in life.',
    'Why is it difficult to define? What factors are important in achieving happiness?',
  ],
  [
    't2-house-history', 'two-part', 'Culture', 'The history of our homes',
    'In some countries, more and more people are becoming interested in finding out about the history of the house or building they live in.',
    'What are the reasons for this? How can people research this?',
  ],
  [
    't2-technology-relationships', 'two-part', 'Technology', 'Technology and relationships',
    'Nowadays the way many people interact with each other has changed because of technology.',
    'In what ways has technology affected the types of relationships people make? Has this become a positive or negative development?',
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
