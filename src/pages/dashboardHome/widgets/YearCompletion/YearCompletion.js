import { useHome } from "context/HomeContext";
import { percentFomatter } from "utils/formatters";
import PhaseCount from "./PhaseCount";
import MoneyDisplay from "components/MoneyDisplay/MoneyDisplay";

function YearCompletion() {
  const id = "margin";
  const { getWidgetDataById } = useHome();
  const data = getWidgetDataById(id);
  const homeRevData = getWidgetDataById("homeRev");
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

            <h4> Completed </h4>
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
            <h4> Remaining </h4>
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
            <h4> Total Contracted </h4>
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
            <h4> Percent Completed</h4>
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
      <h3
        style={{ textAlign: "left", paddingBottom: "10px", fontWeight: "500" }}
      >
        {" "}
        Contract Completion{" "}
      </h3>

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
