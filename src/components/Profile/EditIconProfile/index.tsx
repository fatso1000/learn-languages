import { useState } from "react";
import AnimalComponent from "src/components/Animal";
import { animalsList, colorsList, colorsObject } from "src/shared/helpers";
export default function EditIconProflie(props: {
  defaultNameColor: string;
  defaultAnimalName: string;
}) {
  const { defaultNameColor, defaultAnimalName } = props;

  const [selectedColor, setSelectedColor] = useState<string[]>([
    defaultNameColor,
    colorsObject[defaultNameColor],
  ]);

  const [selectedAnimal, setSelectedAnimal] = useState(defaultAnimalName);

  const handleColor = (event: any) =>
    setSelectedColor([event.target.value, colorsObject[event.target.value]]);

  const handleAnimalChange = (event: any) => {
    setSelectedAnimal(event.target.value);
  };

  return (
    <section className="flex w-full justify-between flex-col">
      <div className="flex justify-between">
        <h2 className="text-[2rem] font-extrabold">Edit Icon</h2>
        <div className="flex gap-2 justify-center items-center">
          <h2 className="text-[1.2rem] font-extrabold">Color</h2>
          <details className="dropdown dropdown-end flex justify-center items-center">
            <summary
              className="rounded-[50%] h-[40px] w-[40px] min-h-[40px] btn p-0"
              style={{
                backgroundColor: `${selectedColor[1]}`,
              }}
            ></summary>

            <div className="p-2 shadow menu dropdown-content z-[1] bg-base-100 rounded-box w-[280px] grid grid-cols-4 gap-2 justify-center items-center">
              {colorsList.map((color) => {
                return (
                  <label
                    key={color}
                    className=" h-12 w-full cursor-pointer flex flex-col items-center justify-center"
                  >
                    <input
                      type="radio"
                      name="color"
                      value={color}
                      className="invisible h-0 w-0 dropdown-border radio-input"
                      checked={selectedColor[0] === color.toLocaleLowerCase()}
                      onChange={handleColor}
                    />
                    <div
                      style={{ backgroundColor: `${colorsObject[color]}` }}
                      className="rounded-[50%] h-6 w-6 p-0 cursor-pointer"
                    />
                    <span className="text-[0.7rem] font-extrabold">
                      {color.toUpperCase()}
                    </span>
                  </label>
                );
              })}
            </div>
          </details>
        </div>
      </div>
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
                className="invisible h-0 w-0 dropdown-border radio-input"
                checked={selectedAnimal === animal.toLocaleLowerCase()}
                onChange={handleAnimalChange}
              />
              <AnimalComponent
                color={selectedColor[0]}
                animalName={animal}
                size="65px"
              />
              <span className="text-[0.7rem] font-extrabold p-2">
                {animal.toUpperCase()}
              </span>
            </label>
          );
        })}
      </div>
    </section>
  );
}
