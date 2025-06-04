import { useJobCostContext } from "context/JobCostContext";
import { getColor } from "utils/colors";

function Filters({type}) {
  const { breakdownData, updateFocusedId, typeFilter, setTypeFilter } =
    useJobCostContext();
  const { focused } = breakdownData;

  const toggleFilter = (filterValue) => {
    setTypeFilter(typeFilter === filterValue ? false : filterValue);
  };

  const text = type === "Material" ? "Purchase Orders" : "Subcontracts"
  const text2 = type === "Material" ? "PO" : "Subcontract"

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        width: "100%",
        gap: "5px",
      }}
    >
      {" "}
      {focused && (
        <div
          className={`margin-filter margin-filter-active`}
          onClick={() => updateFocusedId(focused)}
        >
          <span
            className="phase-dot-small under-dot "
            style={{ background: getColor(focused, "Tranquil") }}
          ></span>
          <h4>{focused}</h4>
        </div>
      )}
      {type === "Material" || type === "Subcontractors" ?
        <>
      <div
        className={`margin-filter ${typeFilter === "parent" ? "margin-filter-active" : ""}`}
        onClick={() => toggleFilter("parent")}
      >
        <h4> {text} </h4>
      </div>
      <div
        className={`margin-filter ${typeFilter === "orphan" ? "margin-filter-active" : ""}`}
        onClick={() => toggleFilter("orphan")}
        title={`Invoices not tied to a ${text2}`}
      >
        <h4> Orphaned Invoices </h4>
      </div>
      </>
        :
        <div
        className={`margin-filter ${typeFilter === "committed" ? "margin-filter-active" : ""}`}
        style={{opacity: 0}}> 
           <h4> - </h4>
      </div>
 
      }
    </div>
  );
}

export default Filters;
