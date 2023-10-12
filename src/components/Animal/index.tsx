"use client";
import Animal from "react-animals";

export default function AnimalComponent({
  color,
  animalName,
  size,
}: {
  color: string;
  animalName: string;
  size: string;
}) {
  return <Animal color={color} name={animalName} size={size} />;
}
