export class SuggestNameDto {
  names!: string[];
  symbols?: string[];
  suggestionLimit?: number;
  shuffleSuggestions?: boolean;
}