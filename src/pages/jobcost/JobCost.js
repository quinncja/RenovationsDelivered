import React, { useCallback } from "react";
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
import { Droppable } from "./Droppable";
import { DragOverlay } from "@dnd-kit/core";
import debounce from "lodash/debounce";
import DashboardItem from "./items/CostItem";
import _ from "lodash";
import { useItems } from "context/ItemsContext";
import EmptyDashboard from "./EmptyJobCost";
import { useSingle } from "utils/hooks/useSingle";

function JobCost() {
  const {
    dragging,
    setDragging,
    items,
    removeItem,
    reorderById,
    captureItemState,
    compareItemStates,
    dataMap,
    clearOpenData,
  } = useItems();

  const single = useSingle();
  if(dataMap["open"]) clearOpenData();
  
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  function handleDragOver({ active, over }) {
    if (!over) return;
    if (active && !active.data.current.new) {
      reorderById(active.id, over.id);
    }
  }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedDragOver = useCallback(
    debounce(handleDragOver, 100, {
      trailing: false,
      leading: true,
    }),
    [],
  );

  function handleDragEnd() {
    compareItemStates();
    setTimeout(() => {
      setDragging(null);
    }, 105);
  }

  if (
    items &&
    (items.length === 0 || (items.length === 1 && _.isEmpty(items[0])))
  )
    return <EmptyDashboard />;

  return (
    <>
      <DndContext
        onDragStart={({ active }) => {
          setDragging(active);
          captureItemState(active);
        }}
        onDragOver={debouncedDragOver}
        onDragEnd={handleDragEnd}
        modifiers={[]}
        sensors={sensors}
      >
        <Droppable>
          <div id="dashboard" className={`dashboard-dropzone`}>
            <SortableContext
              items={items.length > 0 ? items : []}
              strategy={() => null}
            >
              {items &&
                items.length > 0 &&
                items.map(
                  (item) =>
                    item &&
                    item.type && (
                      <DashboardItem
                        current={dragging?.id === item.id ? true : false}
                        dragging={dragging}
                        key={item.id}
                        id={item.id}
                        type={item.type}
                        deleteSelf={removeItem}
                        single={single}
                      />
                    ),
                )}
            </SortableContext>
          </div>
        </Droppable>
        <DragOverlay
          dropAnimation={{
            duration: 300,
            easing: "cubic-bezier(0.18, 0.67, 0.6, 1.22)",
          }}
        >
          {dragging &&
            dragging.data &&
            dragging.data.current.renderDragOverlay?.(dragging)}
        </DragOverlay>
      </DndContext>
    </>
  );
}

export default JobCost;
