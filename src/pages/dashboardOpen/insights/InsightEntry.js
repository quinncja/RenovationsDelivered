import { useProjectContext } from "context/ProjectContext";
import { formatNumberShort } from "utils/formatters";

function InsightEntry(props) {
  const { data, index } = props;
  const { sum, type } = data;
  const { getJobStr } = useProjectContext();
  const getPercentage = (value) => {
    if (sum === 0) return "0%";
    const percentage = (value / sum) * 100;
    return `${percentage.toFixed(2)}%`;
  };
  const getName = () => {
    if (type === "project") return getJobStr(data.jobNumber);
    else return data.id;
  };

  return (
    <div className="insight-item entry-item" key={index}>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          gap: "10px",
        }}
      >
        <div
          className={`insight-box insight-box-${index}`}
          style={{ flexShrink: "0" }}
        >
          <h4> {index + 1} </h4>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
          }}
        >
          <h4
            className="truncate-text"
            style={{ color: "var(--white)", textAlign: "left" }}
          >
            {" "}
            {getName()}{" "}
          </h4>
          <h4> {getPercentage(data.value)} </h4>
        </div>
      </div>
      <h4 style={{ color: "var(--white)", fontWeight: 600, fontSize: "16px" }}>
        {" "}
        ${formatNumberShort(data.value)}{" "}
      </h4>
    </div>
  );
}

export default InsightEntry;
