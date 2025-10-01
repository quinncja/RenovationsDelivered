import React from "react";
import { useModalContext } from "context/ModalContext";
import Overlay from "components/modals/Overlay";
import AddJobModal from "./addJobs/AddJobModal";
import NewChangeOrderModal from "./newChangeOrder/NewChangeOrderModal";
import FeedbackModal from "./feedback/FeedbackModal";
import AttachmentViewer from "./attachementViewer/AttachmentViewer";
import WidgetDetailsModal from "components/WidgetDetails/WidgetDetailsModal";

const Modal = () => {
  const { modalType, closeModal, modalData } = useModalContext();

  const renderModalContent = () => {
    switch (modalType) {
      case "addJobs":
        return <AddJobModal closeSelf={closeModal} key="addJobsModal" />;
      case "feedback":
        return <FeedbackModal closeSelf={closeModal} key="feedbackModal" />;
      case "attachment":
        return (
          <AttachmentViewer
            closeSelf={closeModal}
            data={modalData}
            key="feedbackModal"
          />
        );
      case "changeOrder":
        return (
          <NewChangeOrderModal
            data={modalData}
            closeSelf={closeModal}
            key="newChangeOrderModal"
          />
        );
      case "widget-details":
        return(
          <WidgetDetailsModal 
            type={modalData}
          />
        )
      default:
        return null;
    }
  };

  const isVisible = Boolean(modalType);

  return (
    <>
      <Overlay isVisible={isVisible} onClick={closeModal} />
      {isVisible && renderModalContent()}
    </>
  );
};

export default Modal;
