import { dateFormatter, dollarFormatter } from "@shared/utils/functions";

function AgingItems({ data }) {
  if (!data)
    return (
      <div className="widget-wrapper">
        {" "}
        <div className="loading-widget" />{" "}
      </div>
    );

  const renderItem = (item) => {
    const type = item.type.slice(0, 2);
    return (
      <div className="aging-item phase-body clickable-widget">
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "40px 1fr 120px 120px 120px 120px 140px",
            alignItems: "center",
            gap: "15px",
            width: "100%",
          }}
        >
          <div
            style={{
              height: "10px",
              width: "10px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              background:
                type === "AP"
                  ? "var(--red)"
                  : type === "AR"
                    ? "var(--green)"
                    : "#9f3dac",
              padding: "10px",
              borderRadius: "5px",
            }}
          >
            <h3 style={{ fontSize: "12px" }}> {type} </h3>
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "2px",
              textAlign: "left",
              minWidth: 0,
            }}
          >
            <h4
              style={{
                color: "white",
                fontWeight: "600",
                margin: 0,
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }}
            >
              {item.dscrpt}
            </h4>
            <h4
              style={{
                margin: 0,
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }}
            >
              {item.vndnum}
            </h4>
          </div>

          <div
            style={{
              display: "flex",
              gap: "2px",
              flexDirection: "column",
              alignItems: "flex-start",
              textAlign: "left",
            }}
          >
            <h4 style={{ margin: 0 }}>{"Job #"}</h4>
            <h4 style={{ color: "var(--white)", margin: 0 }}>{item.jobnum}</h4>
          </div>

          <div
            style={{
              display: "flex",
              gap: "2px",
              flexDirection: "column",
              alignItems: "flex-start",
              textAlign: "left",
            }}
          >
            <h4 style={{ margin: 0 }}>{"Record #"}</h4>
            <h4 style={{ color: "var(--white)", margin: 0 }}>{item.recnum}</h4>
          </div>

          <div
            style={{
              display: "flex",
              gap: "2px",
              flexDirection: "column",
              alignItems: "flex-start",
              textAlign: "left",
            }}
          >
            <h4 style={{ margin: 0 }}>{"Invoiced"}</h4>
            <h4 style={{ color: "var(--white)", margin: 0 }}>
              {dateFormatter(item.invdte)}
            </h4>
          </div>

          <div
            style={{
              display: "flex",
              gap: "2px",
              flexDirection: "column",
              alignItems: "flex-start",
              textAlign: "left",
            }}
          >
            <h4 style={{ margin: 0 }}>{"Due"}</h4>
            <h4 style={{ color: "var(--white)", margin: 0 }}>
              {dateFormatter(item.duedte)}
            </h4>
          </div>

          <div
            style={{
              display: "flex",
              gap: "2px",
              flexDirection: "column",
              alignItems: "flex-end",
              textAlign: "right",
            }}
          >
            <h4 style={{ margin: 0 }}>{"Balance"}</h4>
            <h4 style={{ color: "var(--white)", margin: 0 }}>
              {dollarFormatter(item.invbal)}
            </h4>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div>
      {data.length > 0 ? (
        data.map((item, index) => renderItem(item))
      ) : (
        <h4
          style={{
            color: "white",
            paddingTop: "20px",
            textAlign: "left",
            paddingLeft: "25px",
          }}
        >
          No items to display
        </h4>
      )}
    </div>
  );
}

export default AgingItems;
