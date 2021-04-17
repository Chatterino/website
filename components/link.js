// @ts-check
import React from "react";

/**
 * @param {{ href: string; className?: string; children: boolean | React.ReactChild | React.ReactFragment | React.ReactPortal; }} params
 */
function Link(params) {
  return (
    <a href={params.href} className={"underline " + (params.className ?? "")}>
      {params.children}
    </a>
  );
}

export default Link;
