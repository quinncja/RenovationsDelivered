import { close } from "business/svg";
import ChangeOrder from "pages/changeOrders/ChangeOrder";
import { useState } from "react";
import { sendChangeOrderCreatedEmail, submitChangeOrder } from "utils/api";
import { toast } from "sonner";
import { dotPulse } from "ldrs";
import { useCSSVariable } from "utils/hooks/useCSSVariable";
import Userfront from "@userfront/toolkit";
import ChangeOrderSelectors from "./ChangeOrderSelectors";
import { useProjectContext } from "context/ProjectContext";

dotPulse.register();

function NewChangeOrderModal(props) {
  const { closeSelf, data } = props;
  const { modalData, callback } = data;
  const [loading, setLoading] = useState(false);
  const [type, setType] = useState();
  const { getJobStr } = useProjectContext();
  const [coModifiers, setModifiers] = useState({
    jobNum: null,
    yearId: null,
    phaseId: null,
  });
  const [errorStates, setError] = useState({
    type: false,
    modifiers: false,
  });
  const loaderColor = useCSSVariable("--less-white");

  const inputText = {
    type: errorStates.type ? "Please select CO type:" : "Select CO type:",
    modifiers: errorStates.type
      ? "Please select project information:"
      : "Select project information:",
  };

  const formValidator = () => {
    let isError = false;
    if (!type) {
      setError((errorStates) => ({ ...errorStates, type: true }));
      isError = true;
    }
    if (
      !modalData.pageModifiers &&
      (!coModifiers.jobNum || !coModifiers.yearId || !coModifiers.phaseId)
    ) {
      setError((errorStates) => ({ ...errorStates, modifiers: true }));
      isError = true;
    }
    return isError;
  };

  const descObj = {
    text: inputText.type,
    error: errorStates.type,
  };

  const modifiersObj = {
    text: inputText.modifiers,
    error: errorStates.modifiers,
  };

  const onSubmit = async () => {
    if (!formValidator()) {
      setLoading(true);
      handleSubmit();
    }
  };

  const handleButtonClick = (type) => {
    setError((errorStates) => ({ ...errorStates, type: false }));
    setType(type);
  };

  const handleModifierChange = (newMods) => {
    setError((errorStates) => ({ ...errorStates, modifiers: false }));
    setModifiers(newMods);
  };

  const formatCOModifiers = (mods) => {
    const formatted = {
      job: "",
      year: "",
      phase: "",
    };
    formatted.job = mods.jobNum;
    formatted.year = mods.yearId.slice(-2);
    formatted.phase = mods.phaseId.slice(-2);
    return formatted;
  };

  const handleSubmit = async () => {
    try {
      const modifiers = modalData.pageModifiers
        ? formatCOModifiers(modalData.pageModifiers)
        : formatCOModifiers(coModifiers);
      const changeOrder = {
        ...modalData.excelData,
        rowObjects: modalData.changeOrder,
        type,
        user: Userfront.user.name,
        email: Userfront.user.email,
      };
      const changeObj = {
        modifiers,
        changeOrder,
      };
      const emailObj = {
        ...modalData.excelData,
        user: Userfront.user.name,
        email: Userfront.user.email,
        type,
        jobString: `${getJobStr(modifiers.job)} ${`P${modifiers.phase}`} ${`20${modifiers.year}`}`,
      };
      const response = await submitChangeOrder(changeObj);
      if (response.status === 200) {
        sendChangeOrderCreatedEmail(emailObj);
        toast.success("Change order created");
        callback();
        closeSelf();
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  const selectOrderType = () => {
    return (
      <>
        <strong
          style={{ textAlign: "left", paddingLeft: "10px" }}
          className={`${descObj.error && "input-error-tag"}`}
        >
          {" "}
          {descObj.text}{" "}
        </strong>
        <div className="input-group">
          <button
            id="description"
            className={`new-co-input ${descObj.error && "input-error"} ${type === "Proposal of services" ? "active-co-input" : ""}`}
            placeholder=""
            onClick={() => handleButtonClick("Proposal of services")}
          >
            Proposal of services
          </button>
          <button
            id="description"
            className={`new-co-input ${descObj.error && "input-error"} ${type === "Phase change orders" ? "active-co-input" : ""}`}
            placeholder=""
            onClick={() => handleButtonClick("Phase change orders")}
          >
            Phase change orders
          </button>
        </div>
      </>
    );
  };

  const selectModifers = () => {
    return (
      <>
        <strong
          style={{ textAlign: "left", paddingLeft: "10px", paddingTop: "10px" }}
          className={`${modifiersObj.error && "input-error-tag"}`}
        >
          {" "}
          {modifiersObj.text}{" "}
        </strong>
        <div className="co-input-group" style={{ paddingBottom: "10px" }}>
          <ChangeOrderSelectors
            modifiers={coModifiers}
            handleModifierChange={handleModifierChange}
          />
        </div>
      </>
    );
  };

  return (
    <div className="popup-wrapper">
      <div className="new-widget-popup" onClick={(e) => e.stopPropagation()}>
        <div className="widget-top new-widget-top">
          <h2> New Change Order </h2>
          <button className="x-button widget-item" onClick={closeSelf}>
            {close()}
          </button>
        </div>
        <div className="change-order-popup">
          <ChangeOrder {...modalData} newCO={true} />

          {!modalData.pageModifiers && selectModifers()}
          {selectOrderType()}

          <button
            onClick={onSubmit}
            className={`job-button ${loading ? "btn-disabled" : ""} `}
            style={{
              alignSelf: "center",
              width: "25%",
              marginTop: "20px",
              padding: "15px",
            }}
          >
            {loading ? (
              <div>
                <l-dot-pulse
                  size="30"
                  speed="1.5"
                  color={loaderColor}
                ></l-dot-pulse>
              </div>
            ) : (
              "Submit"
            )}{" "}
          </button>
        </div>
      </div>
    </div>
  );
}

export default NewChangeOrderModal;
