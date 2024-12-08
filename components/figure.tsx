import React from "react";

interface Props {
  children: React.ReactNode;
  src: string;
  width?: number;
}

function Figure({ children, src, width }: Props) {
  return (
    <figure>
      {src.endsWith(".webm") ? (
        <video src={src} width={width} controls autoPlay loop />
      ) : (
        <img src={src} width={width} />
      )}
      <figcaption>{children}</figcaption>
    </figure>
  );
}

export default Figure;
