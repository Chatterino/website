import { ReactNode } from "react";

type Props = {
  className?: string;
  colorsClassName?: string;
  children: ReactNode;
};

function Button({ className, colorsClassName, children }: Props) {
  return (
    <button
      className={
        (className ?? "") +
        " " +
        (colorsClassName ?? "text-white bg-blue-500 hover:bg-blue-400") +
        " m-3 py-2 px-4 rounded-sm cursor-pointer focus:ring-4 ring-blue-300 ring-opacity-30"
      }
    >
      {children}
    </button>
  );
}

export default Button;
