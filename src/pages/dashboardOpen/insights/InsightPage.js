import PieChart from "./PieChart";
import { useProjectContext } from "context/ProjectContext";
import InsightEntry from "./InsightEntry";

function InsightPage({ type, focused, data }) {
  const { getJobStr } = useProjectContext();

  const { widgetData, homeData } = data || {};

  if (!widgetData || !homeData) {
    return (
      <>
        <div className="insight-header" style={{ position: "relative" }}>
          {" "}
          <div className="loading-widget" />{" "}
        </div>
        <div className="insight-wrapper" style={{ position: "relative" }}>
          {" "}
          <div className="loading-widget" />{" "}
        </div>
        <div
          className="insight-entries"
          style={{ position: "relative", height: "400px" }}
        >
          {" "}
          <div className="loading-widget" />{" "}
        </div>
      </>
    );
  }

  const trimmedType = type ? type.split("-")[0] : "";
  const year = new Date().getFullYear();
  const typeSplit = type
    ? type.split(["-"])[0].charAt(0).toUpperCase() +
      type.split(["-"])[0].slice(1)
    : "";

  let topYear = widgetData ? widgetData[0].id : "";
  if (trimmedType === "project" && widgetData)
    topYear = getJobStr(widgetData[0].detailId);
  const topValue = widgetData ? widgetData[0].value : "";
  let prevTop = homeData ? homeData[0].id : "";
  if (trimmedType === "project" && homeData)
    prevTop = getJobStr(homeData[0].detailId);

  const prevValue = homeData ? homeData[0].value : "";
  const sumValues = (array) => {
    if (!array || !Array.isArray(array)) {
      console.log("sumValues received:", array);
      return 0;
    }
    return array.reduce((sum, obj) => sum + (obj.value || 0), 0);
  };

  const currentSum = widgetData ? sumValues(widgetData) : null;
  const prevSum = homeData ? sumValues(homeData) : null;

  return (
    <>
      <div className="insight-header">
        <div
          style={{
            width: "50%",
            paddingLeft: "25px",
            display: "flex",
            flexDirection: "row",
            gap: "30px",
            alignItems: "center",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              textAlign: "left",
              justifyContent: "center",
              gap: "5px",
            }}
          >
            <h2 style={{fontSize: "32px"}}> {widgetData ? widgetData.length : ""} </h2>
            <h4>  {year} Total {typeSplit}s </h4>
          </div>
        </div>
        <div
          className="left-border"
          style={{
            width: "50%",
            paddingLeft: "25px",
            display: "flex",
            flexDirection: "row",
            gap: "30px",
            alignItems: "center",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              textAlign: "left",
              justifyContent: "center",
              gap: "5px",
            }}
          >
            
            <h2 style={{fontSize: "32px"}}> {homeData ? homeData.length : ""} </h2>
            <h4>  {year-1} Total {typeSplit}s </h4>
          </div>
        </div>
      </div>
      <div className="insight-wrapper">
        <div
          style={{
            width: "50%",
            alignItems: "center",
            display: "flex",
            boxSizing: "border-box",
            position: "relative",
            paddingLeft: "20px",
            alignSelf: "center",
            flexDirection: "column",
            textAlign: "left",
            justifyContent: "center",
          }}
        >
          <PieChart type={trimmedType} data={widgetData} />
        </div>
        <div
          className="left-border"
          style={{
            width: "50%",
            alignItems: "center",
            boxSizing: "border-box",
            position: "relative",
            paddingLeft: "25px",
            display: "flex",
            alignSelf: "center",
            flexDirection: "column",
            textAlign: "left",
            justifyContent: "center",
          }}
        >
          <PieChart type={trimmedType} data={homeData} />
        </div>
      </div>

      <div className="insight-entries">
        <div
          class="entri"
          style={{
            width: "50%",
            display: "flex",
            flexDirection: "column",
            gap: "1px",
            boxSizing: "border-box",
          }}
        >
          {widgetData.map((data, index) => (
            <InsightEntry
              data={{ ...data, sum: currentSum, type: trimmedType }}
              index={index}
            />
          ))}
        </div>
        <div
          class="entri border-left"
          style={{
            width: "50%",
            display: "flex",
            flexDirection: "column",
            gap: "1px",
            boxSizing: "border-box",
          }}
        >
          {homeData.map((data, index) => (
            <InsightEntry
              data={{ ...data, sum: prevSum, type: trimmedType }}
              index={index}
            />
          ))}
        </div>
      </div>
    </>
  );
}

export default InsightPage;
