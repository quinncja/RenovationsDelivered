import React from "react";
import { AnimatePresence } from "framer-motion";
import { useModalContext } from "context/ModalContext";
import Settings from "modules/modals/settings/Settings";
import NewWidgetPopup from "modules/modals/newWidget/NewWidgetPopup";
import Overlay from "modules/modals/Overlay";
import AddJobModal from "./addJobs/AddJobModal";

const Modal = () => {
  const { modalType, closeModal } = useModalContext();

  const renderModalContent = () => {
    switch (modalType) {
      case "settings":
        return <Settings closeSelf={closeModal} key="settingsModal" />;
      case "newWidget":
        return <NewWidgetPopup closeSelf={closeModal} key="newWidgetModal" />;
      case "addJobs":
        return <AddJobModal closeSelf={closeModal} key="addJobsModal" />;
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
