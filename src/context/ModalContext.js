import { createContext, useState, useContext } from "react";

const ModalContext = createContext();

export const useModalContext = () => useContext(ModalContext);

export const ModalProvider = ({ children }) => {
  const [modalType, setModalType] = useState(null);
  const [modalData, setModalData] = useState({})

  const openModal = (type) => setModalType(type);
  const openModalWithData = (type, data) => {
    setModalType(type);
    setModalData(data);
  }
  const closeModal = () => setModalType(null);

  return (
    <ModalContext.Provider value={{ modalType, modalData, openModal, closeModal, openModalWithData }}>
      {children}
    </ModalContext.Provider>
  );
};
