import whiteLogo from "images/R-Only-White-Empty.png";
import blackLogo from "images/R-Only-Grey-Empty.png";
import whiteLogoHover from "images/R-Only-White.png";
import blackLogoHover from "images/R-Only-Grey.png";

import { useUserContext } from "context/UserContext";
import { useState } from "react";

function Logo({expanded, toggleExpanded}){
    const { appearance } = useUserContext();
    const [hovered, setHovered] = useState(false);
    const handleMouseEnter = () => {
        setHovered(true);
      };
      const handleMouseLeave = () => {
        setHovered(false);
      };

    return(
    <img
        onClick={() => toggleExpanded()}
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
    )
    
}

export default Logo;