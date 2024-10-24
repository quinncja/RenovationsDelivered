import { useModalContext } from "context/ModalContext";
import TrackedJob from "./TrackedJob";
import { useTrackedJobs } from "context/TrackedJobContext";
import {
  DndContext,
  useSensor,
  useSensors,
  PointerSensor,
  closestCenter,
  DragOverlay,
} from "@dnd-kit/core";
import { restrictToVerticalAxis } from "@dnd-kit/modifiers";
import {
  SortableContext,
  arrayMove,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { useState } from "react";

function TrackedJobs({ jobs }) {
  const { openModal } = useModalContext();
  const { updateTrackedJobs } = useTrackedJobs();
  const [dragging, setDragging] = useState();

  const handleClick = () => {
    openModal("addJobs");
  };

  const handleDelete = async (id) => {
    const newJobs = jobs.filter((job) => job !== id);
    await updateTrackedJobs(newJobs, "Delete");
  };

  const handleDragEnd = ({ active, over }) => {
    if (over && active.id !== over.id) {
      const oldIndex = jobs.indexOf(active.id);
      const newIndex = jobs.indexOf(over.id);
      const newJobs = arrayMove(jobs, oldIndex, newIndex);
      updateTrackedJobs(newJobs, "Move");
    }
    setDragging();
  };

  const sensors = useSensors(useSensor(PointerSensor));

  return (
    <>
      <div className="jobs-header">
        <h2> Projects </h2>
        <button
          className="job-button add-new-button"
          onClick={() => handleClick()}
        >
          + add new
        </button>
      </div>
      <DndContext
        onDragStart={({ active }) => {
          console.log(active);
          setDragging(active);
        }}
        onDragEnd={handleDragEnd}
        modifiers={[restrictToVerticalAxis]}
        sensors={sensors}
        collisionDetection={closestCenter}
      >
        <SortableContext items={jobs} strategy={verticalListSortingStrategy}>
          <div className="tracked-jobs">
            {jobs.map((job) => (
              <TrackedJob
                current={dragging?.id === job ? true : false}
                key={job}
                job={job}
                id={job}
                deleteSelf={handleDelete}
              />
            ))}
          </div>
        </SortableContext>
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

export default TrackedJobs;
