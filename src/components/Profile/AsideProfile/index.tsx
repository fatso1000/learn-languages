import React, { useEffect, useState } from "react";
import AnimalComponent from "src/components/Animal";
import { IUser } from "src/types";
import EditProfile from "../EditProfile";
import { useEditMode } from "src/hooks/useEditMenu";

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

export default function AsideProfile(props: { currentUser: IUser }) {
  const { currentUser } = props;
  const { isEditMode, handleEditMode } = useEditMode(props);

  return (
    <aside className="flex flex-col gap-5 w-[30em] h-full bg-base-300 p-[2em]">
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
        <EditProfile user={currentUser} />
      )}
    </aside>
  );
}
