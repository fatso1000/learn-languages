export default function Navbar() {
  return (
    <nav className="navbar bg-base-100 px-4 sm:px-4 md:px-16 mt-2 bg-opacity-90 text-base-content h-16 backdrop-blur transition-all duration-100 shadow-sm">
      <div className="flex-1">
        <a className="btn btn-ghost normal-case text-xl">E-LEARN</a>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal px-1">
          <li>
            <a>Reading</a>
          </li>
          <li>
            <a>Listening</a>
          </li>
          <li>
            <a>Exercises</a>
          </li>
        </ul>
        <div className="dropdown dropdown-end">
          <label className="btn btn-ghost btn-circle avatar">
            <div className="w-10 rounded-full">
              <img src="/images/stock/photo-1534528741775-53994a69daeb.jpg" />
            </div>
          </label>
          <ul className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
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
