// @ts-check

import React from "react";

function Button(props) {
  return (
    <button
      className={
        (props.className ?? "") +
        " " +
        (props.colorsClassName ?? "text-white bg-blue-500 hover:bg-blue-400") +
        " m-3 py-2 px-4 rounded cursor-pointer focus:ring-4 ring-blue-300 ring-opacity-30"
      }
    >
      {props.children}
    </button>
  );
}

export default Button;
