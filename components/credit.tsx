import React from "react";

export default function FigureGroup({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="text-gray-300 mt-3 mb-4 text-sm">{children}</div>;
}
