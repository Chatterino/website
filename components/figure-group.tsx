import React from "react";

export default function FigureGroup({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="figure-group">{children}</div>;
}
