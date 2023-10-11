"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { logoutUserAction } from "src/app/actions";
import { getCurrentUser, isUserLoggedIn } from "src/shared/cookies";
import { IUser } from "src/types";
import AnimalComponent from "../Animal";

const ProfilePic = () => (
  <svg
    stroke="currentColor"
    fill="currentColor"
    stroke-width="0"
    viewBox="0 0 512 512"
    height="2em"
    width="2em"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M332.64 64.58C313.18 43.57 286 32 256 32c-30.16 0-57.43 11.5-76.8 32.38-19.58 21.11-29.12 49.8-26.88 80.78C156.76 206.28 203.27 256 256 256s99.16-49.71 103.67-110.82c2.27-30.7-7.33-59.33-27.03-80.6zM432 480H80a31 31 0 01-24.2-11.13c-6.5-7.77-9.12-18.38-7.18-29.11C57.06 392.94 83.4 353.61 124.8 326c36.78-24.51 83.37-38 131.2-38s94.42 13.5 131.2 38c41.4 27.6 67.74 66.93 76.18 113.75 1.94 10.73-.68 21.34-7.18 29.11A31 31 0 01432 480z"></path>
  </svg>
);

export default function Navbar(props: any) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState<IUser>();
  const router = useRouter();

  const checkUserLoggedIn = async () => {
    const isLoggedIn = await isUserLoggedIn();
    const user = await getCurrentUser();
    setIsLoggedIn(isLoggedIn);
    if (user) setCurrentUser(JSON.parse(user.value));
  };

  useEffect(() => {
    checkUserLoggedIn();
  }, [props]);

  return (
    <nav className="navbar bg-base-100 px-4 sm:px-4 md:px-16 mt-2 bg-opacity-90 text-base-content h-16 backdrop-blur transition-all duration-100 shadow-sm">
      <div className="flex-1">
        <Link className="btn btn-ghost normal-case text-xl" href="/">
          E-LEARN
        </Link>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal px-1">
          <li>
            <Link href={"/reading"}>Reading</Link>
          </li>
          <li>
            <Link href={"/listening"}>Listening</Link>
          </li>
          <li>
            <Link href={"/exercises"}>Exercises</Link>
          </li>
        </ul>
        <div className="dropdown dropdown-end">
          <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
            <div className="w-10 rounded-full !flex flex-col items-center justify-center">
              {isLoggedIn && currentUser && currentUser.profile ? (
                <AnimalComponent
                  color={currentUser.profile.color}
                  animalName={currentUser.profile.animal_name}
                />
              ) : (
                <ProfilePic />
              )}
            </div>
          </label>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
          >
            {isLoggedIn ? (
              <>
                <li>
                  <Link href="/user/profile">Profile</Link>
                </li>
                <li>
                  <Link href="/user/settings">Settings</Link>
                </li>
                <li>
                  <form
                    action={async () => {
                      await logoutUserAction();
                      toast("User logged out successfully.", {
                        type: "info",
                      });
                      router.push("/");
                    }}
                  >
                    <button type="submit">Logout</button>
                  </form>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link href="/auth/signup">Sign Up</Link>
                </li>
                <li>
                  <Link href="/auth/signin">Log In</Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}
