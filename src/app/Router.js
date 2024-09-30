import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import Home from "pages/home/Home";
import App from "./App";
import Dashboard from "pages/dashboard/Dashboard";
import Userfront from "@userfront/toolkit";
import Jobcosting from "pages/jobcosting/Jobcosting";
import OpenItem from "pages/openItem/OpenItem";

function RequireAuth({ children }) {
  let location = useLocation();
  if (!Userfront.tokens.accessToken) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<Home />} />
          <Route path="/*" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route
            path="/dashboard"
            element={
              <RequireAuth>
                <Dashboard />
              </RequireAuth>
            }
          />
          <Route
            path="/item/:param"
            element={
              <RequireAuth>
                <OpenItem />
              </RequireAuth>
            }
          />
          <Route
            path="/job-costing"
            element={
              <RequireAuth>
                <Jobcosting />
              </RequireAuth>
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
