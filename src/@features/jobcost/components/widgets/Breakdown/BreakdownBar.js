import React, { useState } from "react";
import { ResponsiveBar } from "@nivo/bar";
import { calculateTotalSum } from "@shared/utils/functions";
import { hashData } from "@shared/utils/color";
import { formatNumberShort } from "@shared/utils/functions";
import { useJobcostContext } from "@features/jobcost/context/JobcostContext";
import { venderMap } from "@features/dashboard/components/widgets/Insights/Label";
import { transformData } from "@features/jobcost/utils/transformData";
import Tooltip from "./Tooltip";

function BreakdownBar({ costItems, type }) {
  const { posted, committed } = costItems;
  const { openBreakdownPage } = useJobcostContext();

  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 5;

  const postedByVendor = posted.reduce((acc, item) => {
    acc[item.id] = (acc[item.id] || 0) + item.value;
    return acc;
  }, {});

  const committedByVendor = committed.reduce((acc, item) => {
    acc[item.id] = (acc[item.id] || 0) + item.value;
    return acc;
  }, {});

  let sum;
  if (type === "Subcontractors") {
    sum = calculateTotalSum(committed);
  } else {
    sum = calculateTotalSum(posted) + calculateTotalSum(committed);
  }

  const handleClick = (e) => {
    openBreakdownPage(type, e.data.vendor);
  };

  const allVendors = new Set([
    ...Object.keys(postedByVendor),
    ...Object.keys(committedByVendor),
  ]);

  const data = Array.from(allVendors).map((vendor) => {
    const postedAmount = postedByVendor[vendor] || 0;
    const committedAmount = committedByVendor[vendor] || 0;

    let actualCommittedAmount;
    if (type === "Subcontractors") {
      actualCommittedAmount = committedAmount - postedAmount;
    } else {
      actualCommittedAmount = committedAmount;
    }

    return {
      vendor: vendor,
      posted: postedAmount,
      committed: Math.max(0, actualCommittedAmount),
    };
  });

  const sortedData = data.sort(
    (a, b) => b.posted + b.committed - (a.posted + a.committed),
  );

  const totalPages = Math.ceil(sortedData.length / itemsPerPage);
  const startIndex = currentPage * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentPageData = sortedData.slice(startIndex, endIndex);

  const goToPrevPage = (e) => {
    e.stopPropagation();
    setCurrentPage((prev) => Math.max(0, prev - 1));
  };

  const goToNextPage = (e) => {
    e.stopPropagation();
    setCurrentPage((prev) => Math.min(totalPages - 1, prev + 1));
  };

  const canGoPrev = currentPage > 0;
  const canGoNext = currentPage < totalPages - 1;

  const displayStart = startIndex + 1;
  const displayEnd = Math.min(endIndex, sortedData.length);
  const displayCounter = sortedData.length > 5;

  const vendorColors = {};
  currentPageData.forEach((item) => {
    const hashedData = hashData({ id: item.vendor, label: item.vendor }, true);
    vendorColors[item.vendor] = hashedData.color;
  });

  const getColor = (bar) => {
    return vendorColors[bar.data.vendor];
  };

  const defs = [
    {
      id: "stripes",
      type: "patternLines",
      background: "inherit",
      color: "rgba(255, 255, 255, 0.25)",
      spacing: 10,
      rotation: 45,
      lineWidth: 5,
    },
  ];

  const fill = [
    {
      match: (d) => d.key.startsWith("committed."),
      id: "stripes",
    },
  ];

  const getLabel = (vendor) => {
    const vendorLabel = venderMap[vendor] || vendor;
    const trimmedLabel = transformData(vendorLabel);
    return trimmedLabel;
  };

  return (
    <div
      className="breakdown-bar"
      style={{
        zIndex: "5",
        position: "relative",
        width: "120%",
        height: "100%",
      }}
      onClick={(e) => e.stopPropagation()}
    >
      {displayCounter && (
        <div
          style={{
            position: "absolute",
            top: "15px",
            right: "25px",
            zIndex: 10,
            background: "var(--terciary)",
            padding: "5px 10px",
            borderRadius: "3px",
            fontSize: "12px",
            fontWeight: "500",
          }}
        >
          <h4 style={{ color: "var(--white)" }}>
            {displayStart}-{displayEnd} of {sortedData.length}
          </h4>
        </div>
      )}

      {canGoPrev && (
        <button
          onClick={(e) => goToPrevPage(e)}
          style={{
            position: "absolute",
            left: "15px",
            top: "52%",
            transform: "translateY(-50%)",
            zIndex: 10,
            background: "var(--terciary)",
            color: "white",
            border: "none",
            borderRadius: "50%",
            width: "32px",
            height: "32px",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "16px",
            transition: "all 0.2s ease",
          }}
        >
          ←
        </button>
      )}

      {canGoNext && (
        <button
          onClick={(e) => goToNextPage(e)}
          style={{
            position: "absolute",
            right: "15px",
            top: "52%",
            transform: "translateY(-50%)",
            zIndex: 10,
            background: "var(--terciary)",
            color: "white",
            border: "none",
            borderRadius: "50%",
            width: "32px",
            height: "32px",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "16px",
            transition: "all 0.2s ease",
          }}
        >
          →
        </button>
      )}

      <ResponsiveBar
        data={currentPageData}
        keys={["posted", "committed"]}
        onClick={handleClick}
        indexBy="vendor"
        margin={{ top: 55, right: 65, bottom: 45, left: 70 }}
        padding={0.3}
        valueScale={{ type: "linear" }}
        indexScale={{ type: "band", round: true }}
        colors={getColor}
        defs={defs}
        fill={fill}
        enableGridY={true}
        gridYValues={4}
        borderWidth={1}
        borderColor={{ from: "color", modifiers: [["darker", "0.3"]] }}
        axisTop={null}
        axisRight={null}
        borderRadius={2}
        innerPadding={2}
        axisLeft={{
          tickSize: 5,
          tickPadding: -19,
          tickValues: 4,
          format: (value) => `$${formatNumberShort(value)}`,
        }}
        axisBottom={{
          tickSize: 5,
          tickPadding: 5,
          truncateTickAt: 12,
          format: (value) => getLabel(value),
        }}
        tooltip={(datum) => Tooltip(datum, sum)}
        enableLabel={false}
        theme={{
          grid: {
            line: {
              stroke: "#acadae",
              strokeOpacity: 0.2,
            },
          },
          axis: {
            ticks: {
              line: {
                strokeWidth: 1,
              },
              text: {
                outlineWidth: "8",
                outlineColor: "var(--dark)",
                fontSize: 12,
                fill: "#acadae",
              },
            },
            legend: {
              text: {
                fontSize: 14,
                fontWeight: 500,
                fill: "#acadae",
              },
            },
          },
          legends: {
            text: {
              fontSize: 12,
              textTransform: "capitalize",
            },
          },
        }}
      />
    </div>
  );
}

export default BreakdownBar;
