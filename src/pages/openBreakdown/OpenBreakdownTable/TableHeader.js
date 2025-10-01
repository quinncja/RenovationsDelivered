import { handshakeSvg, hardHatSvg, invoiceSvg2, lockSvg } from "business/svg";
import Searchbar from "./Searchbar";
import Filters from "./Filters";

function TableHeader(props) {
  const { data, type } = props;

  const getCommittedType = () => {
    if (type === "Subcontractors") return "Subcontracts";
    else if (type === "Material") return "Purchases";
  };
  const getComittedIcon = () => {
    if (type === "Subcontractors") return hardHatSvg();
    else if (type === "Material")
      return <div style={{ fontWeight: "600", color: "white" }}> PO </div>;
  };

  const renderComitted = () => {
    if (type === "Labor" || type === "WTPM") return;
    if (!data)
      return (
        <div className="tjh-widget">
          <div className="tjh-box "> {getComittedIcon()} </div>
          <div className="loading-widget" />
        </div>
      );
    const committed = data.parent.length;
    return (
      <div className="tjh-widget">
        <div className="tjh-box "> {getComittedIcon()} </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
          }}
        >
          <h2> {committed} </h2>
          <h4> {getCommittedType()} </h4>
        </div>
      </div>
    );
  };

  const renderPosted = () => {
    if (!data)
      return (
        <div className="tjh-widget">
          <div className="tjh-box "> {invoiceSvg2()} </div>
          <div className="loading-widget" />
        </div>
      );
    const posted = data.children.length;
    return (
      <div className="tjh-widget">
        <div className="tjh-box "> {invoiceSvg2()} </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
          }}
        >
          <h2> {posted} </h2>
          <h4> {"Invoices"} </h4>
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
        {renderComitted()}
        {renderPosted()}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            gap: "10px",
            width: "100%",
          }}
        >
          <Filters type={type} />
          <Searchbar />
        </div>
      </div>
    </div>
  );
}

export default TableHeader;
