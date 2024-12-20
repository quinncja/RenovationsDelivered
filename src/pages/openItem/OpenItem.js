import { useEffect, useRef } from "react";
import { getChartObj, getSingleChartObj } from "graphs/ChartObjects";
import { useNavigate, useParams } from "react-router-dom";
import { fromParam } from "utils/formatters";
import { useChartData } from "utils/hooks/useChartData";
import { useItems } from "context/ItemsContext";
import { useSingle } from "utils/hooks/useSingle";
import TransformLayer from "./TransformLayer";
import PopulateChangeOrders from "./openItemDisplays/PopulateChangeOrders";
import FinancialOverview from "./openItemDisplays/FinancialOverview";
import { toast } from "sonner";

function OpenItem() {
  const navigate = useNavigate();
  const single = useSingle();
  const { param } = useParams();
  const type = fromParam(param);
  const chartObj = single ? getSingleChartObj(type) : getChartObj(type);
  const { query } = chartObj;
  if (!chartObj) navigate("/dashboard");
  const { dataMap } = useItems();
  const loadData = useChartData();
  const abortControllerRef = useRef(null);
  const data = type === "Status" ? [] : dataMap[`open-${type}`] || null;

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (abortControllerRef.current) {
          abortControllerRef.current.abort();
        }
        const controller = new AbortController();
        abortControllerRef.current = controller;
        loadData(`open-${type}`, query + "-open", controller.signal);
      } catch (error) {
        if (error.name === "AbortError") {
          console.log("Fetch request aborted");
        } else {
          toast.error(`Error fetching ${type} data`, error);
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

  const body = () => {
    if(!data) return (
      <div style={{display: "flex", width: "100%", height: "50vh", justifyContent: 'center', alignItems: "center"}}>      
          <span
              className={`home-widget-num ${"home-widget-loading"}`}>
          </span>
      </div>
    )  

    if(type === "Change Orders") return <PopulateChangeOrders data={data}/>
    if(type === "Financial Overview") return <FinancialOverview data={data}/>
    else return <TransformLayer data={data} chartObj={chartObj} />
  }

  return (
    <div
      className="widget-background dashboard-widget-open"
    >
      <div className={`dashboard-welcome user-page open-widget-page`}>

          <h1> {type} </h1>
         {body()}
      </div>
    </div>
  );
}

export default OpenItem;
