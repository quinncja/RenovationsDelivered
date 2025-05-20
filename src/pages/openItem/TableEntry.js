import { fileSvg, sortSvg, tableArrow } from "business/svg";
import { useModalContext } from "context/ModalContext";
import { useState, useEffect } from "react";

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
  color,
  oldStyle,
}) {
  const [showData, setShowData] = useState(false);
  const [subSortConfig, setSubSortConfig] = useState({
    key: null,
    direction: null,
  });
  const toggleData = () => {
    setShowData(!showData);
  };

  const openStyle = {
    borderBottom: `2px solid ${color}`,
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
  };

  const formatFuncMap = {
    x: phaseToMonth,
    Budgeted: dollarFormatter,
    Contracted: dollarFormatter,
    COGS: dollarFormatter,
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

  const handleClick = () => {
    if(entry.imagePath) openModalWithData("attachment", {path: entry.imagePath, name: entry.imageName, user: entry.imageUser})
    else toggleData();
  };

  const handleSubSort = (key) => {
    let direction = "asc";
    if (subSortConfig.key === key && subSortConfig.direction === "asc") {
      direction = "desc";
    } else if (
      subSortConfig.key === key &&
      subSortConfig.direction === "desc"
    ) {
      direction = null;
      key = null;
    }
    setSubSortConfig({ key, direction });
  };

  const getSubInfo = (obj) => {
    let subId = null;
    let subColumns = null;

    for (let key in obj) {
      if (Array.isArray(obj[key])) {
        subId = key;
      }
    }

    if (subId) {
      const subKeys = Object.keys(obj[subId][0]);
      subColumns = subKeys.map((key) => ({
        key,
        header: subHeaderMap[key] || key,
      }));
    }
    return { subId, subColumns };
  };
  const { subId, subColumns } = getSubInfo(entry);

  const subHeader = () => {
    if (!subColumns) return null;
    return (
      <div
        className={`table-header-row sub-header-row header-nestlevel-${nestingLevel}`}
      >
        {subColumns.map(({ key, header }) => (
          <div
            className="table-header-item"
            onClick={() => handleSubSort(key)}
            key={key}
          >
            {header}
            {sortSvg(
              subSortConfig.key === key ? subSortConfig.direction : null,
            )}
          </div>
        ))}
      </div>
    );
  };

  const subBody = (data) => {
    let sortedData = [...data];
    if (subSortConfig.key && subSortConfig.direction) {
      sortedData.sort((a, b) => {
        const aValue = a[subSortConfig.key];
        const bValue = b[subSortConfig.key];
        if (aValue < bValue) return subSortConfig.direction === "asc" ? -1 : 1;
        if (aValue > bValue) return subSortConfig.direction === "asc" ? 1 : -1;
        return 0;
      });
    }

    return sortedData.map((datum, index) => {
      const { subId: nestedSubId } = getSubInfo(datum);
      const hasSubEntries = nestedSubId !== null;

      if (hasSubEntries) {
        return (
          <TableEntry
            headers={subColumns.map((col) => col.key)}
            nestingLevel={nestingLevel + 1}
            entry={datum}
            currentId={currentId}
            key={index}
            color={color}
            oldStyle={oldStyle}
          />
        );
      } else {
        return (
          <div className="sub-entries" key={index}>
            {subColumns.map(({ key }) => (
              <div className="table-entry-item" key={key}>
                {formatEntry(datum[key], key)}
              </div>
            ))}
          </div>
        );
      }
    });
  };

  const showSubData = (data) => {
    return (
      <div className="sub-data-container" onClick={(e) => e.stopPropagation()}>
        <div className="sub-arrow-wrapper">
          <div className={`sub-arrow header-nestlevel-0`}>
            {tableArrow(color)}
          </div>
        </div>
        <div className="sub-table">
          {subHeader()}
          {subBody(data)}
        </div>
      </div>
    );
  };
  const hasSubData = subColumns !== null;
  return (
    <button className={`table-entry`} onClick={handleClick}>
      {entry.imagePath && <div className="table-entry-image-icon"> {fileSvg()} </div>}
      {!oldStyle && (
        <div className="table-entry-left" style={{ backgroundColor: color }} />
      )}
      <div
        className={`table-entries ${showData ? `table-entries-open` : ""}  ${entry.imagePath && "clickable-entry"} entry-nestlevel-${nestingLevel}  ${hasSubData ? "hoverable-entry" : ""}`}
        style={showData ? openStyle : {}}
      >
        {headers.map((header) => (
          <div className="table-entry-item" key={header}>
            {formatEntry(entry[header], header)}
          </div>
        ))}
      </div>
      {showData && subId && showSubData(entry[subId])}
    </button>
  );
}

export default TableEntry;
