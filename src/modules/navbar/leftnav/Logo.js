import whiteLogo from "images/R-Only-White-Empty.png";
import blackLogo from "images/R-Only-Grey-Empty.png";
import whiteLogoHover from "images/R-Only-White.png";
import blackLogoHover from "images/R-Only-Grey.png";

import { useUserContext } from "context/UserContext";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Logo({ expanded }) {
  const { appearance } = useUserContext();
  const [hovered, setHovered] = useState(false);
  const navigate = useNavigate();
  const handleMouseEnter = () => {
    setHovered(true);
  };
  const handleMouseLeave = () => {
    setHovered(false);
  };
  const handleClick = () => {
    navigate("/dashboard");
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
