"use client";

import { useEffect, useState } from "react";
import AnimalComponent from "src/components/Animal";
import { getCurrentUser } from "src/shared/cookies";
import { IUser } from "src/types";

const EditProfileComponent = ({
  user,
  closeEditMode,
}: {
  user: IUser;
  closeEditMode: () => void;
}) => {
  return (
    <div className="flex flex-col gap-5 w-[30em] h-[42em] bg-[#E7E2DF] p-[2em] rounded-[1em] ">
      <form action="" className="flex flex-col h-full">
        <div className="flex flex-col items-center gap-4 p-2">
          <div className="relative">
            <AnimalComponent
              color={user.profile.color}
              animalName={user.profile.animal_name}
              size="6em"
            />
            <button className="w-8 h-8 bg-[#ffffff] absolute right-0 bottom-0 rounded-[2rem] flex items-center justify-center">
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                <path d="M21.731 2.269a2.625 2.625 0 00-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 000-3.712zM19.513 8.199l-3.712-3.712-8.4 8.4a5.25 5.25 0 00-1.32 2.214l-.8 2.685a.75.75 0 00.933.933l2.685-.8a5.25 5.25 0 002.214-1.32l8.4-8.4z" />
                <path d="M5.25 5.25a3 3 0 00-3 3v10.5a3 3 0 003 3h10.5a3 3 0 003-3V13.5a.75.75 0 00-1.5 0v5.25a1.5 1.5 0 01-1.5 1.5H5.25a1.5 1.5 0 01-1.5-1.5V8.25a1.5 1.5 0 011.5-1.5h5.25a.75.75 0 000-1.5H5.25z" />
              </svg>
            </button>
          </div>
        </div>
        <div className="h-full overflow-y-auto">
          <div className="flex flex-col gap-2 p-2">
            <div>
              <label className="label font-bold p-0">
                Name
                <input
                  type="text"
                  defaultValue={user.name}
                  className="input w-full max-w-xs input-primary h-6"
                />
              </label>
            </div>
            <div>
              <label className="label font-bold p-0">Bio</label>
              <textarea
                className="textarea textarea-primary min-h-[6em] w-full h-6 "
                maxLength={45}
              />
            </div>
            <div>
              <label className="label font-bold p-0">Ubication</label>
              <input
                type="text"
                className="input w-full max-w-xs input-primary h-6"
              />
            </div>
            <div>
              <label className="label font-bold p-0">Email</label>
              <input
                type="email"
                defaultValue={user.email}
                className="input w-full max-w-xs input-primary h-6"
              />
            </div>
            <div>
              <label className="label font-bold p-0">Password</label>
              <input
                type="password"
                className="input w-full max-w-xs input-primary h-6"
              />
            </div>
            <div>
              <label className="label font-bold p-0">Password</label>
              <input
                type="password"
                className="input w-full max-w-xs input-primary h-6"
              />
            </div>
          </div>
        </div>

        <ul className="flex flex-col justify-between ">
          <li className="flex flex-col items-center"></li>
          <li className="mt-auto">
            <ul className="flex flex-col gap-2">
              <li className="flex flex-col items-center w-full">
                <div className="flex gap-2 w-full">
                  <button
                    className="btn bg-[#e3d7cf] hover:bg-[#d9c8bc] border-0 w-[50%]"
                    onClick={closeEditMode}
                  >
                    Cancel
                  </button>
                  <button
                    className="btn bg-[#a2d5cf] hover:bg-[#80bdb6] border-0 w-[50%]"
                    onClick={closeEditMode}
                  >
                    Save
                  </button>
                </div>
              </li>
              {/* <li className="flex flex-col items-center">
                  <button className="btn btn-error hover:bg-[#f65c5c] w-[90%] text-neutral-50 border-0">
                    Delete Account
                  </button>
                </li> */}
            </ul>
          </li>
        </ul>
      </form>
    </div>
  );
};

export default function UserProfile() {
  const [currentUser, setCurrentUser] = useState<IUser>();
  const [isEditMode, setIsEditMode] = useState(false);

  const handleEditMode = () => setIsEditMode(!isEditMode);

  const checkUser = async () => {
    const user = await getCurrentUser();
    if (user) setCurrentUser(JSON.parse(user.value));
  };

  useEffect(() => {
    checkUser();
  }, []);

  if (currentUser && currentUser.profile)
    return (
      <div className="flex bg-[#f0edea] rounded-[1em] mx-[10em] my-[2em]">
        {!isEditMode ? (
          <div className="flex flex-col gap-5 w-[30em] h-[42em] bg-[#E7E2DF] p-[2em] rounded-[1em] ">
            <div className="flex flex-col items-center gap-4 p-2">
              <div className="relative">
                <AnimalComponent
                  color={currentUser.profile.color}
                  animalName={currentUser.profile.animal_name}
                  size="6em"
                />
                {isEditMode && (
                  <button className="w-8 h-8 bg-[#ffffff] absolute right-0 bottom-0 rounded-[2rem] flex items-center justify-center">
                    ⚙️
                  </button>
                )}
              </div>
              <div className="relative">
                <h1 className="text-[1.5em] font-extrabold">
                  {currentUser.name}
                </h1>
              </div>
            </div>
            <ul className="flex flex-col justify-between h-full">
              <li className="flex flex-col items-center">
                <span className="font-bold">Email</span> {currentUser.email}
              </li>
              <li className="mt-auto">
                <ul className="flex flex-col gap-2">
                  <li className="flex flex-col items-center w-full">
                    {!isEditMode ? (
                      <button
                        className="btn bg-[#e3d7cf] hover:bg-[#d9c8bc] border-0 w-[90%]"
                        onClick={handleEditMode}
                      >
                        Edit Profile
                      </button>
                    ) : (
                      <div className="flex gap-2 w-full">
                        <button
                          className="btn bg-[#e3d7cf] hover:bg-[#d9c8bc] border-0 w-[50%]"
                          onClick={handleEditMode}
                        >
                          Cancel
                        </button>
                        <button
                          className="btn bg-[#a2d5cf] hover:bg-[#80bdb6] border-0 w-[50%]"
                          onClick={handleEditMode}
                        >
                          Save
                        </button>
                      </div>
                    )}
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        ) : (
          currentUser && (
            <EditProfileComponent
              user={currentUser}
              closeEditMode={handleEditMode}
            />
          )
        )}
        <div className="w-full p-[3em]">
          <h2 className="text-[2rem] font-extrabold">Languages</h2>
        </div>
      </div>
    );
  return <div className="w-[10em] h-[10em]">User not found</div>;
}
