export function generateRoomId(): string {
  let result = '';
  const idLength = 7;
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;

  for (let i = 0; i < idLength; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }

  return result;
}

export function isStringEmpty(value: string): boolean {
  return value.replace(/\s/g, '').length === 0
}

export function getRandomElementFromArray<T>(array: T[]): T {
  const index = Math.floor(Math.random() * array.length);

  return array[index];
}

export function shuffleArray<T>(unshuffledArray: T[]): T[] {
  return unshuffledArray
    .map(value => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value)
}