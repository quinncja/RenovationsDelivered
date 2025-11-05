import { createContext, useState, useContext, useEffect } from "react";

const ModalContext = createContext();

export const useModalContext = () => useContext(ModalContext);

export const ModalProvider = ({ children }) => {
  const [modalType, setModalType] = useState(null);
  const [modalData, setModalData] = useState({});

  useEffect(() => {
    if (modalType !== null) document.body.classList.add("overlay-open");
    else document.body.classList.remove("overlay-open");

    return () => {
      document.body.classList.remove("overlay-open");
    };
  }, [modalType]);

  const openModal = (type) => setModalType(type);
  const openModalWithData = (type, data) => {
    setModalType(type);
    setModalData(data);
  };
  const closeModal = () => setModalType(null);

  return (
    <ModalContext.Provider
      value={{ modalType, modalData, openModal, closeModal, openModalWithData }}
    >
      {children}
    </ModalContext.Provider>
  );
};
