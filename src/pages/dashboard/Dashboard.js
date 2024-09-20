import React, { useState, useCallback } from "react";
import { useDashboardContext } from "context/DashboardContext";
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
import OpenItem from "./OpenItem";
import DashboardItem from "./DashboardItem";
import _ from "lodash";

function Dashboard() {
  const {
    active,
    setActive,
    items,
    removeItem,
    reorderById,
    captureItemState,
    compareItemStates,
    setNewWidgetOpen,
    loaded,
  } = useDashboardContext();
  const [open, setOpen] = useState(null);
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  function toggleBodyScroll(disable) {
    if (!window.tempScrollTop) {
      window.tempScrollTop = window.scrollY;   
    }
    if (disable) {
      document.getElementById("dashboard").classList.add('noscroll');
      document.getElementById("dashboard").style.top = `-${window.tempScrollTop}px`;
    } else {
      document.getElementById("dashboard").classList.remove('noscroll');
      document.getElementById("dashboard").style.top = `0px`;
      window.scrollTo({top: window.tempScrollTop});
      window.tempScrollTop = 0;
    }
  }

  
  const openSelf = (data) => {
    toggleBodyScroll(true)
    setOpen(data);
  };

  const closeSelf = () => {
    toggleBodyScroll(false)
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
    debounce(handleDragOver, 100, {
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

  if (
    loaded &&
    (items.length === 0 || (items.length === 1 && _.isEmpty(items[0])))
  )
    return (
      <div className="loading-wrapper no-item-text">
        <h2>Your dashboard is empty. </h2>
        <br />
        <h3 onClick={() => setNewWidgetOpen(true)}>
          {" "}
          Click here to add a widget{" "}
        </h3>
      </div>
    );
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
        <Droppable>
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
        {open && <OpenItem item={open} closeSelf={closeSelf} />}
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
}

export default Dashboard;
