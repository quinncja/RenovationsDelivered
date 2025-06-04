import { plus, scrollSvg } from "business/svg";
import { useJobCostContext } from "context/JobCostContext";
import { useModalContext } from "context/ModalContext";
import { useRef } from "react";
import { parseFile } from "utils/changeOrderUtils";

function ChangeOrderButton() {
  const { jobData, pageModifiers } = useJobCostContext();
  const { openModalWithData } = useModalContext();
  const { changeOrders } = jobData || {};

  const fileInputRef = useRef(null);

  const handleButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = async (event) => {
    let file;
    if (event.type === "drop") {
      file = event.dataTransfer.files[0];
    } else {
      file = event.target.files[0];
    }

    if (file) {
      try {
        const { excelData, rowObjects } = await parseFile(file);
        const modalData = {
          pageModifiers,
          excelData,
          changeOrder: rowObjects,
        };
        openModalWithData("changeOrder", {
          modalData,
          callback: () => {},
        });
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div className="jobcost-changeorder-button" style={{overflow: "hidden"}}>
      <div
        className="clickable-co"
        style={{
          position: "relative",
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          gap: "10px",
          flex: "1",
          height: "100%",
          width: "100%",
          paddingLeft: "15px",
          paddingRight: "13px",
        }}
        onClick={() => {
          /**navigate(`/jobcost/change-orders`)**/
        }}
        title="View change orders"
      >
        <div className="co-svg" style={{ marginTop: "5px", flex: "1" }}>
          {" "}
          {scrollSvg()}
        </div>
        {jobData ? (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              textAlign: "left",
            }}
          >
            <h2 style={{ fontWeight: 700 }}>
              {" "}
              {changeOrders?.confirmedCount + changeOrders?.pendingCount || 0}
            </h2>
            <h5 style={{ minWidth: "17ch" }}>
              {" "}
              {changeOrders &&
              changeOrders?.confirmedCount + changeOrders?.pendingCount === 1
                ? "Change order"
                : "Change orders"}{" "}
            </h5>
          </div>
        ) : (
          <>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                textAlign: "left",
              }}
            >
              <div className="loading-widget" />
              <h5 style={{ opacity: 0, minWidth: "17ch" }}> Change Orders </h5>
            </div>
          </>
        )}
      </div>
      <div
        className="newcoplus"
        style={{ width: "100%", height: "100%" }}
        title="New change order"
        onClick={() => handleButtonClick()}
      >
        {plus()}
      </div>
      <input
        id="co-upload"
        type="file"
        accept=".xls,.xlsx"
        onChange={handleFileChange}
        ref={fileInputRef}
        style={{ display: "none" }}
      />
    </div>
  );
}

export default ChangeOrderButton;
