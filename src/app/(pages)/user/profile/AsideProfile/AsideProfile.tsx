import React, { useState } from "react";
import AnimalComponent from "src/components/Animal";
import { IUser } from "src/types";
import EditProfileComponent from "./EditProfileComponent";

const ButtonComponent = ({
  handleEditMode,
}: {
  handleEditMode: () => void;
}) => (
  <button
    className="btn bg-[#e3d7cf] hover:bg-[#d9c8bc] border-0 w-full"
    onClick={handleEditMode}
  >
    Edit Profile
  </button>
);

export default function AsideProfile(props: { currentUser: IUser }) {
  const { currentUser } = props;

  const [isEditMode, setIsEditMode] = useState(false);

  const handleEditMode = () => setIsEditMode(!isEditMode);

  return (
    <aside className="flex flex-col gap-5 w-[30em] h-[42em] bg-[#E7E2DF] p-[2em] rounded-[1em]">
      {!isEditMode ? (
        <>
          <header className="flex flex-col items-center gap-4 p-2">
            <AnimalComponent
              color={currentUser.profile.color}
              animalName={currentUser.profile.animal_name}
              size="6em"
            />
            <h2 className="text-[1.5em] font-extrabold">{currentUser.name}</h2>
          </header>
          <ul className="flex flex-col justify-between h-full">
            <li className="flex flex-col items-center">
              <span className="font-bold">Email</span> {currentUser.email}
            </li>
            <li className="mt-auto"></li>
          </ul>
          <ButtonComponent handleEditMode={handleEditMode} />
        </>
      ) : (
        <div>
          {/* <EditProfileComponent
            user={currentUser}
            closeEditMode={handleEditMode}
          /> */}
        </div>
      )}
    </aside>
  );
}
