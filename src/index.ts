import { getUsernames } from './getUsernames';

export * from './getUsernames';
export * from './removeElementsRandomlyFromArray';
export * from './generateRandomSuggestionsWithNumbers';
export * from './shuffleArray';


console.log(getUsernames({
  names: ['manoel', 'gomes'],
  namePrefix: '@',
}))