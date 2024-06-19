import { CircleCheckBig } from "lucide-react";
import React from "react";

export default function CompletedTodos({
  totalTodos = 0,
}: {
  totalTodos: number;
}) {
  return (
    <div className="flex items-center gap-1 border-b-2 p-2 border-gray-100  text-sm text-foreground/80">
      <>
        <CircleCheckBig />
        <span>+ {totalTodos}</span>
        <span className="capitalize">completed tasks</span>
      </>
    </div>
  );
}
