import { CSSProperties, ReactNode } from "react";

type Props = {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  prose?: boolean;
};

function Section({ children, className, style, prose }: Props) {
  return (
    <div className={className} style={style}>
      <div className="grid">
        <div
          className={`${prose ? "max-w-256" : "max-w-320"} place-self-center`}
        >
          {children}
        </div>
      </div>
    </div>
  );
}

export default Section;
