import { addNameWithPrefixOrSuffix } from './addNameWithPrefixOrSuffix';
import { SuggestNameDto } from './dtos/suggestName.dto';
import { generateRandomSuggestionsWithNumbers } from './generateRandomSuggestionsWithNumbers';
import { removeElementsRandomlyFromArray } from './removeElementsRandomlyFromArray';
import { shuffleArray } from './shuffleArray';
import { splitStringInTwo } from './splitStringInTwo';

export const getUsernames = ({
  names: _names = [],
  symbols = ['_', '.'],
  suggestionLimit = 20,
  shuffleSuggestions = false,
  namePrefix,
}: SuggestNameDto) => {
  let names = _names;
  let elementsNumber = names.length;

  if(elementsNumber == 0) return [];

  if(elementsNumber === 1) {
    const uniqueName = names[0];
    names = splitStringInTwo(uniqueName);
    elementsNumber = names.length
  }

  // Number of combinations using only name elements
  const combinationsNumber = elementsNumber * (elementsNumber - 1);
  // Number of combinations using name elements with symbols elements
  const combinationsMax = combinationsNumber * symbols.length;
  // Number of elements to force new generations or remove elements generated to satisfy of suggestionLimit parameter
  // The value can negative (to remove elements) or positive (to add new elements)
  const forceRandomGenerations = combinationsMax - suggestionLimit;
  // Variable to control loop
  const iterationsMax = elementsNumber - 1;
  // For each iteration of loop, can generate new elements
  const forceRandomGenerationsPerIteration = Math.floor(
    Math.abs(forceRandomGenerations) / (iterationsMax || 1)
  );

  // * if Math.abs(forceRandomGenerations) / (iterationsMax || 1) is float,
  // * is not int, should be get difference to satisfy the suggestionLimit parameter
  const restRandomGenerations =
    Math.abs(forceRandomGenerations) -
    forceRandomGenerationsPerIteration * (iterationsMax || 1);

  let arrayResults: string[] = [];

  let idx = 0;
  while (idx < iterationsMax) {
    const iterableElementsRight = names.slice(idx + 1, elementsNumber);
    const iterableElements = iterableElementsRight;

    let iterations = iterableElements
      .map((name) => {
        const arrangements = symbols.map((symbol) => [
          `${names[idx]}${symbol}${name}`,
          `${name}${symbol}${names[idx]}`,
        ]);
        return arrangements.flat();
      })
      .flat();

    // Adding new elements per iteration
    if (forceRandomGenerations < 0) {
      const length =
        idx === 0
          ? restRandomGenerations + forceRandomGenerationsPerIteration
          : forceRandomGenerationsPerIteration;

      const randomSuggestions = generateRandomSuggestionsWithNumbers({
        quantity: length,
        domain: iterations,
      });
      iterations = iterations.concat(randomSuggestions);
    }

    arrayResults = arrayResults.concat(iterations.flat());
    idx += 1;
  }

  // Remove elements to satisfy suggestionLimit parameter
  if (forceRandomGenerations > 0) {
    arrayResults = removeElementsRandomlyFromArray(
      arrayResults,
      Math.abs(forceRandomGenerations)
    );
  }

  arrayResults = arrayResults.map((name) =>
    addNameWithPrefixOrSuffix({
      name,
      prefix: namePrefix,
    })
  );

  if (shuffleSuggestions) return shuffleArray(arrayResults);

  return arrayResults;
};
