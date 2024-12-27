import { dateTimeToString } from "utils/formatters";

function Header(props) {
  const {
    ranOn,
    type,
    ranBy,
    view,
    changeView,
    changeInvoiceFilter,
    changeTypeFilter,
    typeFilter,
    invoiceFilter,
    sortOrder,
    changeSortOrder,
    groupBy,
    changeGroupBy,
  } = props;

  const reportInfo = () => {
    return (
      <div style={{ display: "flex", alignItems: "baseline", gap: "10px" }}>
        <h2 style={{ margin: "0px" }}> {dateTimeToString(new Date(ranOn))} </h2>
        <div className="home-widget-title"> Ran by {ranBy} </div>
      </div>
    );
  };
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "baseline",
        width: "calc(100% - 3rem - 10px)",
        paddingTop: "0px",
      }}
    >
      {reportInfo()}
      <div style={{ display: "flex", gap: "1rem" }}>
        <button
          className={`sub-tab-button sub-active-tab-button`}
          onClick={changeView}
        >
          {" "}
          Showing ({view}){" "}
        </button>
        {type === "cogs" ? (
          <>
            <button
              className={`sub-tab-button ${sortOrder !== "none" ? "sub-active-tab-button" : ""}`}
              onClick={changeSortOrder}
            >
              Sort by Date ({sortOrder})
            </button>
          </>
        ) : type === "data-validation" ? (
          <button
            className={`sub-tab-button ${typeFilter !== "none" ? "sub-active-tab-button" : ""}`}
            onClick={changeTypeFilter}
          >
            Filter by Type ({typeFilter})
          </button>
        ) : type === "invoice-validation" ? (
          <button
            className={`sub-tab-button ${invoiceFilter !== "none" ? "sub-active-tab-button" : ""}`}
            onClick={changeInvoiceFilter}
          >
            Filter by Type ({invoiceFilter})
          </button>
        ) : (
          <></>
        )}
        <button
          className={`sub-tab-button ${groupBy !== "none" ? "sub-active-tab-button" : ""}`}
          onClick={changeGroupBy}
        >
          Group By ({groupBy})
        </button>
      </div>
    </div>
  );
}

export default Header;
