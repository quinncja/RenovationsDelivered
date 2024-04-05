import { useEffect } from "react";
import { Outlet, useNavigate, useLocation} from "react-router-dom";
import Userfront from "@userfront/toolkit/react";
import "./App.css";

function App() {
  const navigate = useNavigate();
  const location = useLocation();
  let loc = location.pathname.substring(1);

  useEffect(() => {
    if(!Userfront.user.userUuid && loc != "/") {
      navigate("/")
    }
  }, [navigate])

  return (
    <div className="App">
      <Outlet />
    </div>
  );
}

export default App;
