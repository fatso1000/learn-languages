import { UnitProps } from "src/types";
import { Level } from "..";

export default function UnitComponent(props: UnitProps) {
  const { sectionId, unit } = props;

  return (
    <div className={`flex flex-col items-center justify-center rounded`}>
      <div className="bg-success w-full md:rounded text-success-content p-3">
        <h3 className="font-bold text-2xl">{unit.title}</h3>
        <p className="text-lg">{unit.description}</p>
      </div>
      <div className="grid grid-cols-3 gap-5 p-5 w-4/5 sm:w-3/5 z-20 justify-items-center relative">
        {unit.levels.map((level, i) => (
          <Level
            key={level.id}
            sectionId={sectionId}
            row={i}
            level={level}
            unitId={unit.id}
            state={level.state}
          />
        ))}
      </div>
    </div>
  );
}
