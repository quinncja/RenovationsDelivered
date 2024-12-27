import React from "react";
import { AnimatePresence } from "framer-motion";
import { useModalContext } from "context/ModalContext";
import Settings from "modules/modals/settings/Settings";
import NewWidgetPopup from "modules/modals/newWidget/NewWidgetPopup";
import Overlay from "modules/modals/Overlay";
import AddJobModal from "./addJobs/AddJobModal";
import NewChangeOrderModal from "./newChangeOrder/NewChangeOrderModal";
import FeedbackModal from "./feedback/FeedbackModal";

const Modal = () => {
  const { modalType, closeModal, modalData } = useModalContext();

  const renderModalContent = () => {
    switch (modalType) {
      case "settings":
        return <Settings closeSelf={closeModal} key="settingsModal" />;
      case "newWidget":
        return <NewWidgetPopup closeSelf={closeModal} key="newWidgetModal" />;
      case "addJobs":
        return <AddJobModal closeSelf={closeModal} key="addJobsModal" />;
      case "feedback":
        return <FeedbackModal closeSelf={closeModal} key="feedbackModal" />;
      case "changeOrder":
        return (
          <NewChangeOrderModal
            data={modalData}
            closeSelf={closeModal}
            key="newChangeOrderModal"
          />
        );
      default:
        return null;
    }
  };

  const isVisible = Boolean(modalType);

  return (
    <>
      <AnimatePresence>
        <Overlay isVisible={isVisible} onClick={closeModal} />
        {isVisible && renderModalContent()}
      </AnimatePresence>
    </>
  );
};

export default Modal;
