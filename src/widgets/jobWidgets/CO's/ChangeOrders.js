import { plus } from "business/svg";
import { useModalContext } from "context/ModalContext";
import { useModifiers } from "context/ModifierContext";
import { useRef, useState } from "react";
import { useSingle } from "utils/hooks/useSingle";
import { parseFile } from "utils/changeOrderUtils";
import useFilteredPhases from "utils/hooks/phase/useFilteredPhases";

function ChangeOrders(props) {
  const { data } = props;
  const [coData, setCOData] = useState(data[0]);
  const single = useSingle();
  const { pendingCount, confirmedCount, totalAmount } = coData;
  const { openModalWithData } = useModalContext();
  const { pageModifiers } = useModifiers();
  const { jobNum, yearId, phaseId, active, state, pm } = pageModifiers;

  const { singlePhaseData } = useFilteredPhases(
    jobNum,
    yearId,
    phaseId,
    active,
    state,
    pm,
  );
  const complete = !singlePhaseData
    ? true
    : singlePhaseData.statusString === "Complete"
      ? true
      : false;
  const showUpload = !complete && single;

  const [isDragOver, setIsDragOver] = useState(false);
  const fileInputRef = useRef(null);

  const handleButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const incrementCount = () => {
    setCOData((prev) => ({
      ...prev,
      pendingCount: prev.pendingCount + 1,
    }));
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
          callback: incrementCount,
        });
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleDragOver = (event) => {
    event.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = () => {
    setIsDragOver(false);
  };

  const handleDrop = (event) => {
    event.preventDefault();
    setIsDragOver(false);
    handleFileChange(event);
  };

  if (showUpload) {
    return (
      <div className="job-display job-display-single change-display">
        <button
          onClick={(event) => handleButtonClick(event)}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={`job-display-section change-order-button btn-section ${isDragOver ? "btn-drag-over" : ""}`}
        >
          {plus()}
        </button>
        <div>
          <div className="strong">
            <span>
              {confirmedCount || 0} Change Order
              {confirmedCount === 1 ? "" : "s"}
            </span>
            <div> {pendingCount || 0} Pending</div>
          </div>
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

  return (
    <>
      <div className="job-display job-display-single change-display">
        <div className={"notsingle-changeorder"}>
          <div className={"notsingle-changeorder-amnt"}>
            <span className={"notsingle-changeorder-num"}>
              {" "}
              {confirmedCount || 0}{" "}
            </span>{" "}
            <div /> Change Order{confirmedCount === 1 ? "" : "s"}
          </div>
          <div
            className={"notsingle-changeorder-amnt"}
            style={{ padding: ".5rem" }}
          >
            <div className="">
              {" "}
              <strong> ${totalAmount || 0} </strong> Contracted{" "}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ChangeOrders;
