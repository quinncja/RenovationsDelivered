import { useState } from "react";
import { motion } from "framer-motion";
import {
  BackArrowSvg,
  GridSvg,
  PieSvg,
  UserSvg,
  close,
} from "../../business/svg";
import {
  newWidgetPopupVariants,
  overlayVariants,
  widgetItemsFadeIn,
} from "../../utils/animations";
import { useCSSVariable } from "../../utils/hooks/useCSSVariable";
import { chartObjects, groupedByChartType } from "graphs/ChartObjects";
import { generateRandomId } from "utils/funcs";
import { useDashboardContext } from "context/DashboardContext";

function NewWidgetPopup({ closeSelf }) {
  const color = useCSSVariable("--overlay");
  const { addItem, addMultItems } = useDashboardContext();
  const [body, setBody] = useState();

  const chartObjectMap = chartObjects.reduce((acc, chartObject) => {
    acc[chartObject.type] = chartObject;
    return acc;
  }, {});

  const projectView = {
    items: [
      chartObjectMap["Cost Analysis"],
      chartObjectMap["Margin"],
      chartObjectMap["Financial Overview"],
      chartObjectMap["COGs Breakdown"],
      chartObjectMap["Vender Breakdown"],
      chartObjectMap["Sub Breakdown"],
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
      title: "Admin",
      svg: UserSvg(),
      next: <Admin />,
    },
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
      <motion.div variants={widgetItemsFadeIn} layout="position">
        {Object.keys(groupedByChartType).map((chartType, index) => {
          const chartObjects = groupedByChartType[chartType];
          return (
            <motion.div key={index}>
              <div className="widget-button-header">{chartType}</div>
              <div className="widget-button-row">
                {chartObjects.map((obj) => (
                  <button
                    className="widget-button"
                    key={obj.id || `${obj.type}-${index}`}
                    onClick={() => handleClick(obj)}
                  >
                    {obj.type}
                  </button>
                ))}
              </div>
            </motion.div>
          );
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

  function Admin() {
    return <></>;
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
    <motion.div
      initial="hidden"
      animate="visible"
      exit="exit"
      variants={overlayVariants(color, 0)}
      className="open-widget-overlay new-widget-overlay"
      onClick={closeSelf}
    >
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
    </motion.div>
  );
}

export default NewWidgetPopup;
