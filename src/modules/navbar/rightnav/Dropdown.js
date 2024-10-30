import { useModalContext } from "context/ModalContext";
import Userfront, { LogoutButton } from "@userfront/toolkit/react";
import { dropDownFadeIn } from "utils/animations";
import { motion } from "framer-motion";

Userfront.init("xbpwwqmn");

function Dropdown({ toggleSelf }) {
  const { openModal } = useModalContext();
  const handleClick = (func) => {
    toggleSelf();
    func();
  };

  let dropdownOptions = [
    {
      id: "3",
      item: "Settings",
      onClick: () => handleClick(() => openModal("settings")),
    },
    {
      id: "4",
      item: (
        <div className="button-wrapper">
          <LogoutButton />
        </div>
      ),
    },
  ];

  return (
    <div className="dropdown-items">
      {dropdownOptions.map((option, index) => {
        return (
          <motion.button
            className="dropdown-item"
            initial="hidden"
            animate="visible"
            exit="exit"
            key={index}
            id={option.id}
            variants={dropDownFadeIn}
            custom={index}
            onClick={option.onClick}
          >
            {option.item}
          </motion.button>
        );
      })}
    </div>
  );
}
export default Dropdown;
