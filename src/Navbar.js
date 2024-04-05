import logo from "./images/R-Only-White.png";
import Userfront, { LogoutButton } from "@userfront/toolkit/react";
Userfront.init("xbpwwqmn");

function Navbar() {
  return (
    <div className="nav-container">
      <img src={logo} className="logo nav-logo" alt="Renovations Delivered" />
      <div className="btn-wrapper">
        <LogoutButton />
      </div>
    </div>
  );
}

export default Navbar;
