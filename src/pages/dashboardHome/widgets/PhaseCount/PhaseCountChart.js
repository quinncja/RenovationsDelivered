import React, { useState } from "react";
import { ResponsiveBar } from "@nivo/bar";
import {
  formatNumberShort,
  phaseToMonth,
  phaseToShortMonth,
} from "utils/formatters";
import { useHome } from "context/HomeContext";

function PhaseCountChart({ id, data }) {
  const { openPage } = useHome();
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 13;

  // Filter and process existing data
  const existingPhaseData = data
    .filter((item) => item.phase !== "total")
    .filter(
      (item) => item.current_year_open > 0 || item.current_year_closed > 0,
    )
    .map((item) => ({
      phase: item.phase,
      phaseNum: parseInt(item.phase),
      current_year_open: item.current_year_open,
      current_year_closed: item.current_year_closed,
      total: item.current_year_open + item.current_year_closed,
      hasData: true,
    }));

  // Create a map for quick lookup
  const phaseDataMap = new Map();
  existingPhaseData.forEach((item) => {
    phaseDataMap.set(item.phaseNum, item);
  });

  // Always show at least 13 phases (12 regular + 1 extra)
  const minPhasesToShow = 13;
  const maxPhaseNum = existingPhaseData.length > 0 
    ? Math.max(...existingPhaseData.map(item => item.phaseNum))
    : 12;
  const totalPhasesToShow = Math.max(minPhasesToShow, maxPhaseNum);

  // Create complete array of all phases with auto-fill
  const allPhases = [];
  
  // First add phases 1-12
  for (let i = 1; i <= 12; i++) {
    const existingData = phaseDataMap.get(i);
    
    if (existingData) {
      allPhases.push(existingData);
    } else {
      allPhases.push({
        phase: i.toString(),
        phaseNum: i,
        current_year_open: 0,
        current_year_closed: 0,
        total: 0,
        hasData: false,
      });
    }
  }
  
  // Then add extra phases (13+) at the end - always include at least phase 13
  for (let i = 13; i <= totalPhasesToShow; i++) {
    const existingData = phaseDataMap.get(i);
    
    if (existingData) {
      allPhases.push(existingData);
    } else {
      allPhases.push({
        phase: i.toString(),
        phaseNum: i,
        current_year_open: 0,
        current_year_closed: 0,
        total: 0,
        hasData: false,
      });
    }
  }

  // Use the complete phase data for pagination
  const phaseData = allPhases;

  const totalPages = Math.ceil(phaseData.length / itemsPerPage);
  const startIndex = currentPage * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentPageData = phaseData.slice(startIndex, endIndex);

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
  const displayEnd = Math.min(endIndex, phaseData.length);
  const displayCounter = phaseData.length > itemsPerPage;

  const CustomTooltip = ({ id, value, color, data }) => {
    // Check if this phase has data
    if (!data.hasData) {
      return (
        <div className="tooltip">
          <div style={{ fontWeight: "bold", marginBottom: "4px" }}>
            {phaseToMonth(data.phase)}
          </div>
          <div style={{ color: "#8b949e", fontWeight: 500, fontSize: "12px" }}>
            No data available
          </div>
        </div>
      );
    }

    return (
      <div className="tooltip">
        <div style={{ fontWeight: "bold", marginBottom: "4px" }}>
          {phaseToMonth(data.phase)}
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <div
            style={{
              width: "12px",
              height: "12px",
              backgroundColor: color,
              borderRadius: "2px",
            }}
          />
          <span style={{ textTransform: "capitalize", fontWeight: "500" }}>
            {value} {id === "current_year_open" ? "Active" : "Completed"}
          </span>
        </div>
        <h4>Total: {data.total} jobs</h4>
      </div>
    );
  };

  const handleClick = (e) => {
    // Only handle clicks for phases with data
    if (!e.data.hasData) return;
    
    const textStatus = e.id.split("_")[2];
    const status = textStatus === "closed" ? 5 : 4;
    const phase = e.data.phaseNum;
    openPage(id, { status, phase, textStatus });
  };

  return (
    <>
      {displayCounter && (
        <div
          style={{
            position: "absolute",
            top: "15px",
            right: "15px",
            zIndex: 10,
            background: "var(--terciary)",
            padding: "5px 10px",
            borderRadius: "3px",
            fontSize: "12px",
            fontWeight: "500",
          }}
        >
          <h4 style={{ color: "var(--white)", margin: 0 }}>
            {displayStart}-{displayEnd} of {phaseData.length}
          </h4>
        </div>
      )}

      {canGoPrev && (
        <button
          onClick={goToPrevPage}
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
          onClick={goToNextPage}
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
        onClick={handleClick}
        data={currentPageData}
        keys={["current_year_open", "current_year_closed"]}
        indexBy="phase"
        margin={{ top: 10, right: 30, bottom: 25, left: 43 }}
        padding={0.25}
        valueScale={{ type: "linear" }}
        indexScale={{ type: "band", round: true }}
        colors={({ id, data }) => {
          // Make bars with no data more muted/transparent
          const baseColor = id === "current_year_open" ? "var(--open)" : "var(--closed)";
          return data.hasData ? baseColor : "#acadae";
        }}
        enableGridY={true}
        gridYValues={5}
        borderWidth={0}
        borderColor={{ from: "color", modifiers: [["darker", "0.3"]] }}
        axisTop={null}
        axisRight={null}
        borderRadius={3}
        innerPadding={2}
        axisLeft={{
          tickSize: 0,
          tickPadding: 5,
          tickValues: 5,
          format: (value) => formatNumberShort(value),
        }}
        axisBottom={{
          tickSize: 0,
          tickPadding: 8,
          format: (value) => phaseToShortMonth(value),
        }}
        tooltip={CustomTooltip}
        enableLabel={true}
        label={(d) => (d.value > 0 ? d.value : "")}
        labelSkipWidth={12}
        labelSkipHeight={12}
        labelTextColor="#ffffff"
        theme={{
          background: "transparent",
          grid: {
            line: {
              stroke: "#acadae",
              strokeOpacity: 0.3,
            },
          },
          axis: {
            ticks: {
              line: {
                strokeWidth: 1,
                stroke: "#acadae",
              },
              text: {
                fontSize: 12,
                fill: "#acadae",
                fontWeight: "500",
              },
            },
            legend: {
              text: {
                fontSize: 14,
                fontWeight: 600,
                fill: "#acadae",
              },
            },
          },
          labels: {
            text: {
              fontSize: 12,
              fontWeight: "600",
            },
          },
        }}
        animate={false}
        motionConfig="gentle"
      />
    </>
  );
}

export default PhaseCountChart;