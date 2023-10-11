"use client";
import Animal from "react-animals";

export default function AnimalComponent({
  color,
  animalName,
}: {
  color: string;
  animalName: string;
}) {
  return <Animal color={color} name={animalName} size="2em" />;
}
