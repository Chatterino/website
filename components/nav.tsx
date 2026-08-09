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
    <a href={href} className={"nav-link" + (className ? " " + className : "")}>
      {children}
    </a>
  );
}

function Nav() {
  return (
    <div>
      <nav className="navbar">
        <div className="navbar-inner">
          {/* logo */}
          <a href="/" className="navbar-brand">
            <div>
              <img src="logo.svg" />
              <div>Chatterino</div>
            </div>
          </a>

          <div className="navbar-menu">
            <div className="navbar-links">
              <div className="navbar-links-list">
                <NavLink href="/#features" className="nav-link-features">
                  Features
                </NavLink>
                <NavLink href={wiki}>Wiki</NavLink>
                <NavLink href={tip}>Tip</NavLink>
              </div>
            </div>

            <div className="navbar-download">
              <Button>
                <a href="/#downloads">
                  <Download />
                  <span>Download</span>
                </a>
              </Button>
            </div>

            <a href={discord} className="navbar-icon navbar-icon-discord">
              <Discord />
            </a>
            <a href={github} className="navbar-icon">
              <GitHub />
            </a>
          </div>
        </div>
      </nav>
      <div className="navbar-spacer"></div>
    </div>
  );
}

export default Nav;
