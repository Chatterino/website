import React from "react";


type Props = {
  children: React.ReactNode;
  className?: string;
  href: string;
}

function Link({ href, className, children }: Props) {
  return (
    <a href={href} className={"underline " + (className ?? "")}>
      {children}
    </a>
  );
}

export default Link;
