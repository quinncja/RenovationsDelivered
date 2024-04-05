import { useEffect } from "react";
import { Outlet, useNavigate} from "react-router-dom";
import Userfront from "@userfront/toolkit/react";
import "./App.css";

function App() {
  const navigate = useNavigate();

  useEffect(() => {
    console.log(Userfront.user)
    if(!Userfront.user.userUuid) {
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
