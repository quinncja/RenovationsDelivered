import { useHome } from "context/HomeContext";
import { useHomeData } from "utils/hooks/useHomeData";
import { useRef, useEffect } from "react";
import { toast } from "sonner";
import { dollarFormatter } from "utils/formatters";

function Revenue() {
  const id = "home-rev";
  const { dataMap, updateDataMap } = useHome();
  const loadData = useHomeData();
  const abortControllerRef = useRef(null);

  const revAmounts = dataMap[id] || null;
  const yearSum = revAmounts?.[0]?.yearSum ?? null;
  const totalSum = revAmounts?.[0]?.totalSum + 20287424.35 ?? null;

  const year = String(new Date().getFullYear());
  const yearNum = year.slice(-2);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (abortControllerRef.current) {
          abortControllerRef.current.abort();
        }

        const controller = new AbortController();
        abortControllerRef.current = controller;
        await loadData(id, { year: yearNum }, controller.signal);
      } catch (error) {
        toast.error(`Failed to load revenue`);
        updateDataMap(id, null);
      }
    };

    fetchData();
    // eslint-disable-next-line
  }, []);

  if (!revAmounts) {
    return (
      <div className="home-widget home-widget-long-loading">
        <span className={`home-widget-num ${"home-widget-loading"}`}> </span>
        <span className="home-widget-title"> </span>
      </div>
    );
  }
  const percentageOfAllTime = (yearSum / totalSum) * 100;


  return (
    <div className="home-widget home-widget-long">
      <div
        style={{ display: "flex", flexDirection: "column", textAlign: "left" }}
      >
        <h4> {year} Revenue</h4>
        <h2 style={{fontSize: '28px'}}>
          {" "}
          {dollarFormatter(yearSum)}{" "}
        </h2>
      </div>
      <div
        style={{ display: "flex", flexDirection: "column", textAlign: "left" }}
      >
        <h4> All Time</h4>
        <div style={{display: "flex", flexDirection: "row", gap: "15px", alignItems: "baseline"}}> 
        <h2 style={{fontSize: '28px'}}>
          {" "}
          {dollarFormatter(totalSum)}{" "}
        </h2>
        <span className="thisyear"> + {percentageOfAllTime.toFixed(1)}% this year </span>
        </div>
      </div>
    </div>
  );
}

export default Revenue;
