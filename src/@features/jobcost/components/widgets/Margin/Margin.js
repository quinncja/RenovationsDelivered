import { displayMargin, getMarginColor } from "@shared/utils/functions";
import { useJobcostContext } from "@features/jobcost/context/JobcostContext";
import useIsAdmin from "@shared/hooks/useIsAdmin";
import MarginBarChart from "./MarginBarChart";
import MoneyDisplay from "@shared/components/MoneyDisplay/MoneyDisplay";

function Margin() {
  const { getDataByType } = useJobcostContext();
  const id = "margin";
  const data = getDataByType(id);
  const isAdmin = useIsAdmin();

  if (!data) return;

  const total = data.find((item) => item.id === "total");
  const marginColor = getMarginColor(total.value);

  const phaseData = data
    .filter((item) => item.id !== "total")
    .sort((a, b) => a.phase.localeCompare(b.phase));

  if (phaseData.length <= 1) return;

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
        Margin Performance
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
          }}
        >
          <h4> Closed Margin</h4>
          <h2 style={{ fontSize: "32px", color: marginColor }}>
            {" "}
            {displayMargin(total.value)}{" "}
          </h2>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "6px",
            width: "100%",
          }}
        >
          {isAdmin && (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                textAlign: "left",
              }}
            >
              <h4> Profit </h4>
              <MoneyDisplay
                size={32}
                value={total.TotalContract - total.TotalCost}
              />
            </div>
          )}
        </div>
      </div>
      <MarginBarChart phaseData={phaseData} marginColor={"#acadae"} />
    </div>
  );
}

export default Margin;
