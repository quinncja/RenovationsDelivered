import { useEffect, useState } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import Userfront from "@userfront/toolkit/react";
import "./App.css";
import Navbar from "components/navbar/Navbar";
import Settings from "components/settings/Settings";
import { AnimatePresence } from "framer-motion";
import { fetchUserData } from "utils/api";
import { useDashboardContext } from "context/DashboardContext";
import { useUserContext } from "context/UserContext";

function App() {
  const navigate = useNavigate();
  const { setSmartSort, onLoad} = useDashboardContext();
  const { setAppearance, setColorScheme, setLabel } = useUserContext();
  const [open, setOpen] = useState(false);
  const location = useLocation();
  let loc = location.pathname.substring(1);

  const openSettings = () => {
    setOpen(true);
  };
  const closeSettings = () => {
    setOpen(false);
  };

  useEffect(() => {
    const loadUser = async () => {
      try {
        const settings = await fetchUserData();
        onLoad(settings.itemArray, settings.itemModifiers, settings.pageModifiers)
        setLabel(settings.label || 'none')
        setAppearance(settings.appearance || "dark");
        setColorScheme(settings.colorScheme || "nivo");
        setSmartSort(settings.smartSort || "false");
      } catch (error) {
        console.log(error, "failed to load user");
      }
    };
    if (Userfront.user.userUuid) loadUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!Userfront.user.userUuid && loc !== "" && loc !== "login") {
      navigate("/");
    }
  }, [navigate, loc]);

  return (
    <div className="App">
      {Userfront.user.userUuid && <Navbar openSettings={openSettings} />}
      <Outlet />
      <AnimatePresence>
        {open && <Settings closeSelf={closeSettings} />}
      </AnimatePresence>
    </div>
  );
}

export default App;
