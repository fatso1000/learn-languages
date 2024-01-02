import React, { useEffect, useState } from "react";
import AnimalComponent from "src/components/Animal";
import { IUser } from "src/types";
import EditProfile from "../EditProfile";
import Image from "next/image";

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

export default function AsideProfile({
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
          <header className="flex flex-col items-center gap-4 p-2">
            <div className="relative">
              <AnimalComponent
                color={currentUser.profile.color}
                animalName={currentUser.profile.animal_name}
                size="6em"
              />
              <Image
                width={100}
                height={100}
                src={currentUser.rank.rank.distintive}
                alt={`distintive from ${currentUser.rank.rank.name} rank`}
                className="absolute top-10 h-[6rem] w-[300px]"
              />
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
