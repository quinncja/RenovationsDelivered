import { useEffect, useRef } from "react";
import { getChartObj, getSingleChartObj } from "graphs/ChartObjects";
import { useNavigate, useParams } from "react-router-dom";
import { fromParam } from "utils/formatters";
import { useChartData } from "utils/hooks/useChartData";
import { useItems } from "context/ItemsContext";
import { useSingle } from "utils/hooks/useSingle";
import TransformLayer from "./TransformLayer";

function OpenItem() {
  const navigate = useNavigate();
  const single = useSingle();
  const { param } = useParams();
  const type = fromParam(param);
  const chartObj = single ? getSingleChartObj(type) : getChartObj(type);
  const { query } = chartObj;
  if (!chartObj) navigate("/dashboard");
  const { dataMap, clearOpenData } = useItems();
  const loadData = useChartData();
  const abortControllerRef = useRef(null);
  const data = type === "Status" ? [] : dataMap["open"] || null;

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (abortControllerRef.current) {
          abortControllerRef.current.abort();
        }
        const controller = new AbortController();
        abortControllerRef.current = controller;
        loadData("open", query + "-open", controller.signal);
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
  }, [type, loadData, query]);

  function handleClose() {
    clearOpenData();
    navigate(`/dashboard`);
  }

  return (
    <div
      className="widget-background dashboard-widget-open"
      onClick={handleClose}
    >
      <div
        className={`${!data ? "loading-widget" : ""} open-widget-container`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="scroll-open-widget">
          <h2> {type} </h2>
          {data && <TransformLayer data={data} chartObj={chartObj} />}
        </div>
      </div>
    </div>
  );
}

export default OpenItem;
