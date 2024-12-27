import { useState } from "react";
import { sortSvg } from "business/svg";
import TableEntry from "pages/openItem/TableEntry";

function BreakdownTable(props) {
  const { costItems, color } = props;

  const [sortConfig, setSortConfig] = useState({ key: null, direction: null });

  const flattenCostItems = ({ posted, committed }) => {
    const processItem = (item, type) => {
      const { dscrpt, value, id, insdte, insusr, upddte, updusr, recnum } =
        item;

      return {
        dscrpt,
        value,
        id,
        type,
        insdte,
        insusr,
        upddte,
        updusr,
        recnum,
      };
    };
    let postedWithType = [];
    if (posted)
      postedWithType = posted.map((item) => processItem(item, "posted"));

    let committedWithType = [];
    if (committed)
      committedWithType = committed.map((item) =>
        processItem(item, "committed"),
      );

    return [...postedWithType, ...committedWithType];
  };

  const data = flattenCostItems(costItems);

  const headerMap = {
    id: "Vendor",
    value: "Amount",
    dscrpt: "Description",
    insdte: "Date created",
    insusr: "Created by",
    upddte: "Date updated",
    updusr: "Updated by",
    recnum: "Record Number",
    type: "Type",
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

  const getColumnHeaders = (data) => {
    let keys = Object.keys(data[0]);
    return keys;
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

  const tableBody = (headers, data) => {
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
          return <TableEntry headers={headers} entry={entry} color={color} />;
        })}
      </div>
    );
  };

  const headers = getColumnHeaders(data);

  return (
    <div className="data-display-wrapper">
      {tableHeader(headers)}
      {tableBody(headers, data)}
    </div>
  );
}

export default BreakdownTable;
