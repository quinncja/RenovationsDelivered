import { useState } from "react";
import { sortSvg, underConstructionSvg } from "business/svg";
import TableEntry from "./TableEntry";

function BreakdownTable(props) {
  const { data, color } = props;
  const [sortConfig, setSortConfig] = useState({ key: null, direction: null });
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 50;

  const headerMap = {
    id: "Vendor",
    value: "Amount",
    dscrpt: "Description",
    type: "Status",
    insdte: "Date created",
    insusr: "Created by",
    upddte: "Date updated",
    updusr: "Updated by",
    recnum: "Record Number",
    costType: "Cost Type",
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
    setCurrentPage(1);
  };

  const getColumnHeaders = (data) => {
    const excludedKeys = ["imagePath", "imageName", "imageUser"];
    if (!data || data.length === 0) return [];
    let keys = Object.keys(data[0]).filter(
      (key) => !excludedKeys.includes(key),
    );
    const orderedKeys = Object.keys(headerMap).filter((key) =>
      keys.includes(key),
    );
    const remainingKeys = keys.filter((key) => !headerMap.hasOwnProperty(key));
    return [...orderedKeys, ...remainingKeys];
  };

  const tableHeader = (headers) => {
    return (
      <div className="table-header-row">
        {headers.map((header) => {
          return (
            <div
              className="table-header-item"
              onClick={() => handleSort(header)}
              key={header}
            >
              {headerMap[header] || header}
              {sortSvg(sortConfig.key === header ? sortConfig.direction : null)}
            </div>
          );
        })}
      </div>
    );
  };

  const getSortedData = (data) => {
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
    return sortedData;
  };

  const getPaginatedData = (sortedData) => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return sortedData.slice(startIndex, endIndex);
  };

  const getPaginationInfo = (totalItems) => {
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const startItem = (currentPage - 1) * itemsPerPage + 1;
    const endItem = Math.min(currentPage * itemsPerPage, totalItems);

    return { totalPages, startItem, endItem };
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNext = (totalPages) => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const renderPagination = (totalItems) => {
    const { totalPages, startItem, endItem } = getPaginationInfo(totalItems);

    if (totalPages <= 1) return null;

    const getVisiblePages = () => {
      if (totalPages <= 5) {
        return Array.from({ length: totalPages }, (_, i) => i + 1);
      }

      const pages = [];

      pages.push(1);

      let middle1, middle2, middle3;

      if (currentPage <= 3) {
        middle1 = 2;
        middle2 = 3;
        middle3 = 4;
      } else if (currentPage >= totalPages - 2) {
        middle1 = totalPages - 3;
        middle2 = totalPages - 2;
        middle3 = totalPages - 1;
      } else {
        middle1 = currentPage - 1;
        middle2 = currentPage;
        middle3 = currentPage + 1;
      }

      [middle1, middle2, middle3].forEach((page) => {
        if (page > 1 && page < totalPages && !pages.includes(page)) {
          pages.push(page);
        }
      });

      pages.push(totalPages);

      return pages;
    };

    const visiblePages = getVisiblePages();

    return (
      <div className="pagination-wrapper">
        <div className="pagination-controls">
          <button
            onClick={handlePrevious}
            disabled={currentPage === 1}
            className="pagination-btn"
          >
            Previous
          </button>

          {visiblePages.map((page) => (
            <button
              key={page}
              onClick={() => handlePageChange(page)}
              className={`pagination-btn ${currentPage === page ? "active" : ""}`}
            >
              {page}
            </button>
          ))}

          <button
            onClick={() => handleNext(totalPages)}
            disabled={currentPage === totalPages}
            className="pagination-btn"
          >
            Next
          </button>
        </div>
        <h4 style={{ fontWeight: "400" }}>
          Showing {startItem}-{endItem} of {totalItems} items
        </h4>
      </div>
    );
  };

  const tableBody = (headers, data) => {
    const sortedData = getSortedData(data);
    const paginatedData = getPaginatedData(sortedData);

    return (
      <div className="table-body">
        {paginatedData.map((entry, index) => {
          return (
            <TableEntry
              headers={headers}
              entry={entry}
              color={color}
              key={index}
            />
          );
        })}
      </div>
    );
  };

  if (!data) return <div className="data-display loading-widget" />;

  if (data.length === 0)
    return (
      <div className="data-display">
        <div className="empty-breakdown">
          {underConstructionSvg()}
          <h4> No data </h4>
        </div>
      </div>
    );

  const headers = getColumnHeaders(data);
  const sortedData = getSortedData(data);

  return (
    <>
      <div className="data-display-wrapper">
        {tableHeader(headers)}
        {tableBody(headers, data)}
      </div>
      {renderPagination(sortedData.length)}
    </>
  );
}

export default BreakdownTable;
