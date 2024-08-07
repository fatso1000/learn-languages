import { useState } from "react";
import IconColors from "../IconColors";
import IconAnimals from "../IconAnimals";
import { IconProps } from "src/types";

export default function EditIconComponent(props: {
  defaultNameColor: string;
  defaultAnimalName: string;
}) {
  const { defaultNameColor, defaultAnimalName } = props;

  const [selectedIcon, setSelectedIcon] = useState<IconProps>({
    animal: defaultAnimalName,
    color: defaultNameColor,
  });

  const handleColor = (event: { target: { value: string } }) => {
    setSelectedIcon({
      ...selectedIcon,
      color: event.target.value,
    });
  };

  const handleAnimal = (event: { target: { value: string } }) => {
    setSelectedIcon({
      ...selectedIcon,
      animal: event.target.value,
    });
  };

  return (
    <section className="flex w-full justify-between flex-col h-full overflow-y-auto overflow-x-hidden">
      <div className="divider"></div>
      <IconColors selectedIcon={selectedIcon} handleColor={handleColor} />
      <IconAnimals selectedIcon={selectedIcon} handleAnimal={handleAnimal} />
    </section>
  );
}
