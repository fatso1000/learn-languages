import AnimalComponent from "src/components/Animal";
import { IUser } from "src/types";
import EditProfile from "../Edit";
import { rankFrameColors } from "src/shared/helpers";
import { ClockIcon } from "src/components/Icons";

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
    <aside className="flex flex-col gap-5 w-full h-full px-4 md:px-8 mt-8 flex-1">
      {!isEditMode ? (
        <>
          <header className="flex flex-row gap-4 max-md:flex-col">
            <div
              className="relative rounded-full user-frame md:w-[6.8rem] md:h-[6.8rem] flex items-center justify-center w-[170px] h-auto aspect-square"
              style={{
                backgroundColor: `${
                  rankFrameColors[currentUser.rank.rank_id - 1]
                }`,
              }}
            >
              <div className="absolute rounded-full z-10 h-[150px] w-[150px] md:w-[96px] md:h-[96px]">
                <AnimalComponent
                  color={currentUser.profile.color}
                  animalName={currentUser.profile.animal_name}
                  size="100%"
                />
              </div>
            </div>
            <div className="ml-2 mb-auto">
              <h2 className="text-3xl font-black leading-none">
                {currentUser.name}
              </h2>
              <span className="leading-none text-neutral-400">
                {currentUser.email}
              </span>
              <span className="mt-3 inline-flex w-full gap-2 text-neutral-400 items-center">
                <ClockIcon />
                <span className="text-neutral-800">
                  Cuenta creada en mayo del 2021
                </span>
              </span>
            </div>
          </header>
          <button
            className="btn btn-success font-black w-full"
            onClick={() => handleEditMode()}
          >
            Edit Profile
          </button>
          <div className="divider"></div>
        </>
      ) : (
        <EditProfile
          user={currentUser}
          handleEditIconMode={handleEditIconMode}
          handleEditMode={handleEditMode}
        />
      )}
    </aside>
  );
}
