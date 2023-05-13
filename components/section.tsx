import { CSSProperties, ReactNode } from "react";

type Props = {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
};

function Section({ children, className, style }: Props) {
  return (
    <div className={className} style={style}>
      <div className="grid">
        <div className="max-w-screen-xl place-self-center">{children}</div>
      </div>
    </div>
  );
}

export default Section;
