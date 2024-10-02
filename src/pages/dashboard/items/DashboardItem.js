import React, { useEffect, useRef } from "react";
import { close } from "business/svg";
import { AnimatePresence, motion } from "framer-motion";
import { itemFadeIn } from "utils/animations";
import { useSortable } from "@dnd-kit/sortable";
import { restrictToParentElement } from "@dnd-kit/modifiers";
import { CSS } from "@dnd-kit/utilities";
import DraggingItem from "./DraggingItem.js";
import { getChartObj, getSingleChartObj } from "graphs/ChartObjects.js";
import { useChartData } from "utils/hooks/useChartData.js";
import BodyDisplay from "./display/BodyDisplay.js";
import { useItems } from "context/ItemsContext.js";
import { useNavigate } from "react-router-dom";
import { toParam } from "utils/formatters.js";

function DashboardItem(props) {
  const { current, single, deleteSelf, id, type, dragging } = props;
  const { dataMap } = useItems();
  const navigate = useNavigate();
  const data = type === "Status" ? [] : dataMap[id] || null;
  const chartObj = single ? getSingleChartObj(type) : getChartObj(type);

  const { chartType } = chartObj;
  const loadData = useChartData();

  const handleClick = () => {
    if (single && chartType === "Text") return;
    const param = toParam(type);
    navigate(`/item/${param}`);
  };

  const { attributes, listeners, transform, transition, setNodeRef } =
    useSortable({
      id: id,
      transition: {
        duration: 350,
        easing: "cubic-bezier(0.25, 1, 0.5, 1)",
      },
      data: {
        isWide: type === "Line",
        modifiers: [restrictToParentElement],
        renderDragOverlay: () => (
          <DraggingItem
            chartObj={chartObj}
            single={single}
            type={type}
            id={id}
            chart={chartObj}
            data={data}
          />
        ),
      },
    });

  const style = {
    transform: CSS.Translate.toString(transform),
    transition,
  };

  const abortControllerRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (abortControllerRef.current) {
          abortControllerRef.current.abort();
        }
        const controller = new AbortController();
        abortControllerRef.current = controller;
        loadData(id, chartObj.query, controller.signal);
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
  }, [type, loadData, chartObj.query, id]);

  return (
    <div
      className={`dashboard-widget 
        ${chartType === "Line" || chartType === "Bar" || type === "Margin" ? "wide-widget" : ""} 
        ${!data && !current ? "loading-widget" : ""} 
        ${chartType === "Text" ? "text-widget" : ""}`}
      style={style}
      ref={setNodeRef}
      listeners={listeners}
      attributes={attributes}
      onClick={handleClick}
    >
      <div
        className={`widget-background ${chartType === "Line" || chartType === "Bar" || type === "Margin" ? "wide-widget" : ""} ${current && "opaque-widget"} `}
      >
        <div className="widget-top">
          <div className="drag-handle-wrapper"></div>
          <div className="widget-titles" {...listeners} {...attributes}>
            <div className="widget-title">{type}</div>
          </div>
          <button
            className="x-button widget-item"
            onClick={(e) => {
              e.stopPropagation();
              deleteSelf(id);
            }}
          >
            {close()}
          </button>
        </div>
        {data && (
          <AnimatePresence>
            <motion.div
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={current ? {} : itemFadeIn}
            >
              <BodyDisplay
                chartObj={chartObj}
                data={data}
                id={id}
                dragging={dragging}
              />
            </motion.div>
          </AnimatePresence>
        )}
      </div>
    </div>
  );
}

export default DashboardItem;
