import React from "react";

interface Props {
  children: React.ReactNode;
  src: string;
  width?: number;
}

function Figure({ children, src, width }: Props) {
  return (
    <figure>
      <img src={src} width={width} />
      <figcaption>{children}</figcaption>
    </figure>
  );
}

export default Figure;
