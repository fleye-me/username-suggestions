import { GenerateRandomSuggestionsWithNumbersDto } from "./dtos/generateRandomSuggestionsWithNumbers.dto";

export const generateRandomSuggestionsWithNumbers = ({ quantity, domain }: GenerateRandomSuggestionsWithNumbersDto) => {
  const randomSuggestions = Array.from({ length: quantity }, (_, i) => {
    const numberRandom = Math.floor(Math.random() * 100);
    const randomItemFromDomain =
      domain[Math.floor(Math.random() * domain.length)];
    // 0 - Left
    // 1 - Right
    const randomPosition = Math.floor(Math.random() * 2);
    const left = 0;
    const multiplyRandomNumber = Math.ceil(Math.random() * (i + 2)) * numberRandom;

    if (left === randomPosition) {
      return `${multiplyRandomNumber}${randomItemFromDomain}`;
    }

    return `${randomItemFromDomain}${multiplyRandomNumber}`;
  });

  return randomSuggestions
}