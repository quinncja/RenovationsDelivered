import { sortSvg } from "business/svg";
import { useState } from "react";
import TableEntry from "./TableEntry";
import { hashData } from "utils/colors";
import { useUserContext } from "context/UserContext";

export function DataTable({ data, chartType, currentId }) {
  const [sortConfig, setSortConfig] = useState({ key: null, direction: null });
  const { getColorScheme } = useUserContext();
  const pallete = getColorScheme();

  let visualData;
  if (chartType === "Line" || chartType === "Bar")
    visualData = data.map((datum) => ({ ...datum, color: "var(--primary)" }));
  else visualData = data.map((datum) => hashData(datum, pallete));

  const headerMap = {
    id: "Name",
    value: "Total",
    orders: "Orders",
    unpaid: "Total Unpaid",
    paid: "Total Paid",
    vndnum: "Vendor Number",
    marginPercentage: "Margin",
    totalCost: "COGS",
    contractValue: "Contract",
    BudgetedAmount: "Budget",
  };
  const subHeaderMap = {
    orderDate: "Order Date",
    orderTotal: "Order Total",
    invoiceStatus: "Status",
    jobNumber: "Job Number",
    jobName: "Job",
    orderNum: "PO Number",
    orderDesc: "Description",
    marginPercentage: "Margin",
    totalCost: "COGS",
    BudgetedAmount: "Budget"
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

  const getColumnHeaders = (data) => {
    let keys = Object.keys(data[0]);
    return keys;
  };

  const handleSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    } else if (sortConfig.key === key && sortConfig.direction === "desc") {
      direction = null;
      key = null;
    }
    setSortConfig({ key, direction });
  };

  const tableHeader = (headers) => {
    return (
      <div className="table-header-row">
        {headers.map((header) => {
          return (
            <div
              className="table-header-item"
              onClick={() => handleSort(header)}
            >
              {headerMap[header] || header}
              {sortSvg(sortConfig.key === header ? sortConfig.direction : null)}
            </div>
          );
        })}
      </div>
    );
  };

  const tableBody = (headers, data, subInfo) => {
    let sortedData = [...data];

    if (sortConfig.key && sortConfig.direction) {
      sortedData.sort((a, b) => {
        const aValue = a[sortConfig.key];
        const bValue = b[sortConfig.key];

        if (aValue < bValue) {
          return sortConfig.direction === "asc" ? -1 : 1;
        }
        if (aValue > bValue) {
          return sortConfig.direction === "asc" ? 1 : -1;
        }
        return 0;
      });
    }
    return (
      <div className="table-body">
        {sortedData.map((entry) => {
          return (
            <TableEntry
              headers={headers}
              entry={entry}
              subInfo={subInfo}
              currentId={currentId}
              color={entry.color}
            />
          );
        })}
      </div>
    );
  };

  const headers = getColumnHeaders(data);
  const subInfo = getSubInfo(data[0]);

  return (
    <div className="data-display-wrapper">
      {tableHeader(headers)}
      {tableBody(headers, visualData, subInfo)}
    </div>
  );
}
