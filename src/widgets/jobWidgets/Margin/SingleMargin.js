import { phaseToMonth } from "utils/formatters";

export function SingleMargin(props) {
  const { data } = props;
  let currMargin;
  let prevMargin;
  if (data[0].data.length > 1) {
    currMargin = data[0]?.data[1]?.y.toFixed(2) || "";
    prevMargin = data[0]?.data[0]?.y.toFixed(2) || "";
  } else currMargin = data[0]?.data[0]?.y.toFixed(2) || "";
  console.log(currMargin)
  let text;
  if (currMargin === "100.00") {
    text = (
      <>
      </>
    )
  }
  else if (!prevMargin) {
    text = (
      <>
        {" "}
        No data <br /> from last phase{" "}
      </>
    );
  } else {
    const diff = currMargin - prevMargin;
    text = (
      <>
        {" "}
        {diff > 0 ? "Up" : "Down"} {diff.toFixed(2)}% <br /> from{" "}
        {phaseToMonth(data[0].data[0].x)}{" "}
      </>
    );
  }

  return (
    <div className="single-margin-container">
      <div className="big-margin-text">{currMargin === "100.00" ? "-- " : currMargin}%</div>
      <div className="last-phase">
        <span>{text}</span>
      </div>
    </div>
  );
}
