import { IColorsObject } from "src/types";
import { colorsListObject } from "./LevelsColors";

function getRandomItemFromArray<T>(array: T[]) {
  const randomIndex = Math.floor(Math.random() * array.length);
  return array[randomIndex];
}

function getRandomAnimalName() {
  return getRandomItemFromArray<string>(animalsList).toLowerCase();
}

function getRandomColor() {
  return getRandomItemFromArray<string>(Object.keys(colorsListObject));
}

function areArraysEqual(arr1: any[], arr2: any[]) {
  if (arr1.length !== arr2.length) {
    return false;
  }

  for (let i = 0; i < arr1.length; i++) {
    if (arr1[i] !== arr2[i]) {
      return false;
    }
  }

  return true;
}

function areArraysEqualUnordered(arr1: any[], arr2: any[]) {
  if (arr1.length !== arr2.length) {
    return false;
  }

  const sortedArr1 = arr1.slice().sort();
  const sortedArr2 = arr2.slice().sort();

  for (let i = 0; i < sortedArr1.length; i++) {
    if (sortedArr1[i] !== sortedArr2[i]) {
      return false;
    }
  }

  return true;
}

function parseTimeLevelCompleted(inputTime: string) {
  // Split the input string into minutes and seconds
  const [minutes, seconds] = inputTime.split(":").map(Number);

  // Use conditional (ternary) operators to ensure leading zeros
  const formattedMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;
  const formattedSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;

  // Return the formatted time
  return `${formattedMinutes}:${formattedSeconds}`;
}

const animalsList = [
  "Alligator",
  "Anteater",
  "Armadillo",
  "Axolotl",
  "Badger",
  "Bat",
  "Beaver",
  "Buffalo",
  "Camel",
  "Capybara",
  "Chameleon",
  "Cheetah",
  "Chinchilla",
  "Chipmunk",
  "Chupacabra", // Mythical creature
  "Cormorant",
  "Coyote",
  "Crow",
  "Dingo",
  "Dinosaur", // Not an extant animal, but can be included for educational purposes
  "Duck",
  "Elephant",
  "Ferret",
  "Fox",
  "Frog",
  "Giraffe",
  "Gopher",
  "Grizzly",
  "Hedgehog",
  "Hippo",
  "Hyena",
  "Ibex",
  "Ifrit", // Mythical creature
  "Iguana",
  "Jackal",
  "Kangaroo",
  "Koala",
  "Kraken", // Mythical creature
  "Leopard",
  "Lemur",
  "Liger", // Hybrid animal
  "Manatee",
  "Mink",
  "Monkey",
  "Moose",
  "Narwhal",
  "Orangutan",
  "Otter",
  "Panda",
  "Penguin",
  "Platypus",
  "Pumpkin", // Not technically an animal, but can be included for fun
  "Python",
  "Quagga", // Extinct animal, but can be included for educational purposes
  "Rabbit",
  "Raccoon",
  "Rhino",
  "Sheep",
  "Shrew",
  "Skunk",
  "Squirrel",
  "Tiger",
  "Turtle",
  "Walrus",
  "Wolf",
  "Wolverine",
  "Wombat",
];

const colorsList = [
  "#FF5861",
  "#FFBE00",
  "#00A96E",
  "#00B5FF",
  "#6D0076",
  "#41ACBA",
  "#DBBBFF",
];

const languagesList = [
  "english",
  "spanish",
  "italian",
  "japanese",
  "german",
  "french",
];

const MAX_EXPERIENCE = 250;

const colorsObject: IColorsObject = {
  "#FF5861": "red",
  "#00B5FF": "blue",
  "#FFBE00": "yellow",
  "#6D0076": "purple",
  "#41ACBA": "teal",
  "#00A96E": "green",
  "#DBBBFF": "lavander",
};

const rankFrameColors = [
  "#5F544E",
  "#816F40",
  "#878684",
  "#D0A940",
  "#7EC9C9",
  "#49D983",
  "#6EA5D8",
];

export {
  getRandomAnimalName,
  animalsList,
  getRandomItemFromArray,
  colorsList,
  getRandomColor,
  colorsObject,
  languagesList,
  MAX_EXPERIENCE,
  rankFrameColors,
  areArraysEqual,
  areArraysEqualUnordered,
  parseTimeLevelCompleted,
};
