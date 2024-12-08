import React from "react";

export default function FigureGroup({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="flex gap-4 justify-left flex-wrap">{children}</div>;
}
