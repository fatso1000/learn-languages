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

const colorsList = ["red", "orange", "yellow", "green", "purple", "teal"];

export {
  getRandomAnimalName,
  animalsList,
  getRandomItemFromArray,
  colorsList,
  getRandomColor,
};
