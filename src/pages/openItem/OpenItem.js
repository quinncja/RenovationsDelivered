import ReactTable from "pages/openItem/ReactTable";
import whiteLogo from "images/R-Only-White-Empty.png";
import blackLogo from "images/R-Only-Grey-Empty.png";

import { useEffect, useState, useMemo } from "react";
import { close } from "business/svg";
import ChartDisplay from "graphs/ChartDisplay";
import LegendDisplay from "pages/openItem/LegendDisplay";
import { useModifiers } from "context/ModifierContext";
import { useUserContext } from "context/UserContext";
import { useProjectContext } from "context/ProjectContext";
import { getChartObj } from "graphs/ChartObjects";

function OpenItem({ item, closeSelf }) {
  const { data, chartType, type, id } = item;
  const [activeColumn, setActiveColumn] = useState();
  const { appearance } = useUserContext();
  const [tableData, setTableData] = useState();
  const { pageModifiers } = useModifiers();
  const { pageModifierToString } = useProjectContext();
  const chartObj = getChartObj(type);
  const [filteredIds, setFilteredIds] = useState([]);

  const showSingle = useMemo(() => {
    return data && chartObj.checkIfSingle && chartObj.checkIfSingle(data);
  }, [data, chartObj]);

  const chartToShow = useMemo(() => {
    return showSingle ? chartObj.single : chartObj;
  }, [showSingle, chartObj]);

  const initialDataToShow = useMemo(() => {
    return showSingle ? chartToShow.cleaner(data) : data;
  }, [showSingle, chartToShow, data]);

  const dataToShow = useMemo(() => {
    if (Array.isArray(initialDataToShow)) {
      return initialDataToShow.filter(
        (dataItem) => !filteredIds.includes(dataItem.id),
      );
    }
    return initialDataToShow;
  }, [initialDataToShow, filteredIds]);

  function handleClose() {
    closeSelf();
  }

  function toggleData(item) {
    const { id: toggledId } = item;
    setFilteredIds((prevFilteredIds) => {
      if (prevFilteredIds.includes(toggledId)) {
        return prevFilteredIds.filter((currentId) => currentId !== toggledId);
      } else {
        return [...prevFilteredIds, toggledId];
      }
    });
  }

  useEffect(() => {
    const loadTableData = async () => {
      try {
        const tData = await chartObj.tableFunc(data);
        setTableData(tData);
      } catch (error) {
        console.log(error);
      }
    };

    const timer = setTimeout(() => {
      loadTableData();
    }, 500);

    return () => clearTimeout(timer);
  }, [chartObj, data]);

  return (
    <div
      className="widget-background dashboard-widget-open"
      onClick={() => closeSelf()}
    >
      <div
        className="open-widget-top-container"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="open-widget-top">
          <div className="open-widget-left">
            <img
              src={appearance === "light" ? blackLogo : whiteLogo}
              className="logo nav-logo"
              alt="Renovations Delivered"
            />
            <div className="widget-title open-widget-title">
              <h2> {type} </h2>{" "}
              <span className="pmt">
                {" "}
                {pageModifierToString(pageModifiers)}{" "}
              </span>
            </div>
          </div>
          <button
            className="x-button widget-item open-widget-close"
            onClick={handleClose}
          >
            {close()}
          </button>
        </div>
      </div>

      <div
        className="open-widget-container"
        onClick={(e) => e.stopPropagation()}
      >
        <div
          className={`open-chart-row ${chartType === "Pie" && "pie-chart-row"}`}
        >
          <ChartDisplay
            chartObj={chartToShow}
            handleClick={setActiveColumn}
            data={dataToShow}
            id={id}
            open={true}
          />
          {chartObj.type !== "Margin" && (
            <LegendDisplay
              data={initialDataToShow}
              toggleData={toggleData}
              filteredIds={filteredIds}
              line={chartType === "Line" ? true : false}
            />
          )}
        </div>
        <ReactTable data={tableData} activeColumn={activeColumn} />
      </div>
    </div>
  );
}

export default OpenItem;
