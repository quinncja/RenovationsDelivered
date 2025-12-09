import { useDashboard } from "@features/dashboard/context/DashboardContext";
import { percentFomatter } from "@shared/utils/functions";
import PhaseCount from "./PhaseCompletion";
import MoneyDisplay from "@shared/components/MoneyDisplay/MoneyDisplay";

function YearCompletion() {
  const id = "marginPerformance";
  const { getWidgetDataById } = useDashboard();
  const data = getWidgetDataById(id);
  const homeRevData = getWidgetDataById("annualRevenueTrend");
  if (!data || !homeRevData)
    return (
      <div
        className="widget loading-widget"
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "15px",
          boxSizing: "border-box",
          paddingBlock: "25px",
          height: "611px",
        }}
      ></div>
    );

  const total = data.find((item) => item.id === "total");
  const year = new Date().getFullYear();
  const yearSum = homeRevData.find((item) => item.year === year)?.revenue;

  const completionPercentage = Math.round(
    (total.TotalContract / yearSum) * 100,
  );
  const closedContract = () => {
    return (
      <div
        className="widget sub-widget"
        style={{
          display: "flex",
          flexDirection: "column",
          boxSizing: "border-box",
          justifyContent: "center",
          width: "23%",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-evenly",
            height: "100%",
            textAlign: "left",
          }}
        >
          <div style={{ display: "flex", gap: "5px", alignItems: "center" }}>
            <div
              style={{
                width: "10px",
                height: "10px",
                borderRadius: "50px",
                background: "var(--closed)",
              }}
            ></div>

            <div className="widget-title">  Completed </div>
          </div>
          <MoneyDisplay value={total.TotalContract} size={26} />
        </div>
      </div>
    );
  };

  const remainingContract = () => {
    return (
      <div
        className="widget sub-widget"
        style={{
          display: "flex",
          flexDirection: "column",
          boxSizing: "border-box",
          justifyContent: "center",
          width: "23%",
          height: "100px",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-evenly",
            height: "100%",
            textAlign: "left",
          }}
        >
          <div style={{ display: "flex", gap: "5px", alignItems: "center" }}>
            <div
              style={{
                width: "10px",
                height: "10px",
                borderRadius: "50px",
                background: "var(--open)",
              }}
            ></div>
            <div className="widget-title"> Remaining </div>
          </div>
          <MoneyDisplay value={yearSum - total.TotalContract} size={26} />
        </div>
      </div>
    );
  };

  const totalContract = () => {
    return (
      <div
        className="widget sub-widget"
        style={{
          display: "flex",
          flexDirection: "column",
          boxSizing: "border-box",
          justifyContent: "center",
          width: "23%",
          height: "100px",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-evenly",
            height: "100%",
            textAlign: "left",
          }}
        >
          <div style={{ display: "flex", gap: "5px", alignItems: "center" }}>
            <div className="widget-title"> Total Contracted </div>
          </div>
          <MoneyDisplay value={yearSum} size={26} />
        </div>
      </div>
    );
  };

  const completed = () => {
    return (
      <div
        className="widget sub-widget"
        style={{
          display: "flex",
          flexDirection: "column",
          boxSizing: "border-box",
          justifyContent: "center",
          width: "23%",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-evenly",
            height: "100%",
            textAlign: "left",
          }}
        >
          <div style={{ display: "flex", gap: "5px", alignItems: "center" }}>
            <div className="widget-title">  Percent Completed </div>
          </div>
          <h2 style={{ fontSize: "26px" }}>
            {" "}
            {percentFomatter(completionPercentage)}{" "}
          </h2>
        </div>
      </div>
    );
  };

  return (
    <div
      className="widget"
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "15px",
        boxSizing: "border-box",
        paddingBlock: "25px",
      }}
    >
      <div className="widget-title">
        {" "}
        Contract Completion{" "}
      </div>

      <div style={{ display: "flex", flexDirection: "row", gap: "15px" }}>
        {completed()}
        {totalContract()}
        {closedContract()}
        {remainingContract()}
      </div>

      <PhaseCount />
    </div>
  );
}

export default YearCompletion;
