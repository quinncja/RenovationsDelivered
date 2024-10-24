import React from "react";
import { useDroppable } from "@dnd-kit/core";

export function Droppable({ children }) {
  const { setNodeRef } = useDroppable({
    id: "dashboard",
  });

  return <div ref={setNodeRef}>{children}</div>;
}
