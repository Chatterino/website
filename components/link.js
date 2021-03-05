// @ts-check
import React from "react";

function Link({ href, children }) {
  return (
    <a href={href} className="underline">
      {children}
    </a>
  );
}

export default Link;
