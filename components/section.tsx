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
      <div className="section-center">
        <div
          className={
            "section-content" + (prose ? " section-content-prose" : "")
          }
        >
          {children}
        </div>
      </div>
    </div>
  );
}

export default Section;
