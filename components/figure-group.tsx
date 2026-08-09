import React from "react";

export default function FigureGroup({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex my-4 gap-x-4 gap-y-6 flex-wrap figure-group">
      {children}
    </div>
  );
}
