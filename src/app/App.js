import { Outlet } from "react-router-dom";
import Navbar from "modules/navbar/Navbar";
import useAuth from "utils/hooks/useAuth";
import useLoad from "utils/hooks/useLoad";
import Modal from "../modules/modals/Modal";
import SystemMessage from "../modules/systemMessage/SystemMessage";
import "./App.css";

function App() {
  const isAuthenticated = useAuth();
  useLoad(isAuthenticated);

  return (
    <div className="App">
      {isAuthenticated && <Navbar/>}
      <Outlet />
      <Modal />
      <SystemMessage />
    </div>
  );
}

export default App;
