import { colorsList, colorsObject } from "src/shared/helpers";
import { IconProps } from "src/types";

export default function IconColors(props: {
  selectedIcon: IconProps;
  handleColor: (event: { target: { value: string } }) => void;
}) {
  const { selectedIcon, handleColor } = props;

  return (
    <div className="flex justify-between">
      <h2 className="text-[2rem] font-extrabold">Edit Icon</h2>
      <div className="flex gap-2 justify-center items-center">
        <h2 className="text-[1.2rem] font-extrabold">Color</h2>
        <div className="dropdown dropdown-end">
          <label
            tabIndex={0}
            className="btn btn-ghost btn-circle avatar rounded-[50%] h-[40px] w-[40px] min-h-[40px] p-0"
            style={{
              backgroundColor: `${selectedIcon.color[1]}`,
            }}
          ></label>

          <div
            tabIndex={0}
            className="menu menu-sm dropdown-content p-2 shadow z-[1] bg-base-100 rounded-box w-[280px] grid grid-cols-4 gap-2 justify-center items-center"
          >
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
                    className="invisible h-0 w-0 radio-input"
                    checked={
                      selectedIcon.color[0] === color.toLocaleLowerCase()
                    }
                    onChange={handleColor}
                  />
                  <div
                    style={{ backgroundColor: `${colorsObject[color]}` }}
                    className="rounded-[50%] h-6 w-6 p-0 cursor-pointer"
                  />
                  <span className="text-[0.7rem] font-bold">
                    {color.toUpperCase()}
                  </span>
                </label>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
