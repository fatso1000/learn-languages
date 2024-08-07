import { UnitProps } from "src/types";
import { Level } from "..";

const colors = {
  primary: {
    base: "bg-primary text-primary-content",
  },
  secondary: {
    base: "bg-secondary text-secondary-content",
  },
  accent: {
    base: "bg-accent text-accent-content",
  },
  success: {
    base: "bg-success text-success-content",
  },
  info: {
    base: "bg-info text-info-content",
  },
  error: {
    base: "bg-error text-error-content",
  },
};

export default async function UnitComponent(props: UnitProps) {
  const { sectionId, unit, color, lives } = props;

  return (
    <div className={`flex flex-col items-center justify-center rounded`}>
      <div className={`${colors[color].base} w-full md:rounded p-3`}>
        <h3 className="font-bold text-2xl">{unit.title}</h3>
        <p className="text-lg">{unit.description}</p>
      </div>
      <div className="grid grid-cols-3 gap-5 p-5 z-20 justify-items-center relative">
        {unit.levels.map((level, i) => (
          <Level
            lives={lives}
            key={level.id}
            sectionId={sectionId}
            row={i}
            level={level}
            unitId={unit.id}
            state={level.state}
            color={color}
          />
        ))}
      </div>
    </div>
  );
}
