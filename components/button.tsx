import { ReactNode } from "react";

type Props = {
  className?: string;
  inverted?: boolean;
  children: ReactNode;
};

function Button({ className, inverted, children }: Props) {
  return (
    <button
      className={
        "button" +
        (inverted ? " button-inverted" : "") +
        (className ? " " + className : "")
      }
    >
      {children}
    </button>
  );
}

export default Button;
