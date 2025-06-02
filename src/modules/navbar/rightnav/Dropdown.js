import Userfront, { LogoutButton } from "@userfront/toolkit/react";
import { dropDownFadeIn } from "utils/animations";
import { motion } from "framer-motion";
import useIsAdmin from "utils/hooks/useIsAdmin";
import { useNavigate } from "react-router-dom";
import { useMemo } from "react";

Userfront.init("xbpwwqmn");

function Dropdown({ toggleSelf }) {
  const isAdmin = useIsAdmin();
  const navigate = useNavigate();
  const handleClick = (func) => {
    toggleSelf();
    func();
  };

  const isOwner = useMemo(() => {
    if (Userfront && Userfront.user) {
      return Userfront.user.hasRole("owner");
    }
    return false;
  }, []);

  let dropdownOptions = [
    {
      id: "4",
      item: (
        <div className="button-wrapper">
          <LogoutButton />
        </div>
      ),
    },
  ];

  if (isOwner) {
    dropdownOptions = [
      {
        id: "6",
        item: "Feedback",
        onClick: () => handleClick(() => navigate("/feedback")),
      },
      ...dropdownOptions,
    ];
  }

  //{
  //   id: "5",
  //   item: "Reports",
  //   onClick: () => handleClick(() => navigate("/reports")),
  // },
  
  if (isAdmin) {
    dropdownOptions = [
      {
        id: "2",
        item: "Users",
        onClick: () => handleClick(() => navigate("/users")),
      },
      ...dropdownOptions,
    ];
  }

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
