import { useState } from "react";
import { sortSvg, underConstructionSvg } from "@assets/icons/svgs";
import TableEntry from "./TableEntry";

function Table(props) {
  const { data, color, type } = props;
  const [sortConfig, setSortConfig] = useState({ key: null, direction: null });
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 50;

  const headerMap = {
    id: "Vendor",
    dscrpt: "Description",
    value: "Amount ($)",
    total: "Amount ($)",
    remaining: "Remaining ($)",
    invoices: "Invoices",
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

  const getAllData = () => {
    if (!data) return [];

    if (Array.isArray(data)) {
      return data;
    }

    const allItems = [];
    if (data.parent) allItems.push(...data.parent);
    if (data.children) allItems.push(...data.children);
    return allItems;
  };

  const hasParentsWithChildren = () => {
    if (!data || Array.isArray(data)) return false;

    const parents = data.parent || [];
    const children = data.children || [];

    return parents.some((parent) =>
      children.some((child) => child.parent === parent.recnum),
    );
  };

  // Helper function to calculate remaining amount for Material type
  const calculateRemaining = (parentAmount, children) => {
    if (!children || children.length === 0) {
      return parentAmount;
    }

    const childrenTotal = children.reduce((sum, child) => {
      const childAmount = child.value || child.total || child.amount || 0;
      return sum + (parseFloat(childAmount) || 0);
    }, 0);

    return (parseFloat(parentAmount) || 0) - childrenTotal;
  };

  const processDataForRendering = () => {
    if (!data) return [];

    if (Array.isArray(data)) {
      return data;
    }

    const parents = data.parent || [];
    const children = data.children || [];

    if (type === "Material" || type === "Subcontractors") {
      const parentsWithChildren = parents.map((parent) => {
        const parentChildren = children.filter(
          (child) => child.parent === parent.recnum,
        );

        let processedParent = {
          ...parent,
          children: parentChildren,
          invoices: parentChildren.length,
        };

        // Calculate remaining amount for Material type
        if (type === "Material") {
          const parentAmount =
            parent.value || parent.total || parent.amount || 0;
          processedParent.remaining = calculateRemaining(
            parentAmount,
            parentChildren,
          );
        }

        return processedParent;
      });

      const orphanChildren = children
        .filter(
          (child) => !parents.some((parent) => parent.recnum === child.parent),
        )
        .map((child) => {
          let processedChild = {
            ...child,
            invoices: 0,
          };

          // For orphan children in Material type, remaining is 0 since they have no sub-items
          if (type === "Material") {
            processedChild.remaining = 0;
          }

          return processedChild;
        });

      return [...parentsWithChildren, ...orphanChildren];
    } else {
      return children.map((child) => ({
        ...child,
        invoices: 0,
      }));
    }
  };

  const getColumnHeaders = () => {
    const excludedKeys = [
      "imagePath",
      "imageName",
      "imageUser",
      "parent",
      "costType",
      "status",
      "type",
    ];
    const allData = getAllData();

    if (allData.length === 0) return [];
    const shouldShowInvoices = hasParentsWithChildren();

    let keys = Object.keys(allData[0]).filter(
      (key) => !excludedKeys.includes(key),
    );

    if (shouldShowInvoices && !keys.includes("invoices")) {
      keys.push("invoices");
    }

    // Add 'remaining' column for Material type if it doesn't exist
    if (type === "Material" && !keys.includes("remaining")) {
      keys.push("remaining");
    }

    const orderedKeys = Object.keys(headerMap).filter((key) =>
      keys.includes(key),
    );
    const remainingKeys = keys.filter((key) => !headerMap.hasOwnProperty(key));
    return [...orderedKeys, ...remainingKeys];
  };

  const sortData = (dataArray) => {
    if (!sortConfig.key || !sortConfig.direction) return dataArray;

    return [...dataArray].sort((a, b) => {
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
  };

  const paginateData = (dataArray) => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return dataArray.slice(startIndex, endIndex);
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

  if (!data) return <div className="data-display loading-widget" />;

  const processedData = processDataForRendering();

  if (processedData.length === 0) {
    return (
      <div className="data-display">
        <div className="empty-breakdown">
          {underConstructionSvg()}
          <h4> No data </h4>
        </div>
      </div>
    );
  }

  const headers = getColumnHeaders();
  const sortedData = sortData(processedData);
  const paginatedData = paginateData(sortedData);

  return (
    <>
      <div className="data-display-wrapper">
        {tableHeader(headers)}
        <div className="table-body">
          {paginatedData.map((entry, index) => (
            <TableEntry
              headers={headers}
              entry={entry}
              color={color}
              key={entry.recnum || index}
            />
          ))}
        </div>
      </div>
      {renderPagination(sortedData.length)}
    </>
  );
}

export default Table;
