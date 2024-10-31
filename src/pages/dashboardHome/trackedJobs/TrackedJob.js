import { useSortable } from "@dnd-kit/sortable";
import { close } from "business/svg";
import { useTrackedJobs } from "context/TrackedJobContext";
import { getBaseJobName } from "pages/openItem/transformData";
import { useEffect, useRef } from "react";
import { percentFomatter, strToMods } from "utils/formatters";
import { useJobData } from "utils/hooks/useJobData";
import { CSS } from "@dnd-kit/utilities";
import { useModifiers } from "context/ModifierContext";
import { useNavigate } from "react-router-dom";

function TrackedJob(props) {
  const { job, deleteSelf, current } = props;
  const { dataMap } = useTrackedJobs();
  const { updatePageModifiers } = useModifiers();
  const navigate = useNavigate();
  const data = props.data || dataMap[job] || null;
  const loadData = useJobData();
  const abortControllerRef = useRef(null);
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({
      id: props.id,
      data: {
        renderDragOverlay: () => <TrackedJob props={props} data={data} />,
      },
    });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const handleClick = (obj) => {
    const mods = strToMods(job, obj.year, obj.phase);
    updatePageModifiers(mods);
    navigate("/jobcost");
  };

  const marginDisplay = (obj, status) => {
    const { phase, margin } = obj;
    return (
      <button
        className="job-button margin-button"
        onClick={() => handleClick(obj)}
        key={phase}
      >
        <h3 className={`job-phase status-${status}`}> P{phase} </h3>
        <h4>{percentFomatter(margin)}</h4>
      </button>
    );
  };

  const jobBody = () => {
    return (
      <div className="job-body">
        <div className="job-left">
          <h2> {getBaseJobName(data.jobnme)} </h2>
          <h4> {data.clnnme} </h4>
        </div>
        <div className="job-right">
          {data.closedPhase && marginDisplay(data.closedPhase, "Complete")}
          {data.openPhases &&
            data.openPhases.map((obj) => marginDisplay(obj, "Active"))}
        </div>
      </div>
    );
  };

  useEffect(() => {
    const fetchData = async () => {
      if (data) {
        return;
      }
      try {
        if (abortControllerRef.current) {
          abortControllerRef.current.abort();
        }
        const controller = new AbortController();
        abortControllerRef.current = controller;
        loadData(job, controller.signal);
      } catch (error) {
        if (error.name === "AbortError") {
          console.log("Fetch request aborted");
        } else {
          console.error("Error fetching data:", error);
        }
      }
    };

    fetchData();

    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
    //eslint-disable-next-line
  }, [job]);

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`tracked-job ${!data && "loading-widget"} ${current && "opaque-widget"}`}
    >
      <span className="grippy" {...attributes} {...listeners}></span>
      {data && jobBody()}

      <button
        className="x-button widget-item"
        onClick={(e) => {
          e.stopPropagation();
          deleteSelf(job);
        }}
      >
        {close()}
      </button>
    </div>
  );
}

export default TrackedJob;
