import { submissionSvg } from "@assets/icons/svgs";
import { useModalContext } from "@shared/context/ModalContext";

function Footer() {
  const { openModal } = useModalContext();

  return (
    <div className="footer">
      <button
        className="submission-form-button"
        title="Submit feedback"
        onClick={() => openModal("feedback")}
      >
        {submissionSvg()} Renovations Delivered
      </button>
    </div>
  );
}

export default Footer;
