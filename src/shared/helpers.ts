import { IColorsObject } from "src/types";

function getRandomItemFromArray<T>(array: T[]) {
  const randomIndex = Math.floor(Math.random() * array.length);
  return array[randomIndex];
}

function getRandomAnimalName() {
  return getRandomItemFromArray<string>(animalsList).toLowerCase();
}

function getRandomColor() {
  return getRandomItemFromArray<string>(colorsList);
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
  "red",
  "blue",
  "orange",
  "yellow",
  "green",
  "purple",
  "teal",
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
  red: "#FF0044",
  blue: "#006CFE",
  yellow: "#FFCC41",
  purple: "#B476FB",
  orange: "#FE9D24",
  green: "#29B278",
  teal: "#00D7BF",
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
};
