import { fileSvg, sortSvg, tableArrow } from "business/svg";
import { useModalContext } from "context/ModalContext";
import { useState, useEffect } from "react";
import { getColor } from "utils/colors";

import {
  costTypeFormatter,
  dateFormatter,
  dollarFormatter,
  formatSageUsername,
  jobStatusFormatter,
  percentFomatter,
  phaseToMonth,
  statusFormatter,
} from "utils/formatters";
import { capitalizeFirstLetter } from "utils/funcs";

function TableEntry({
  headers,
  entry,
  currentId,
  nestingLevel = 0,
  oldStyle,
}) {
  const [showData, setShowData] = useState(false);
  const toggleData = () => {
    setShowData(!showData);
  };

  const { openModalWithData } = useModalContext();

  useEffect(() => {
    if (currentId && nestingLevel === 0) setShowData(true);
    else setShowData(false);
  }, [currentId, nestingLevel]);

  const subHeaderMap = {
    orderDate: "Order Date",
    costDate: "Date",
    orderTotal: "Order Total",
    invoiceStatus: "Status",
    jobNumber: "Job Number",
    jobNum: "Job Number",
    jobName: "Job",
    orderNum: "PO Number",
    orderDesc: "Description",
    phase: "Phase",
    jobStatus: "Status",
    dscrpt: "Description",
    costType: "Cost Type",
    marginPercentage: "Margin",
    totalCost: "COGS",
    contractValue: "Contract",
    dueDate: "Due Date",
    invoiceNum: "Invoice Num",
    BudgetedAmount: "Budget",
    budgetedAmount: "Budget",
    invoices: "Invoices",
    id: "Vendor",
    value: "Amount",
    insdte: "Date Created",
    insusr: "Created By",
    upddte: "Date Updated",
    updusr: "Updated By",
    recnum: "Record Number",
    status: "Status",
    parent: "Parent",
    type: "Type",
  };

  const formatFuncMap = {
    x: phaseToMonth,
    Budgeted: dollarFormatter,
    Contracted: dollarFormatter,
    COGS: dollarFormatter,
    value: dollarFormatter,
    total: dollarFormatter,
    remaining: dollarFormatter,
    "Budget Difference ($)": dollarFormatter,
    "Budget Difference (%)": percentFomatter,
    "Contract Difference ($)": dollarFormatter,
    "Contract Difference (%)": percentFomatter,
    Margin: percentFomatter,
    value: dollarFormatter,
    unpaid: dollarFormatter,
    paid: dollarFormatter,
    orderTotal: dollarFormatter,
    invoiceStatus: statusFormatter,
    orderDate: dateFormatter,
    contractValue: dollarFormatter,
    jobStatus: jobStatusFormatter,
    Total: dollarFormatter,
    subStatus: jobStatusFormatter,
    costDate: dateFormatter,
    costType: costTypeFormatter,
    marginPercentage: percentFomatter,
    totalCost: dollarFormatter,
    budgetedAmount: dollarFormatter,
    Budget: dollarFormatter,
    Cost: dollarFormatter,
    dueDate: dateFormatter,
    BudgetedAmount: dollarFormatter,
    insdte: dateFormatter,
    insusr: formatSageUsername,
    upddte: dateFormatter,
    updusr: formatSageUsername,
    type: capitalizeFirstLetter,
  };

  const formatEntry = (item, header) => {
    let value = Array.isArray(item) ? item.length : item;
    const formatter = formatFuncMap[header];
    if (formatter) value = formatter(value);
    return value;
  };

  const getSubInfo = (obj) => {
    let subId = null;
    let subColumns = null;

    const excludedKeys = ["imagePath", "imageName", "imageUser", "parent", "costType", "id", "status", "type"];

    for (let key in obj) {
      if (Array.isArray(obj[key]) && obj[key].length > 0) {
        subId = key;
        break; 
      }
    }

    if (subId && obj[subId] && obj[subId].length > 0) {
      const subKeys = Object.keys(obj[subId][0]).filter(
        key => !excludedKeys.includes(key)
      );
      
      const orderedKeys = Object.keys(subHeaderMap).filter((key) =>
        subKeys.includes(key)
      );
      const remainingKeys = subKeys.filter((key) => !subHeaderMap.hasOwnProperty(key));
      const sortedKeys = [...orderedKeys, ...remainingKeys];
      
      subColumns = sortedKeys.map((key) => ({
        key,
        header: subHeaderMap[key] || key,
      }));
    }

    return { subId, subColumns };
  };

  const { subId, subColumns } = getSubInfo(entry);
  const hasSubData = subColumns !== null && subColumns && subColumns.length > 0;

  const handleClick = () => {
    if (hasSubData) {
      toggleData();
    }
  };

  const handleOpen = (e, item) => {
    e.stopPropagation();
    openModalWithData("attachment", {
      path: item.imagePath,
      name: item.imageName,
      user: item.imageUser,
    });
  }

  const subHeader = () => {
    if (!subColumns || subColumns.length === 0) return null;
    return (
      <div
        className={`table-header-row sub-header-row header-nestlevel-${nestingLevel}`}
      >
        {subColumns.map(({ key, header }) => (
          <div
            className="sub-table-header-item"
            key={key}
          >
            {header}
          </div>
        ))}
      </div>
    );
  };

  const subBody = (data) => {
    return data.map((datum, index) => {
        return (
          <div className="sub-entry"> 
          {datum.imagePath && 
          <div className="table-entry-image-icon clickable-widget" onClick={(e) => handleOpen(e, datum)}>
              <div className="tooltip-cube bigger-cube cube-svg">
                {" "}
                {fileSvg("white")}{" "}
              </div>
          </div>}
            <div className="sub-entries" key={index}>
              {subColumns.map(({ key }) => (
                <div className="sub-table-entry-item" style={{width: "50px"}} key={key}>
                  {formatEntry(datum[key], key)}
                </div>
              ))}
            </div>
          </div>
        );
      })
  };

  const showSubData = (data) => {
    return (
      <div className="sub-data-container" onClick={(e) => e.stopPropagation()}>
        <div className="sub-arrow-wrapper">
          <div className={`sub-arrow header-nestlevel-0`}>
            {tableArrow("white")}
          </div>
        </div>
        <div className="sub-table" style={{paddingLeft: "10px"}}>
          <h4 style={{color: "white", textAlign: "left", paddingBottom: "10px", paddingTop: "8px"}}> Invoices </h4>
          <div className="sub-table-body-wrapper">
          {subHeader()}
          {subBody(data)}
          </div>
        </div>
      </div>
    );
  };

  return (
    <button className={`table-entry`}  onClick={handleClick}>
      {entry.imagePath ? 
          <div className="table-entry-image-icon clickable-widget" onClick={(e) => handleOpen(e, entry)}>
              <div className="tooltip-cube bigger-cube cube-svg">
                {" "}
                {fileSvg("white")}{" "}
              </div>
          </div>
           : 
           <div className="table-entry-image-icon" style={{background: "none"}}>
            <span
            className={`tooltip-cube bigger-cube table-entry-cube ${ entry.remaining && entry?.remaining !== 0  ? "committed-cube" : ""}`}
            style={{
              backgroundColor: getColor(entry.id, "Tranquil"),
              position: "fixed",
              marginLeft: "15px",
              marginTop: "22px",
              zIndex: 1,
            }}
          ></span>
          </div>
      }

      <div
        className={`table-entries ${showData ? `table-entries-open` : ""} entry-nestlevel-${nestingLevel}  ${hasSubData ? "hoverable-entry" : ""}`}
      >
        {headers.map((header) => (
          <div className="table-entry-item" key={header}>
            {formatEntry(entry[header], header)}
          </div>
        ))}
      </div>
      {showData && subId && entry[subId] && showSubData(entry[subId])}
    </button>
  );
}

export default TableEntry;