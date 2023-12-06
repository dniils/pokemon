import router from '../router';
import { replaceSpacesWithHyphens } from './replaceSpacesWithHyphens';

export function goToEnteredPokemon(searchTerm: string): void {
  const processedSearchTerm = replaceSpacesWithHyphens(
    searchTerm.trim().toLowerCase()
  );
  if (processedSearchTerm) {
    router.push(`/pokemon/${processedSearchTerm}`);
  }
}
