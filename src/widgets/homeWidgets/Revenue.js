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
  return (
    <div className="home-widget home-widget-long">
      <div
        style={{ display: "flex", flexDirection: "column", textAlign: "left" }}
      >
        <span className="home-widget-title"> {year} Revenue</span>
        <span className={`home-widget-num smaller-num`}>
          {" "}
          {dollarFormatter(yearSum)}{" "}
        </span>
      </div>
      <div
        style={{ display: "flex", flexDirection: "column", textAlign: "left" }}
      >
        <span className="home-widget-title"> All Time</span>
        <span className={`home-widget-num smaller-num`}>
          {" "}
          {dollarFormatter(totalSum)}{" "}
        </span>
      </div>
    </div>
  );
}

export default Revenue;
