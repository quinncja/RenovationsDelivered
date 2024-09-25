import React from 'react';
import { AnimatePresence } from 'framer-motion';
import { useModalContext } from 'modules/modals/ModalContext';
import Settings from 'modules/modals/settings/Settings';
import NewWidgetPopup from 'modules/modals/newWidget/NewWidgetPopup';
import Overlay from 'modules/modals/Overlay';

const Modal = () => {
  const { modalType, closeModal } = useModalContext();

  const renderModalContent = () => {
    switch (modalType) {
      case 'settings':
        return <Settings closeSelf={closeModal} />;
      case 'newWidget':
        return <NewWidgetPopup closeSelf={closeModal} />;
      default:
        return null;
    }
  };

  const isVisible = Boolean(modalType);

  return (
    <>
      <AnimatePresence>
        <Overlay isVisible={isVisible} onClick={closeModal}/>
        {isVisible && renderModalContent()}
      </AnimatePresence>
    </>
  );
};

export default Modal;
