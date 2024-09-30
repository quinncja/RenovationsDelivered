export function SingleMargin(props) {
  const { data } = props;
  const margin = data[0].data[0] ? data[0].data[0].y.toFixed(2) : "";

  // let text;
  // let currMargin;
  // let prevMargin;
  // if (data.previous.length === 0) {
  //   text = (
  //     <>
  //       {" "}
  //       No data <br /> from last phase{" "}
  //     </>
  //   );
  //   currMargin = data.current[0].y.toFixed(2);
  // } else {
  //   currMargin = data.current[0].y.toFixed(2);
  //   prevMargin = data.previous[0].y.toFixed(2);
  //   const diff = currMargin - prevMargin;
  //   text = (
  //     <>
  //       {" "}
  //       {diff > 0 ? "Up" : "Down"} {diff.toFixed(2)}% <br /> from last phase{" "}
  //     </>
  //   );
  // }

  return (
    <div className="single-margin-container">
      <div className="big-margin-text">{margin}%</div>
      <div className="last-phase">
        <span>{}</span>
      </div>
    </div>
  );
}
