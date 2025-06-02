import { handshakeSvg, lockSvg } from "business/svg";
import Searchbar from "./Searchbar";
import Filters from "./Filters";

function TableHeader(props) {
  const { data } = props;

  const renderPosted = () => {
    if (!data)
      return (
        <div className="tjh-widget">
          <div className="tjh-box "> {lockSvg()} </div>
          <div className="loading-widget" />
        </div>
      );
    const posted = data.filter((item) => item.type === "posted").length;
    return (
      <div className="tjh-widget">
        <div className="tjh-box "> {lockSvg()} </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
          }}
        >
          <h2> {posted} </h2>
          <h4> {"Posted"} </h4>
        </div>
      </div>
    );
  };
  const renderComitted = () => {
    if (!data)
      return (
        <div className="tjh-widget">
          <div className="tjh-box "> {handshakeSvg()} </div>
          <div className="loading-widget" />
        </div>
      );
    const committed = data.filter((item) => item.type === "committed").length;
    return (
      <div className="tjh-widget">
        <div className="tjh-box "> {handshakeSvg()} </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
          }}
        >
          <h2> {committed} </h2>
          <h4> {"Committed"} </h4>
        </div>
      </div>
    );
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        gap: "5px",
      }}
    >
      <div style={{ display: "flex", gap: "10px", width: "100%" }}>
        {renderPosted()}
        {renderComitted()}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            gap: "10px",
            width: "100%",
          }}
        >
          <Filters />
          <Searchbar />
        </div>
      </div>
    </div>
  );
}

export default TableHeader;
