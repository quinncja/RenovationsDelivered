import { useHome } from "context/HomeContext";
import MonthlyYearRevenueLineChart from "./MonthlyYearRevenueLineChart";

function MonthlyYearRevenue() {
  const id = "monthlyRevenueComparison";
  const { getWidgetDataById } = useHome();
  const data = getWidgetDataById(id);

  if (!data) return <div className="home-yearrevenue-widget loading-widget" />;

  const year = new Date().getFullYear();

  return (
    <div className="home-yearrevenue-widget">
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          padding: "25px",
          paddingBottom: "0px",
          alignItems: "flex-start",
        }}
      >
        <h3 style={{ fontWeight: 500, fontSize: "16px" }}>
          Monthly Revenue Comparison
        </h3>
        <div style={{ display: "flex", flexDirection: "row", gap: "20px" }}>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              gap: "10px",
              alignItems: "center",
            }}
          >
            <div
              style={{
                width: "15px",
                height: "15px",
                borderRadius: "15px",
                background: "var(--green)",
              }}
            />
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                textAlign: "left",
              }}
            >
              <h4 style={{ color: "#ffffff" }}> {year} </h4>
            </div>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              gap: "10px",
              alignItems: "center",
            }}
          >
            <div
              style={{
                width: "15px",
                height: "15px",
                borderRadius: "15px",
                background: "var(--closed)",
              }}
            />
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                textAlign: "left",
              }}
            >
              <h4 style={{ color: "#ffffff" }}> {year - 1} </h4>
            </div>
          </div>
        </div>
      </div>
      <div style={{ flex: 1, minHeight: 0 }}>
        <MonthlyYearRevenueLineChart data={data} />
      </div>
    </div>
  );
}

export default MonthlyYearRevenue;
