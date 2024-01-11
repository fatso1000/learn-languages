import AnimalComponent from "src/components/Animal";
import { animalsList } from "src/shared/helpers";
import { IconProps } from "src/types";

export default function IconAnimals(props: {
  selectedIcon: IconProps;
  handleAnimal: (event: { target: { value: string } }) => void;
}) {
  const { selectedIcon, handleAnimal } = props;
  return (
    <div className="grid grid-cols-4 w-full justify-items-center overflow-y-scroll mt-5">
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
              className="invisible h-0 w-0 radio-input"
              checked={selectedIcon.animal === animal.toLocaleLowerCase()}
              onChange={handleAnimal}
            />
            <AnimalComponent
              color={selectedIcon.color[0]}
              animalName={animal}
              size="65px"
            />
            <span className="text-[0.7rem] font-bold p-2">
              {animal.toUpperCase()}
            </span>
          </label>
        );
      })}
    </div>
  );
}
