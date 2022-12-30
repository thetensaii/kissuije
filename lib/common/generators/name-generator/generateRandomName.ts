import { names1, names2 } from './names';

function capFirst(string: string): string {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function getRandomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min)) + min;
}

export function generateRandomName(): string {
  const name =
    capFirst(names1[getRandomInt(0, names1.length + 1)]) + capFirst(names2[getRandomInt(0, names2.length + 1)]);
  return name;
}
