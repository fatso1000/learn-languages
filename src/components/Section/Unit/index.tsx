import Level from "../Level";

export default function Unit(props: any) {
  const { section, unit } = props;

  return (
    <div className={`flex flex-col items-center justify-center rounded`}>
      <div className="bg-success w-11/12 rounded text-success-content p-3">
        <h3 className="font-bold text-2xl">{unit.title}</h3>
        <p className="text-lg">{unit.description}</p>
      </div>
      <div className="grid grid-cols-3 gap-5 p-5 w-4/5 sm:w-3/5 z-20 justify-items-center relative">
        {unit.levels.map((level: any, i: number) => (
          <Level key={level.id} section={section} row={i} state={"completed"} />
        ))}
        <Level section={section} row={1} state={"completed"} />
        <Level section={section} row={2} state={"studying"} />
        <Level section={section} row={3} state={"first-blocked"} />
        <Level section={section} row={4} state={"blocked"} />
        <Level section={section} row={5} state={"blocked"} />
        <Level section={section} row={6} state={"blocked"} />
        <Level section={section} row={7} state={"blocked"} />
      </div>
    </div>
  );
}
