// "use client";
import Link from "next/link";
// import { AiOutlineUser } from "react-icons/ai";
import { isUserLoggedIn } from "src/shared/cookies";

export default async function Navbar() {
  const isLoggedIn = await isUserLoggedIn();
  console.log(isLoggedIn);

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
            <div className="w-10 rounded-full">
              <img src="https://cdn-icons-png.flaticon.com/512/1946/1946429.png" />
            </div>
          </label>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
          >
            <li>
              <a className="justify-between">
                Profile
                <span className="badge">New</span>
              </a>
            </li>
            <li>
              <a>Settings</a>
            </li>
            <li>
              <a>Logout</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
