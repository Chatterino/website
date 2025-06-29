import React, { ReactNode } from "react";
import { Discord, Download, GitHub } from "./logos";
import { discord, github, tip, wiki } from "../links";
import Button from "./button";

type Props = {
  href: string;
  className?: string;
  children?: ReactNode;
};

function NavLink({ href, children, className }: Props) {
  return (
    <a
      href={href}
      className={
        (className ?? "") + " py-3 px-4 hover:text-blue-400 no-underline"
      }
    >
      {children}
    </a>
  );
}

function Nav() {
  return (
    <div>
      <nav
        className="bg-gray-800 fixed w-full flex items-center space-around lg:px-12"
        style={{ zIndex: 10, height: 80 }}
      >
        <div
          className="max-w-320 w-full flex justify-between"
          style={{ margin: "0 auto" }}
        >
          {/* logo */}
          <a href="/" className="no-underline">
            <div className="flex items-center text-white hover:text-blue-400 p-4 sm:p-6 space-x-4 sm:pr-0">
              <img src="logo.svg" className="w-8 h-8" />
              <div>Chatterino</div>
            </div>
          </a>

          {/* expand button */}
          {/* <div className="block lg:hidden">
            <button className="flex items-center px-3 py-2 border rounded-sm text-teal-200 border-teal-400 hover:text-white hover:border-white">
              <svg
                className="fill-current h-3 w-3"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <title>Menu</title>
                <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
              </svg>
            </button>
          </div> */}

          {/* <div className="text-gray-300 w-full block md:flex md:items-center md:w-auto"> */}
          <div className="flex items-center px-3 md:px-6">
            <div className="text-gray-300 flex items-center w-auto">
              <div className="text-sm">
                <NavLink href="/#features" className="hidden sm:inline-block">
                  Features
                </NavLink>
                <NavLink href={wiki}>Wiki</NavLink>
                <NavLink href={tip}>Tip</NavLink>
              </div>
            </div>

            <div className="hidden sm:block lg:px-16">
              <Button>
                <a href="/#downloads" className="no-underline">
                  <Download />
                  <span>Download</span>
                </a>
              </Button>
            </div>

            <a
              href={discord}
              className="mr-4 transform scale-75 hover:text-blue-400"
            >
              <Discord />
            </a>
            <a href={github} className="hover:text-blue-400">
              <GitHub />
            </a>
          </div>
        </div>
        {/* </div> */}
      </nav>
      <div style={{ height: 80 }}></div>
    </div>
  );
}

export default Nav;
