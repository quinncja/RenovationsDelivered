import { useHome } from "context/HomeContext";
import AgingBar from "./AgingBar";
import WidgetDetails from "components/WidgetDetails/WidgetDetails";
import MoneyDisplay from "components/MoneyDisplay/MoneyDisplay";

function AgingSummary({ data, open = false }) {
  const id = "agingSummary";
  const { openData, updateFocusedId, getWidgetDataById, openPage } = useHome();
  const { focused } = openData;

  const locData = getWidgetDataById("loc")

  let displayData;
  if (open) displayData = data;
  else displayData = getWidgetDataById(id);

  if (!displayData)
    return (
      <div className="home-agingsummary-widget">
        <div className="loading-widget" />
      </div>
    );

  const titleMap = {
    current: "Current",
    over: "1 - 30 days",
    over30: "31 - 60 days",
    over60: "61 - 90 days",
    over90: "91+ days",
    total: "Total",
  };

  const titleColor = {
    current: "var(--secondary-font)",
    over: "var(--secondary-font)",
    over30: "var(--secondary-font)",
    over60: "var(--orange)",
    over90: "var(--red)",
    total: "var(--secondary-font)",
  };

  const titleWeight = {
    current: "500",
    over: "500",
    over30: "500",
    over60: "600",
    over90: "600",
    total: "600",
  };

  function getAgingTotals(data) {
    const apTotal = data
      .slice(0, 5)
      .reduce((sum, item) => sum + item.amount, 0);
    const apCount = data.slice(0, 5).reduce((sum, item) => sum + item.count, 0);

    const arTotal = data
      .slice(5, 10)
      .reduce((sum, item) => sum + item.amount, 0);
    const arCount = data
      .slice(5, 10)
      .reduce((sum, item) => sum + item.count, 0);

    const bankAmount = data[10].amount;

    return {
      apTotal,
      apCount,
      arTotal,
      arCount,
      cashFlow: arTotal + bankAmount - apTotal,
    };
  }

  const agingTotals = getAgingTotals(displayData);

  const handleItemClick = (obj, event) => {
    event.stopPropagation();
    if (!obj) return;
    if (open) updateFocusedId(`${obj.type}-${obj.aging_category}`);
    else openPage(id, `${obj.type}-${obj.aging_category}`);
  };

  const singleItem = (obj, type) => {
    const active = focused && focused === `${obj.type}-${obj.aging_category}`;

    const isAR = type === "ar";
    const total = isAR ? agingTotals.arTotal : agingTotals.apTotal;
    const percentage =
      total > 0 ? ((obj.amount / total) * 100).toFixed(1) : "0.0";

    return (
      <div
        className={`aging-box jobcost-detail-box clickable-widget ${obj.aging_category === "under7" ? "" : "left-border"} ${active && "active-aging"}`}
        onClick={(e) => handleItemClick(obj, e)}
        style={{
          display: "flex",
          flexDirection: "column",
          textAlign: "left",
          paddingInline: "25px",
          paddingBlock: "15px",
          paddingTop: "10px",
          borderLeft: "none",
        }}
      >
        <h4
          style={{
            color: titleColor[obj.aging_category],
            fontWeight: titleWeight[obj.aging_category],
          }}
        >
          {" "}
          {titleMap[obj.aging_category]}
        </h4>
        <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
          <MoneyDisplay value={obj.amount} size={18} />
          <div className="jobcost-hl" />
          <h5>
            {percentage}% • {obj.count} {obj.count === 1 ? "item" : "items"}
          </h5>
        </div>
      </div>
    );
  };

  const handleParentClick = () => {
    if (open) return;
    else openPage(id);
  };

  const liquidity = () => {
    return (
      <div
        className="widget clickable-widget"
        style={{
          display: "flex",
          flexDirection: "column",
          textAlign: "left",
          background: "var(--dark)",
          boxSizing: "border-box",
          flexGrow: 1,
        }}
        onClick={() => handleParentClick()}
      >
        <div>
          <h4>
            {" "}
            <span style={{ fontWeight: "600", color: "#9f3dac" }}>
              {" "}
              ADVIA{" "}
            </span>{" "}
            Credit Union{" "}
          </h4>
          <div style={{ height: "5px" }}> </div>
          <MoneyDisplay value={displayData[10].amount} size={32} />
          <div className="jobcost-hl" />
          <h5>Available Liquidity</h5>
        </div>
      </div>
    );
  };

  const arTotal = () => {
    return (
      <div
        className="widget clickable-widget"
        style={{
          display: "flex",
          flexDirection: "column",
          textAlign: "left",
          background: "var(--dark)",
          boxSizing: "border-box",
        }}
        onClick={() => handleParentClick()}
      >
        <h4>
          {" "}
          <span className="green" style={{ fontWeight: "600" }}>
            {" "}
            AR{" "}
          </span>{" "}
          Total Accounts Receivable{" "}
        </h4>
        <div style={{ height: "5px" }}> </div>
        <MoneyDisplay value={agingTotals.arTotal} size={32} />
        <div className="jobcost-hl" />
        <h5>{agingTotals.arCount} items</h5>
      </div>
    );
  };

  const apTotal = () => {
    return (
      <div
        className="widget clickable-widget"
        style={{
          display: "flex",
          flexDirection: "column",
          textAlign: "left",
          background: "var(--dark)",
          boxSizing: "border-box",
        }}
        onClick={() => handleParentClick()}
      >
        <h4>
          {" "}
          <span className="red" style={{ fontWeight: "600" }}>
            {" "}
            AP{" "}
          </span>{" "}
          Total Accounts Payable{" "}
        </h4>
        <div style={{ height: "5px" }}> </div>
        <MoneyDisplay value={agingTotals.apTotal} size={32} />
        <div className="jobcost-hl" />
        <h5>{agingTotals.apCount} items</h5>
      </div>
    );
  };

  const cashPosition = () => {
    return (
      <div
        className={`widget clickable-widget ${agingTotals.cashFlow > 0 ? "green-background" : "red-background"}`}
        style={{
          display: "flex",
          flexDirection: "column",
          textAlign: "left",
          justifyContent: "center",
          background: "var(--dark)",
          height: "fit-content",
          boxSizing: "border-box",
        }}
        onClick={() => handleParentClick()}
      >
        <h4 style={{ color: "white" }}> Cash Position </h4>
        <div style={{ height: "5px" }}> </div>
        <MoneyDisplay
          className={agingTotals.cashFlow > 0 ? "green" : "red"}
          value={agingTotals.cashFlow}
          size={32}
        />
        <div className="jobcost-hl" />
        <h5>
          {agingTotals.cashFlow > 0
            ? "Positive Cash Flow"
            : "Negative Cash Flow"}
        </h5>
      </div>
    );
  };
  const locTotal = () => {
    return (
      <div
        className="widget clickable-widget"
        style={{
          display: "flex",
          flexDirection: "column",
          textAlign: "left",
          background: "var(--dark)",
          boxSizing: "border-box",
          flexGrow: 1,
        }}
        onClick={() => handleParentClick()}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            height: "100%",
            gap: "10px",
          }}
        >
          <div>
            <WidgetDetails type={"loc"} />
            <h4>
              {" "}
              <span style={{ fontWeight: "600", color: "#9f3dac" }}>
                {" "}
                ADVIA{" "}
              </span>{" "}
              Line of Credit{" "}
            </h4>

            <div style={{ height: "5px" }}> </div>
            <MoneyDisplay value={locData.loc} size={32} />
            <div className="jobcost-hl" />
            <h5> Based on period {locData.period} AR data </h5>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
            <AgingBar
              color={"#9f3dac"}
              max={locData.loc}
              current={displayData[11].amount}
            />
          </div>
        </div>
      </div>
    );
  };
  return (
    <>
      <div
        style={{
          boxSizing: "border-box",
          position: "relative",
          width: "100%",
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1.5fr",
          gap: "10px",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          {cashPosition()}
          {arTotal()}
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          {liquidity()}
          {apTotal()}
        </div>

        {locTotal()}
      </div>

      <div
        className="home-agingsummary-widget clickable-widget"
        onClick={() => handleParentClick()}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          <div
            style={{
              display: "flex",
              paddingLeft: "25px",
              flexDirection: "row",
              alignItems: "center",
              gap: "15px",
            }}
          >
            <div
              style={{
                height: "10px",
                width: "10px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                background: "var(--green)",
                padding: "10px",
                borderRadius: "5px",
              }}
            >
              <h3 style={{ fontSize: "12px" }}> AR </h3>
            </div>
            <h3 style={{ fontSize: "16px" }}> Recievables Aging </h3>
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr 1fr 1fr 1fr ",
            }}
          >
            {displayData.slice(5, 10).map((item) => singleItem(item, "ar"))}
          </div>
        </div>
      </div>
      <div
        className="home-agingsummary-widget clickable-widget"
        onClick={() => handleParentClick()}
      >
        <div
          className="border-after"
          style={{ display: "flex", flexDirection: "column", gap: "10px" }}
        >
          <div
            style={{
              display: "flex",
              paddingLeft: "25px",
              flexDirection: "row",
              alignItems: "center",
              gap: "15px",
            }}
          >
            <div
              style={{
                height: "10px",
                width: "10px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                background: "var(--red)",
                padding: "10px",
                borderRadius: "5px",
              }}
            >
              <h3 style={{ fontSize: "12px" }}> AP </h3>
            </div>
            <h3 style={{ fontSize: "16px" }}> Payables Aging </h3>
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr 1fr 1fr 1fr ",
            }}
          >
            {displayData.slice(0, 5).map((item) => singleItem(item, "ap"))}
          </div>
        </div>
      </div>
    </>
  );
}

export default AgingSummary;
