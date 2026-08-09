import { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

function Text({ children }: Props) {
  return <div className="body-text">{children}</div>;
}

export default Text;
