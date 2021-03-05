// @ts-check
import React from "react";
import { Discord, Download, GitHub } from "components/logos";
import { discord, github, tip, wiki } from "links";
import Button from "components/button";

function NavLink({ href, children, ...props }) {
  return (
    <a
      href={href}
      className={(props.className ?? "") + " py-3 px-4 hover:text-blue-400"}
    >
      {children}
    </a>
  );
}

function Nav() {
  return (
    <div>
      <nav
        className="bg-gray-800 fixed w-full flex items-center space-around md:px-12"
        style={{ zIndex: 10, height: 80 }}
      >
        <div
          className="max-w-screen-xl w-full flex justify-between"
          style={{ margin: "0 auto" }}
        >
          {/* logo */}
          <a href="/">
            <div className="flex items-center text-white hover:text-blue-400 p-4 sm:p-6 space-x-4">
              <img src="logo.png" className="w-8 h-8" />
              <div>Chatterino</div>
            </div>
          </a>

          {/* expand button */}
          {/* <div className="block lg:hidden">
            <button className="flex items-center px-3 py-2 border rounded text-teal-200 border-teal-400 hover:text-white hover:border-white">
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
                <NavLink href="#features" className="hidden sm:inline-block">
                  Features
                </NavLink>
                <NavLink href={wiki}>Wiki</NavLink>
                <NavLink href={tip}>Tip</NavLink>
              </div>
            </div>

            <div className="hidden sm:block md:px-16">
              <Button>
                <a href="#downloads">
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
