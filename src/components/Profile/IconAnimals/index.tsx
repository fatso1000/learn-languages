import AnimalComponent from "src/components/Animal";
import { colorsListObject, type PredefinedKeys } from "src/shared/LevelsColors";
import { animalsList } from "src/shared/helpers";
import { IconProps } from "src/types";

export default function IconAnimals(props: {
  selectedIcon: IconProps;
  handleAnimal: (event: { target: { value: string } }) => void;
}) {
  const { selectedIcon, handleAnimal } = props;
  return (
    <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 w-full justify-items-center overflow-y-scroll max-h-[90svh] my-5 border-2 p-4 rounded-md">
      {animalsList.map((animal: string) => {
        return (
          <label
            className="p-2 cursor-pointer flex flex-col items-center justify-center"
            key={animal}
          >
            <input
              type="radio"
              name="animal"
              value={animal.toLocaleLowerCase()}
              className="invisible h-0 w-0 [&+div]:checked:border-base-content [&+div+span]:checked:font-extrabold"
              checked={selectedIcon.animal === animal.toLocaleLowerCase()}
              onChange={handleAnimal}
            />
            <div className="border-4 border-transparent rounded-full">
              <AnimalComponent
                color={colorsListObject[selectedIcon.color as PredefinedKeys]}
                animalName={animal}
                size="65px"
              />
            </div>
            <span className="text-[0.7rem] font-bold p-2">
              {animal.toUpperCase()}
            </span>
          </label>
        );
      })}
    </div>
  );
}
