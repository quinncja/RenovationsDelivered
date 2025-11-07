import { getColor } from "@shared/utils/color";
import {
  destructureJobNumber,
  dollarFormatter,
  getBaseJobName,
  strToMods,
} from "@shared/utils/functions";
import DetailGraph from "./DetailGraph";
import { sortSvg } from "@assets/icons/svgs";
import { useState } from "react";
import { useProjectContext } from "@features/projects/context/ProjectContext";
import { useJobcostContext } from "@features/jobcost/context/JobcostContext";
import { useNavigate } from "react-router-dom";

function DetailPage({ type, detail, detailData }) {
  const [sortConfig, setSortConfig] = useState({ key: null, direction: null });
  const { updatePageModifiers } = useJobcostContext();
  const navigate = useNavigate();
  const { getJobStr } = useProjectContext();

  if (!detailData)
    return (
      <>
        <div className="detail-header">
          <div className="loading-widget" />
        </div>
        <div
          className="detail-header"
          style={{ height: "350px", width: "100%" }}
        >
          <div className="loading-widget" />
        </div>
        <div
          className="detail-header"
          style={{ height: "200px", width: "100%" }}
        >
          <div className="loading-widget" />
        </div>
      </>
    );

  const jobStr = getJobStr(detail.id);
  const color = getColor(jobStr);

  const renderHeader = (obj) => {
    return (
      <div
        className="detail-header"
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            gap: "15px",
            alignItems: "center",
          }}
        >
          <div
            style={{
              height: "25px",
              width: "25px",
              borderRadius: "5px",
              background: color,
            }}
          />
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              textAlign: "left",
              gap: "5px",
            }}
          >
            <h3> {type === "project-insight" ? jobStr : obj.name} </h3>
            {obj.full_address !== ", ,  " && <h4> {obj.full_address} </h4>}
          </div>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            textAlign: "right",
            gap: "5px",
          }}
        >
          <h4> Total Contracted </h4>
          <h3> {dollarFormatter(obj.total_contracted_amount)} </h3>
        </div>
      </div>
    );
  };

  const renderBody = (items) => {
    return (
      <div className="detail-header" style={{ height: "350px", width: "100%" }}>
        <DetailGraph type={type} data={items} />
      </div>
    );
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

  const sortData = (dataArray) => {
    if (!sortConfig.key || !sortConfig.direction) return dataArray;

    return [...dataArray].sort((a, b) => {
      let aValue, bValue;

      if (sortConfig.key === "project_name") {
        aValue = getBaseJobName(a.job_name).toLowerCase();
        bValue = getBaseJobName(b.job_name).toLowerCase();
      } else if (sortConfig.key === "contract_amount") {
        aValue = parseFloat(a.contract_amount) || 0;
        bValue = parseFloat(b.contract_amount) || 0;
      }

      if (aValue < bValue) {
        return sortConfig.direction === "asc" ? -1 : 1;
      }
      if (aValue > bValue) {
        return sortConfig.direction === "asc" ? 1 : -1;
      }
      return 0;
    });
  };

  const renderItem = (item) => {
    const { phase, jobNum, year } = destructureJobNumber(item.recnum);
    const canClick = item.recnum.length === 8;

    const handleClick = () => {
      let mods;
      if (type === "project-insight") mods = strToMods(jobNum, year, phase);
      else mods = strToMods(jobNum, null, null);
      updatePageModifiers(mods);
      navigate("/jobcost");
    };
    return (
      <div
        className={`phase-body aging-item ${canClick && "clickable-widget"}`}
        onClick={handleClick}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 100px",
            alignItems: "center",
            gap: "20px",
            width: "100%",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "0px",
              textAlign: "left",
              minWidth: 0,
            }}
          >
            <h4
              style={{
                color: "white",
                margin: 0,
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }}
            >
              {getBaseJobName(item.job_name)}
            </h4>
            {type === "project-insight" && (
              <h4>
                {" "}
                P{phase} - {year}{" "}
              </h4>
            )}
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-end",
              textAlign: "right",
              gap: "2px",
            }}
          >
            <h4 style={{ margin: 0 }}> Contracted </h4>
            <h4 style={{ color: "white", margin: 0 }}>
              {dollarFormatter(item.contract_amount)}
            </h4>
          </div>
        </div>
      </div>
    );
  };

  const renderSortableHeaders = () => {
    return (
      <div
        className="phase-body aging-item"
        style={{ padding: "0px", backgroundColor: "var(--terciary)" }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "5px",
            minWidth: 0,
            textAlign: "left",
            padding: "25px 25px",
          }}
        >
          <h4 style={{ fontWeight: "600", color: "white" }}>
            {" "}
            {detailData.items.length}{" "}
            {detailData.items.length === 1
              ? type === "project-insight"
                ? "Phase"
                : "Project"
              : type === "project-insight"
                ? "Phases"
                : "Projects"}
          </h4>
        </div>
        <div
          className="table-header-item"
          onClick={() => handleSort("contract_amount")}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
            gap: "5px",
            textAlign: "right",
            padding: "25px 20px",
          }}
        >
          <h4 style={{ fontWeight: "400", color: "white" }}>Contracted</h4>
          {sortSvg(
            sortConfig.key === "contract_amount" ? sortConfig.direction : null,
          )}
        </div>
      </div>
    );
  };
  const sortedItems = detailData.items ? sortData(detailData.items) : [];

  return (
    <>
      {renderHeader(detailData.details)}
      {renderBody(detailData.trend)}
      <div style={{ width: "100%", boxSizing: "border-box" }}>
        {detailData.items &&
          detailData.items.length > 0 &&
          renderSortableHeaders()}
        {detailData.items ? (
          sortedItems.map((item) => renderItem(item))
        ) : (
          <div className="widget-wrapper">
            {" "}
            <div className="loading-widget" />{" "}
          </div>
        )}
      </div>
    </>
  );
}
export default DetailPage;
