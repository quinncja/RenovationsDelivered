import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BackArrowSvg, GridSvg, PieSvg, close } from "../../../business/svg";
import {
  buttonVariants,
  buttonsContainerVariants,
  newWidgetPopupVariants,
  widgetItemsFadeIn,
} from "../../../utils/animations";
import { chartObjects, groupedByChartType } from "graphs/ChartObjects";
import { generateRandomId } from "utils/funcs";
import { useItems } from "context/ItemsContext";

function NewWidgetPopup({ closeSelf }) {
  const { addItem, addMultItems } = useItems();
  const [body, setBody] = useState();

  const chartObjectMap = chartObjects.reduce((acc, chartObject) => {
    acc[chartObject.type] = chartObject;
    return acc;
  }, {});

  const projectView = {
    items: [
      chartObjectMap["Status"],
      chartObjectMap["Cost Analysis"],
      chartObjectMap["Financial Overview"],
      chartObjectMap["Margin"],
      chartObjectMap["Budget Breakdown"],
      chartObjectMap["COGs Breakdown"],
      chartObjectMap["Sub Breakdown"],
      chartObjectMap["Vender Breakdown"],
      chartObjectMap["Client Breakdown"],
    ],
  };

  const handleClick = (obj) => {
    if (obj === "project-view") {
      let items = [];
      projectView.items.forEach((item) => {
        const newItem = {
          id: generateRandomId(),
          type: item.type,
        };
        items.push(newItem);
      });
      addMultItems(items);
      closeSelf();
    } else {
      const newItem = {
        id: generateRandomId(),
        type: obj.type,
      };
      addItem(newItem, -1);
      closeSelf();
    }
  };

  const buttonOptions = [
    {
      title: "Preset",
      svg: GridSvg(),
      next: <Preset />,
    },
    {
      title: "Single",
      svg: PieSvg(),
      next: <Single />,
    },
  ];

  function Single() {
    return (
      <motion.div layout="position">
        {Object.keys(groupedByChartType).map((chartType, index) => {
          let chartObjects = groupedByChartType[chartType];
          chartObjects = chartObjects.filter((obj) => obj.admin === false);
          if (chartObjects.length > 0)
            return (
              <motion.div
                key={index}
                variants={widgetItemsFadeIn}
                initial="hidden"
                animate="visible"
                exit="exit"
              >
                <div className="widget-button-header">{chartType}</div>

                <motion.div
                  className="widget-button-row"
                  variants={buttonsContainerVariants}
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                >
                  <AnimatePresence>
                    {chartObjects.map((obj) => (
                      <motion.button
                        className="widget-button"
                        key={obj.id || `${obj.type}-${index}`}
                        onClick={() => handleClick(obj)}
                        variants={buttonVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                      >
                        {obj.type}
                      </motion.button>
                    ))}
                  </AnimatePresence>
                </motion.div>
              </motion.div>
            );
          else return null; // Return null instead of an empty string for better React practices
        })}
      </motion.div>
    );
  }

  function Preset() {
    return (
      <motion.div variants={widgetItemsFadeIn} layout="position">
        <motion.div>
          <div className="widget-button-header">Preset</div>
          <div className="widget-button-row">
            <button
              className="widget-button"
              key={"project-view"}
              onClick={() => handleClick("project-view")}
            >
              {"Project View"}
            </button>
          </div>
        </motion.div>
      </motion.div>
    );
  }

  function Start() {
    return (
      <motion.div className="new-widget-button-row" layout="position">
        {buttonOptions.map((option) => {
          return (
            <button
              className="widget-type-button"
              title={option.title}
              onClick={() => setBody(option.next)}
            >
              {option.svg}
              <strong>{option.title} </strong>
            </button>
          );
        })}
      </motion.div>
    );
  }

  return (
    <div className="popup-wrapper">
      <motion.div
        className="new-widget-popup"
        variants={newWidgetPopupVariants}
        onClick={(e) => e.stopPropagation()}
        layout
      >
        <motion.div className="widget-top new-widget-top" layout="position">
          {body ? (
            <button className="x-button widget-item" onClick={() => setBody()}>
              {BackArrowSvg()}
            </button>
          ) : (
            <div className="drag-handle-wrapper" />
          )}
          <div className="widget-title">New Widget</div>
          <button className="x-button widget-item" onClick={closeSelf}>
            {close()}
          </button>
        </motion.div>
        {body || <Start />}
      </motion.div>
    </div>
  );
}

export default NewWidgetPopup;
