import { colorsListObject } from "src/shared/LevelsColors";
import { IconProps } from "src/types";

export default function IconColors(props: {
  selectedIcon: IconProps;
  handleColor: (event: { target: { value: string } }) => void;
}) {
  const { selectedIcon, handleColor } = props;

  return (
    <div className="flex justify-between mt-8">
      <h2 className="text-3xl font-black leading-[2]">Edit Icon</h2>
      <div className="flex gap-2 justify-center items-center">
        <h2 className="text-3xl font-black leading-none">Color</h2>
        <div className="dropdown dropdown-end">
          <label
            tabIndex={0}
            className={`cursor-pointer avatar rounded-full w-9 h-9 block p-0 bg-${selectedIcon.color}`}
          ></label>

          <div
            tabIndex={0}
            className="menu menu-sm dropdown-content p-2 shadow z-[1] bg-base-100 rounded-box w-[280px] grid grid-cols-4 gap-2 justify-center items-center"
          >
            {Object.keys(colorsListObject).map((color) => (
              <label
                key={color}
                className="h-12 w-full cursor-pointer flex flex-col items-center justify-center"
              >
                <input
                  type="radio"
                  name="color"
                  value={color}
                  className="invisible h-0 w-0 radio-input color-select"
                  checked={selectedIcon.color === color}
                  onChange={handleColor}
                />
                <div
                  className={`rounded-[50%] h-6 w-6 p-0 cursor-pointer bg-${color}`}
                />
              </label>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
