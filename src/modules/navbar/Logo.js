import whiteLogo from "images/R-Only-White-Empty.png";
import whiteLogoHover from "images/R-Only-White.png";

import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import useIsAdmin from "utils/hooks/useIsAdmin";

function Logo({ expanded }) {
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
    } else if (currentPath.startsWith("/dashboard/item/project-insight/id/")) {
      navigate("/dashboard/item/project-insight/");
    } else if (currentPath.startsWith("/dashboard/item/client-insight/id/")) {
      navigate("/dashboard/item/client-insight/");
    } else if (currentPath.startsWith("/dashboard/item/vendor-insight/id/")) {
      navigate("/dashboard/item/vendor-insight/");
    } else if (currentPath.startsWith("/dashboard/item/subcontractor-insight/id/")) {
      navigate("/dashboard/item/subcontractor-insight/");
    } else {
      navigate("/dashboard");
    }
  };
  return (
    <img
      onClick={() => handleClick()}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      src={hovered || expanded ? whiteLogoHover : whiteLogo}
      className="logo nav-logo"
      alt="Renovations Delivered"
    />
  );
}

export default Logo;
