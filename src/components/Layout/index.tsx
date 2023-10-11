import Navbar from "../Navbar";
import Link from "next/link";

export default function LayoutComponent(props: any) {
  return (
    <div className="mx-auto bg-base-100 drawer">
      <input id="drawer" type="checkbox" className="drawer-toggle"></input>
      <div className="drawer-content">
        <Navbar props={props} />
        <div>
          {props.children}
          <footer className="flex flex-row gap-x-7 mb-2 p-2">
            <div>
              <h3 className="text-lg font-extrabold tracking-tight">Links</h3>
              <ul className="text-stone-400">
                <li>
                  <Link href="/">Home</Link>
                </li>
                <li>
                  <Link href="/tags">Search by Tag</Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-extrabold tracking-tight">Socials</h3>
              <ul className="text-stone-400">
                <li>
                  <a
                    href="https://www.linkedin.com/in/matias-benitez81/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    LinkedIn
                  </a>
                </li>
                <li>
                  <a
                    href="mailto:agustinbenitez81@gmail.com"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Email
                  </a>
                </li>
                <li>
                  <a
                    href="https://github.com/fatso1000"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Github
                  </a>
                </li>
              </ul>
            </div>
          </footer>
        </div>
      </div>
      <div className="drawer-side z-40"></div>
    </div>
  );
}
