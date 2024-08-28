import React from "react";
import { useDroppable } from "@dnd-kit/core";

export function Droppable({ children, isOpen }) {
  const { setNodeRef } = useDroppable({
    id: "dashboard",
  });

  return (
    <div
      id="dashboard"
      className={`dashboard-dropzone ${isOpen && "noscroll"}`}
      ref={setNodeRef}
    >
      {children}
    </div>
  );
}
