import React, { forwardRef, useEffect, useState, memo } from "react";
import { close } from "business/svg";
import { AnimatePresence, motion } from "framer-motion";
import ChartDisplay from "graphs/ChartDisplay";
import { itemFadeIn } from "utils/animations";
import { useDashboardContext } from "context/DashboardContext";
import { useSortable } from "@dnd-kit/sortable";
import { restrictToParentElement } from "@dnd-kit/modifiers";
import { LoadItemData, getItemData } from "./DashboardHooks.js";
import { CSS } from "@dnd-kit/utilities";
import DraggingItem from "./DraggingItem.js";

const DashboardItem = memo(
  forwardRef((props, ref) => {
    const { getChartObj, pageModifiers } = useDashboardContext();
    const { dragging, current, deleteSelf, setOpen, id, type, children, open } =
      props;

    useEffect(() => {
      console.log("dashboard item rerender");
    }, []);

    const [data, setData] = useState(null);

    const chartObj = getChartObj(type);
    const { getter, chartType } = chartObj;
    const showSingle =
      data && chartObj.checkIfSingle && chartObj.checkIfSingle(data);
    const chartToShow = showSingle ? chartObj.single : chartObj;

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

    useEffect(() => {
      const fetchData = async () => {
        try {
          setData();
          let newData;
          if (getter) {
            newData = await LoadItemData(chartObj, pageModifiers);
          } else newData = await getItemData(type);
          setData(newData);
        } catch (error) {
          console.log(error);
        }
      };
      if (!dragging) fetchData();

      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [type, pageModifiers]);

    return (
      //brainstorm motion.div causing premature item displacement
      <motion.div
        className={`dashboard-widget ${chartType === "Line" || chartType === "Bar" ? "wide-widget" : ""} ${!data && !dragging ? "loading-widget" : ""} `}
        style={style}
        ref={setNodeRef}
        listeners={listeners}
        attributes={attributes}
        layout
        onClick={
          data
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
        <motion.div
          layoutId={`dashboard-item-${id}`}
          className={`widget-background ${chartType === "Line" || chartType === "Bar" ? "wide-widget" : ""} ${current && "opaque-widget"} `}
        >
          <div className="widget-top">
            <div className="drag-handle-wrapper">
              <div
                className="drag-handle widget-item"
                {...listeners}
                {...attributes}
              ></div>
            </div>
            <motion.div className="widget-titles">
              <motion.div
                className="widget-title"
                layoutId={`dashboard-item-title-${id}`}
              >
                {type}
              </motion.div>
            </motion.div>
            <button
              className="x-button widget-item"
              onClick={(e) => {
                e.stopPropagation();
                deleteSelf();
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
                />
              </motion.div>
            </AnimatePresence>
          )}
        </motion.div>
      </motion.div>
    );
  }),
);

export default DashboardItem;
