export function isStringEmpty(value: string): boolean {
  return value.replace(/\s/g, '').length === 0;
}

export function getRandomElementFromArray<T>(array: T[]): T {
  const index = Math.floor(Math.random() * array.length);

  return array[index];
}

export function shuffleArray<T>(unshuffledArray: T[]): T[] {
  return unshuffledArray
    .map((value) => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value);
}

export function sortById<T extends { id: string }>(array: T[], sortedIds: string[]): T[] {
  return [...array].sort((a, b) => sortedIds.indexOf(a.id) - sortedIds.indexOf(b.id));
}
