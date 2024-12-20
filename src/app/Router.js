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
import JobCostHeader from "modules/jobcostHeader/JobCostHeader";
import Team from "pages/Users/Users";
import ChangeOrders from "pages/changeOrders/ChangeOrders";
import Reports from "pages/reports/Reports";
import ReportPage from "pages/reports/ReportPage";
import OpenReport from "pages/reports/OpenReport";
import JobCostDashboard from "pages/jobcost/JobCostDashboard";
import BreakdownOpen from "widgets/jobWidgets/Breakdown/BreakdownOpen";

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
                <JobCostDashboard />
              </RequireAuth>
            }
          />
          <Route
            path="/users"
            element={
              <RequireAuth>
                <Team />
              </RequireAuth>
            }
          />
          <Route
            path="/reports"
            element={
              <RequireAuth>
                <Reports />
              </RequireAuth>
            }
          />
          <Route
            path="/change-orders"
            element={
              <RequireAuth>
                <ChangeOrders />
              </RequireAuth>
            }
          />
          <Route path="/change-orders/:view?" element={              
              <RequireAuth>
                <ChangeOrders />
              </RequireAuth>} />
          <Route
            path="/jobcost/item/:param"
            element={
              <RequireAuth>
                <JobCostHeader />
                <OpenItem />
              </RequireAuth>
            }
          />
          <Route
            path="/jobcost/breakdown/:param"
            element={
              <RequireAuth>
                <JobCostHeader />
                <BreakdownOpen />
              </RequireAuth>
            }
          />
          <Route
            path="/reports/:param"
            element={
              <RequireAuth>
                <ReportPage />
              </RequireAuth>
            }
          />
          <Route
            path="/reports/:param/:id"
            element={
              <RequireAuth>
                <OpenReport />
              </RequireAuth>
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
