import { ReactNode } from "react";

type Props = {
  children: ReactNode;
}

function Text({ children }: Props) {
  return <div className="text-blue-200">{children}</div>;
}

export default Text;
