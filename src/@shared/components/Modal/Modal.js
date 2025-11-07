import React from "react";
import { useModalContext } from "@shared/context/ModalContext";
import Overlay from "@shared/components/Modal/Overlay";
import AddJobModal from "../../../@features/dashboard/components/tracked-projects/modal/AddJobModal";
import FeedbackModal from "../../../@features/feedback/components/FeedbackModal";
import AttachmentViewer from "../../../@features/jobcost/components/widgets/AttachmentViewer";
import WidgetDetailsModal from "@shared/components/WidgetDetails/WidgetDetailsModal";

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
      case "widget-details":
        return <WidgetDetailsModal type={modalData} />;
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
