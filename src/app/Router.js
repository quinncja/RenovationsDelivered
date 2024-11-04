import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import Home from "pages/home/Home";
import App from "./App";
import Userfront from "@userfront/toolkit";
import OpenItem from "pages/openItem/OpenItem";
import DashboardHome from "pages/dashboardHome/DashboardHome";
import JobCost from "pages/jobcost/JobCost";
import JobCostHeader from "modules/jobcostHeader/JobCostHeader";
import Team from "pages/Team/Team";

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
                <DashboardHome />
              </RequireAuth>
            }
          />
          <Route
            path="/jobcost"
            element={
              <RequireAuth>
                <JobCostHeader />
                <JobCost />
              </RequireAuth>
            }
          />
          <Route
            path="/team"
            element={
              <RequireAuth>
                <Team />
              </RequireAuth>
            }
          />
          <Route
            path="/jobcost/item/:param"
            element={
              <RequireAuth>
                <JobCostHeader />
                <OpenItem />
              </RequireAuth>
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
