import { useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { burger } from "business/svg";
import Userfront, { LogoutButton } from "@userfront/toolkit/react";
import { dropDownFadeIn, dropdownVariants } from "utils/animations";

Userfront.init("xbpwwqmn");

function Dropdown(props) {
  const { openSettings, expanded, toggleSelf } = props;
  const navigate = useNavigate();
  const handleClick = (func) => {
    toggleSelf();
    func();
  };

  const dropdownOptions = [
    {
      id: "1",
      item: "Dashboard",
      onClick: () => handleClick(() => navigate("/dashboard")),
    },
    // {
    //   id: "2",
    //   item: "Job Costing",
    //   onClick: () => handleClick(() => navigate("/job-costing")),
    // },
    {
      id: "3",
      item: "Settings",
      onClick: () => handleClick(openSettings),
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
    <>
      <motion.div
        id="dropdown"
        variants={dropdownVariants}
        animate={expanded ? "expanded" : "initial"}
        style={expanded ? { zIndex: 15 } : { zIndex: 1 }}
        className="nc-right"
      >
        <button
          className={`dropdown-button ${expanded ? "dropdown-button-open" : ""}`}
          onClick={toggleSelf}
        >
          {burger(expanded)}
        </button>
        <AnimatePresence>
          {expanded && (
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
          )}
        </AnimatePresence>
      </motion.div>
    </>
  );
}

export default Dropdown;
