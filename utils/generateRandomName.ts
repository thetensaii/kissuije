import { name1, name2 } from "./constants";

function capFirst(string: string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function getRandomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min)) + min;
}

export default function generateRandomName() {
  const name = capFirst(name1[getRandomInt(0, name1.length + 1)]) + capFirst(name2[getRandomInt(0, name2.length + 1)]);
  return name;
}