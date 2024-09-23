import React, { forwardRef, useEffect, useState, memo } from "react";
import { close } from "business/svg";
import { AnimatePresence, motion } from "framer-motion";
import ChartDisplay from "graphs/ChartDisplay";
import { itemFadeIn } from "utils/animations";
import { useDashboardContext } from "context/DashboardContext";
import { useSortable } from "@dnd-kit/sortable";
import { restrictToParentElement } from "@dnd-kit/modifiers";
import { LoadItemData } from "./DashboardHooks.js";
import { CSS } from "@dnd-kit/utilities";
import DraggingItem from "./DraggingItem.js";

const DashboardItem = memo(
  forwardRef((props, ref) => {
    const { getChartObj, pageModifiers } = useDashboardContext();
    const { dragging, current, deleteSelf, setOpen, id, type, children, open } =
      props;

    const [data, setData] = useState(null);
    const chartObj = getChartObj(type);
    const { getter, chartType } = chartObj;
    const showSingle =
      data &&
      chartObj &&
      chartObj.checkIfSingle &&
      chartObj.checkIfSingle(data, pageModifiers);
    const chartToShow =
      showSingle && chartObj && chartObj.single ? chartObj.single : chartObj;

    const dataToShow = dragging
      ? []
      : showSingle
        ? chartObj.single.cleaner(data)
        : data;

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
              children={children}
              chartType={chartType}
              type={type}
              id={id}
              chart={chartToShow}
              data={dataToShow}
            />
          ),
        },
      });

    const style = {
      transform: CSS.Translate.toString(transform),
      transition,
    };

    const [abortController, setAbortController] = useState(null);

    useEffect(() => {
      const fetchData = async () => {
        try {
          setData();
          let newData;

          if (abortController) {
            abortController.abort();
          }

          const controller = new AbortController();
          setAbortController(controller);

          if (getter) {
            newData = await LoadItemData(
              chartObj,
              pageModifiers,
              controller.signal,
            );
            setData(newData);
          }
        } catch (error) {
          if (error.name === "AbortError") {
            console.log("Fetch request aborted");
          } else {
            console.error("Error fetching data:", error);
          }
        }
      };
      if (!dragging) fetchData();

      return () => {
        if (abortController) {
          abortController.abort();
        }
      };

      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [type, pageModifiers]);

    return (
      //brainstorm motion.div causing premature item displacement
      <div
        className={`dashboard-widget 
        ${chartType === "Line" || chartType === "Bar" ? "wide-widget" : ""} 
        ${!data && !dragging ? "loading-widget" : ""} 
        ${chartType === "Text" ? "text-widget" : ""}`}
        style={style}
        ref={setNodeRef}
        listeners={listeners}
        attributes={attributes}
        onClick={
          data && chartType !== "Text"
            ? () =>
                setOpen({
                  id: id,
                  type: type,
                  chartType: chartType,
                  data: data,
                })
            : () => ({})
        }
      >
        <div
          className={`widget-background ${chartType === "Line" || chartType === "Bar" ? "wide-widget" : ""} ${current && "opaque-widget"} `}
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
          {dataToShow && (
            <AnimatePresence>
              <motion.div
                initial="hidden"
                animate="visible"
                exit="exit"
                variants={dragging ? {} : itemFadeIn}
              >
                <ChartDisplay
                  chartObj={chartToShow}
                  data={dataToShow}
                  id={id}
                  replaceImage={open}
                />
              </motion.div>
            </AnimatePresence>
          )}
        </div>
      </div>
    );
  }),
);

export default DashboardItem;
