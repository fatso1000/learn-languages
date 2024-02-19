import AnimalComponent from "src/components/Animal";
import { IUser } from "src/types";
import { colorsListObject } from "src/shared/LevelsColors";

export default function Aside({
  currentUser,
  handleEditIconMode,
  handleEditMode,
  isEditMode,
}: {
  currentUser: IUser;
  handleEditIconMode: (stateDefault?: boolean) => void;
  handleEditMode: (stateDefault?: boolean) => void;
  isEditMode: boolean;
}) {
  return (
    <aside
      className={
        `flex flex-col gap-5 w-full h-full px-4 md:px-8 py-8 flex-1` +
        "bg-" +
        currentUser.profile.color
      }
    >
      {!isEditMode ? (
        <>
          <header className="flex flex-row gap-4 max-md:flex-col relative">
            <div className="rounded-full m-auto z-10 h-[150px] w-[150px] md:w-[96px] md:h-[96px]">
              <AnimalComponent
                color={colorsListObject[currentUser.profile.color]}
                animalName={currentUser.profile.animal_name}
                size="100%"
              />
            </div>
          </header>
        </>
      ) : (
        <></>
      )}
    </aside>
  );
}
