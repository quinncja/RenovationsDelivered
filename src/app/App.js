import { Outlet } from "react-router-dom";
import Navbar from "modules/navbar/Navbar";
import useAuth from "utils/hooks/useAuth";
import useLoad from "utils/hooks/useLoad";
import Modal from "../modules/modals/Modal";
import SystemMessage from "../modules/systemMessage/SystemMessage";
import "./App.css";
import useScrollToTop from "utils/hooks/useScrollToTop";
import useRoles from "utils/hooks/useRoles";

function App() {
  const isAuthenticated = useAuth();
  useLoad(isAuthenticated);
  useRoles(isAuthenticated);

  useScrollToTop();

  return (
    <div className="App">
      {isAuthenticated && <Navbar />}
      <Outlet />
      <Modal />
      <SystemMessage />
    </div>
  );
}

export default App;
