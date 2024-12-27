import whiteLogo from "images/R-Only-White-Empty.png";
import blackLogo from "images/R-Only-Grey-Empty.png";
import whiteLogoHover from "images/R-Only-White.png";
import blackLogoHover from "images/R-Only-Grey.png";

import { useUserContext } from "context/UserContext";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import useIsAdmin from "utils/hooks/useIsAdmin";

function Logo({ expanded }) {
  const { appearance } = useUserContext();
  const [hovered, setHovered] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const isAdmin = useIsAdmin();

  const handleMouseEnter = () => {
    setHovered(true);
  };
  const handleMouseLeave = () => {
    setHovered(false);
  };

  const handleClick = () => {
    const currentPath = location.pathname;

    if (currentPath.startsWith("/jobcost/breakdown/")) {
      navigate("/jobcost/");
    } else if (currentPath.startsWith("/reports/cogs/")) {
      navigate("/reports/cogs");
    } else if (currentPath.startsWith("/reports/data-validation/")) {
      navigate("/reports/data-validation");
    } else if (currentPath.startsWith("/reports/invoice-validation/")) {
      navigate("/reports/invoice-validation");
    } else if (currentPath === "/reports/cogs") {
      navigate("/reports");
    } else if (currentPath === "/reports/data-validation") {
      navigate("/reports");
    } else if (currentPath === "/reports/invoice-validation") {
      navigate("/reports");
    } else if (currentPath === "/dashboard" && isAdmin) {
      navigate("/jobcost");
    } else if (currentPath === "/jobcost") {
      navigate("/dashboard");
    } else if (currentPath.startsWith("/jobcost/item/")) {
      navigate("/jobcost");
    } else {
      navigate("/dashboard");
    }
  };
  return (
    <img
      onClick={() => handleClick()}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      src={
        appearance === "light"
          ? hovered || expanded
            ? blackLogoHover
            : blackLogo
          : hovered || expanded
            ? whiteLogoHover
            : whiteLogo
      }
      className="logo nav-logo"
      alt="Renovations Delivered"
    />
  );
}

export default Logo;
