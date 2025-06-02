import RightNav from "./rightnav/RightNav";
import LeftNav from "./leftnav/LeftNav";
import { useLocation } from "react-router-dom";

function Navbar() {
  const location = useLocation();

  if (location.pathname === "/dashboard") return(
    <div className="jobs-header" style={{width: "100%"}}>
    <LeftNav />
    <RightNav />
  </div>
  )
  return (
    <>
      <LeftNav />
      <RightNav />
    </>
  );
}

export default Navbar;
