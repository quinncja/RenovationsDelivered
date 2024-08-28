import { useState } from "react";
import { motion } from "framer-motion";
import { close } from "business/svg";
import ChartDisplay from "graphs/ChartDisplay";
import LegendDisplay from "graphs/LegendDisplay";
import LineTable from "graphs/LineTable";
import { overlayVariants } from "utils/animations";
import { useCSSVariable } from "utils/hooks/useCSSVariable";
import { useDashboardContext } from "context/DashboardContext";

function OpenItem({ item, closeSelf }) {
  const { data, chartType, type, id } = item;
  const [activeColumn, setActiveColumn] = useState();
  const { getChartObj } = useDashboardContext();
  const color = useCSSVariable("--overlay");
  const chartObj = getChartObj(type);

  const showSingle =
    data && chartObj.checkIfSingle && chartObj.checkIfSingle(data);
  const chartToShow = showSingle ? chartObj.single : chartObj;
  const dataToShow = showSingle ? chartObj.single.cleaner(data) : data;

  function handleClose() {
    closeSelf();
  }

  function body() {
    return (
      <>
        <div
          className={`open-chart-row ${chartType === "Line" && "shift-right"}`}
        >
          <ChartDisplay
            chartObj={chartToShow}
            handleClick={setActiveColumn}
            data={dataToShow}
            id={id}
            open={true}
          />
          {chartToShow.chartType !== "Text" && <LegendDisplay />}
        </div>
        {chartType === "Line" && (
          <LineTable data={data} activeColumn={activeColumn} />
        )}
      </>
    );
  }

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      exit="exit"
      variants={overlayVariants(color)}
      className="open-widget-overlay"
      onClick={handleClose}
    >
      <motion.div layout style={{ width: "100%" }}>
        <motion.div
          className="widget-background dashboard-widget-open"
          layoutId={`dashboard-item-${id}`}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="widget-top">
            <div className="drag-handle-wrapper" />
            <motion.div
              className="widget-title"
              layoutId={`dashboard-item-title-${id}`}
            >
              {type}
            </motion.div>
            <button className="x-button widget-item" onClick={handleClose}>
              {close()}
            </button>
          </div>
          {body()}
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

export default OpenItem;
