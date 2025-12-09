import MoneyDisplay from "@shared/components/MoneyDisplay/MoneyDisplay";
import { capitalizeFirstLetter } from "@shared/utils/functions";
import { useState } from "react";
import { motion } from "framer-motion";
import LineChart from "./LineChart";

const {
  useJobcostContext,
} = require("@features/jobcost/context/JobcostContext");

function ContractTrend() {
  const { getDataByType } = useJobcostContext();
  const id = "contractTrend";
  const data = getDataByType(id);

  const [groupBy, setGroupBy] = useState("phase");
  if (!data) return;

  const getAverage = () => {
    const total = data.reduce((sum, item) => sum + item.y, 0);
    const sections =
      groupBy === "phase"
        ? data.length
        : new Set(data.map((item) => item.year)).size;
    return total / sections;
  };

  const processedData =
    groupBy === "year"
      ? Object.values(
          data.reduce((acc, item) => {
            if (!acc[item.year]) {
              acc[item.year] = { year: item.year, y: 0 };
            }
            acc[item.year].y += item.y;
            return acc;
          }, {}),
        )
      : Object.values(
          data.reduce((acc, item) => {
            const phase = item.phase === 0 || item.phase > 12 ? 13 : item.phase;
            const key = `${item.year}-${phase}`;

            if (!acc[key]) {
              acc[key] = { year: item.year, phase: phase, y: 0 };
            }
            acc[key].y += item.y;
            return acc;
          }, {}),
        ).sort((a, b) => {
          if (a.year !== b.year) {
            return a.year - b.year;
          }
          if (a.phase === 13) return 1;
          if (b.phase === 13) return -1;
          return a.phase - b.phase;
        });

  const dateRange =
    processedData.length > 0
      ? groupBy === "year"
        ? `${processedData[0].year} - ${processedData[processedData.length - 1].year}`
        : `P${processedData[0].phase} ${processedData[0].year} - P${processedData[processedData.length - 1].phase} ${processedData[processedData.length - 1].year}`
      : "No date range";

  const groupByToggle = () => {
    return (
      <div
        className="toggle-group"
        style={{
          display: "flex",
          flexDirection: "row",
          width: "50%",
          gap: "5px",
          alignItems: "center",
          position: "relative",
        }}
      >
        <motion.div
          className="toggle-indicator"
          layout
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 30,
          }}
          style={{
            position: "absolute",
            height: "calc(100% - 6px)",
            width: "calc(50% - 6px)",
            backgroundColor: "var(--dark-selected)",
            borderRadius: "4px",
            zIndex: 0,
            left: groupBy === "phase" ? "3px" : "calc(50% + 3px)",
          }}
        />
        <button
          title="Group by Phase"
          className={`toggle-button ${groupBy === "phase" ? "active-toggle-button" : ""}`}
          style={{ flexGrow: 1 }}
          onClick={() => setGroupBy("phase")}
        >
          Phase
        </button>
        <button
          title="Group by Year"
          className={`toggle-button ${groupBy === "phase" ? "active-toggle-button" : ""}`}
          style={{ flexGrow: 1 }}
          onClick={() => setGroupBy("year")}
        >
          Year
        </button>
      </div>
    );
  };

  return (
    <div className="home-margin-widget">
      <div
        className="widget-title"
        style={{
          textAlign: "left",
          paddingBottom: "10px",
          fontWeight: "500",
          position: "absolute",
          top: "20px",
          left: "25px",
        }}
      >
        Contract Trend
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          textAlign: "left",
          justifyContent: "center",
          width: "30%",
          gap: "20px",
          flexShrink: "0",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            textAlign: "left",
            gap: "10px",
          }}
        >
          <h4> {capitalizeFirstLetter(groupBy)} Average </h4>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              textAlign: "left",
              gap: "5px",
            }}
          >
            <MoneyDisplay value={getAverage()} size={32} />
            <h5>
              {" "}
              {processedData.length} {capitalizeFirstLetter(groupBy)}s •{" "}
              {dateRange}
            </h5>
          </div>
        </div>
        {groupByToggle()}
      </div>
      <LineChart data={processedData} groupBy={groupBy} />
    </div>
  );
}

export default ContractTrend;
