import AnimalComponent from "src/components/Animal";
import { IUser } from "src/types";
import EditProfile from "../Edit";
import { rankFrameColors } from "src/shared/helpers";

const ButtonComponent = ({
  handleEditMode,
}: {
  handleEditMode: () => void;
}) => (
  <button
    className="btn btn-info hover:brightness-95 w-full"
    onClick={handleEditMode}
  >
    Edit Profile
  </button>
);

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
    <aside className="flex flex-col gap-5 w-[30em] h-full bg-base-300 p-[2em]">
      {!isEditMode ? (
        <>
          <header className="flex flex-col items-center gap-4">
            <div
              className="relative rounded-full user-frame w-[6.8rem] h-[6.8rem] flex items-center justify-center"
              style={{
                aspectRatio: 1,
                backgroundColor: `${
                  rankFrameColors[currentUser.rank.rank_id - 1]
                }`,
              }}
            >
              <div
                style={{
                  height: 96,
                  width: 96,
                }}
                className="absolute rounded-full z-10"
              >
                <AnimalComponent
                  color={currentUser.profile.color}
                  animalName={currentUser.profile.animal_name}
                  size="6rem"
                />
              </div>
            </div>
            <h2 className="text-[1.5em] font-extrabold">{currentUser.name}</h2>
          </header>
          <ul className="flex flex-col h-full gap-5">
            <li className="flex flex-col">
              <span className="font-bold">Email</span> {currentUser.email}
            </li>
            {currentUser.biography && (
              <li className="flex flex-col">
                <span className="font-bold">Biography</span>
                {currentUser.biography}
              </li>
            )}
            {currentUser.ubication && (
              <li className="flex flex-col">
                <span className="font-bold">Ubication</span>
                {currentUser.ubication}
              </li>
            )}
          </ul>
          <ButtonComponent handleEditMode={handleEditMode} />
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
