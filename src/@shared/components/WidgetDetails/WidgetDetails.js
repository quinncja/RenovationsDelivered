import { infoSvg } from "@assets/icons/svgs";
import { useModalContext } from "@shared/context/ModalContext";

function WidgetDetails({ type }) {
  const { openModalWithData } = useModalContext();

  const handleOpen = (e) => {
    e.stopPropagation();
    openModalWithData("widget-details", type);
  };

  return (
    <>
      <div
        style={{ position: "absolute", top: "0", right: "0" }}
        onClick={(e) => {
          handleOpen(e);
        }}
      >
        <div className=" widget-details">{infoSvg()}</div>
      </div>
    </>
  );
}

export default WidgetDetails;
