import { displayMargin, getMarginColor } from "utils/funcs";
import { useJobCostContext } from "context/JobCostContext";
import useIsAdmin from "utils/hooks/useIsAdmin";
import MarginBarChart from "./MarginBarChart";
import MoneyDisplay from "components/MoneyDisplay/MoneyDisplay";

function Margin() {
  const { getDataByType } = useJobCostContext();
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
              <MoneyDisplay size={32} value={total.TotalContract - total.TotalCost}/>
            </div>
          )}
        </div>
      </div>
      <MarginBarChart phaseData={phaseData} marginColor={"#acadae"} />
    </div>
  );
}

export default Margin;
