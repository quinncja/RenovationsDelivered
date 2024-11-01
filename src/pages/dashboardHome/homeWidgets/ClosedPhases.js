import { useHome } from "context/HomeContext";
import HalfPieChart from "graphs/charts/PieChart/HalfPieChart";
import { useEffect, useRef } from "react";
import { useHomeData } from "utils/hooks/useHomeData";

function ClosedPhases() {
  const { dataMap, updateDataMap, closedPhases } = useHome()
  const id = "cost-vs-budget"
  const pieData = dataMap[id] || null;
  const loadData = useHomeData();
  const abortControllerRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      if (closedPhases === undefined) {
        updateDataMap(id, null);
        return;
      }

      try {
        if (abortControllerRef.current) {
            abortControllerRef.current.abort();
        }

        const controller = new AbortController();
        abortControllerRef.current = controller;
        loadData(id, {recnums: closedPhases}, controller.signal);

        } catch (error) {
        console.error("Error fetching data:", error);
        updateDataMap(id, null);
      }
    }

    fetchData();
    // eslint-disable-next-line
  }, [closedPhases]);

  const size = {
    height: 150,
    width: 400,
  };

    if(!pieData) return(
    <div className="home-widget home-widget-m">
        <div style={{ paddingTop: "27px" }} className="home-widget-loading" />
    </div>
    )
    if(pieData === -1) return(
    <div className="home-widget home-widget-m">
        <strong style={{color: "white"}}>
        No data
        </strong> 
    </div>
    )
    return(
        <div className="home-widget home-widget-m">     
            <HalfPieChart data={pieData} size={size} /> 
        </div>
    )
}


export default ClosedPhases;
