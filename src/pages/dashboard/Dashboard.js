import React, { useState, useCallback, useEffect } from "react";
import { useDashboardContext } from "context/DashboardContext";
import { loadingSvg } from "business/svg";
import {
  DndContext,
  useSensor,
  useSensors,
  KeyboardSensor,
  PointerSensor,
} from "@dnd-kit/core";
import {
  SortableContext,
  sortableKeyboardCoordinates,
} from "@dnd-kit/sortable";
import { Droppable } from "./Dropable";
import { DragOverlay } from "@dnd-kit/core";
import debounce from "lodash/debounce";
import OpenItem from "./OpenItem";
import { AnimatePresence } from "framer-motion";
import DashboardItem from "./DashboardItem";

function Dashboard() {
  const {
    active,
    setActive,
    items,
    removeItem,
    reorderById,
    captureItemState,
    compareItemStates,
  } = useDashboardContext();
  const [open, setOpen] = useState(null);
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  useEffect(() => {
    console.log(active);
  }, [active]);
  const openSelf = (data) => {
    setOpen(data);
  };

  const closeSelf = () => {
    setOpen(false);
  };

  function handleDragOver({ active, over }) {
    if (!over) return;
    if (active && !active.data.current.new) {
      reorderById(active.id, over.id);
    }
  }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedDragOver = useCallback(
    debounce(handleDragOver, 40, {
      trailing: false,
      leading: true,
    }),
    [],
  );

  function handleDragEnd() {
    compareItemStates();
    setTimeout(() => {
      setActive(null);
    }, 105);
  }

  if (items !== 1)
    return (
      <>
        <DndContext
          onDragStart={({ active }) => {
            setActive(active);
            captureItemState(active);
          }}
          onDragOver={debouncedDragOver}
          onDragEnd={handleDragEnd}
          modifiers={[]}
          sensors={sensors}
        >
          <Droppable isOpen={open}>
            <SortableContext items={items.length > 0 ? items : []} strategy={() => null}>
              {items && items.length > 0 &&
                items.map(
                  (item) =>
                    item && (
                      <DashboardItem
                        current={active?.id === item.id ? true : false}
                        key={item.id}
                        placed={item}
                        id={item.id}
                        type={item.type}
                        data={{}}
                        open={open}
                        setOpen={openSelf}
                        deleteSelf={removeItem}
                      />
                    ),
                )}
            </SortableContext>
          </Droppable>
          <AnimatePresence>
            {open && <OpenItem item={open} closeSelf={closeSelf} />}
          </AnimatePresence>
          <DragOverlay
            dropAnimation={{
              duration: 300,
              easing: "cubic-bezier(0.18, 0.67, 0.6, 1.22)",
            }}
          >
            {active &&
              active.data &&
              active.data.current.renderDragOverlay?.(active)}
          </DragOverlay>
        </DndContext>
      </>
    );
  return <div className="loading-wrapper"> {loadingSvg()} </div>;
}

export default Dashboard;
