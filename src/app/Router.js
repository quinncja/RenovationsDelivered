import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import Home from "pages/welcome/welcome";
import App from "./App";
import Userfront from "@userfront/toolkit";
import DashboardHome from "pages/dashboardHome/DashboardHome";
import Team from "pages/users/Users";
import ChangeOrders from "pages/changeOrders/ChangeOrders";
import Reports from "pages/reports/Reports";
import ReportPage from "pages/reports/ReportPage";
import OpenReport from "pages/reports/OpenReport";
import JobCostDashboard from "pages/jobcost/JobCostDashboard";
import Feedback from "pages/feedback/Feedbacks";
import OpenBreakdown from "pages/openBreakdown/OpenBreakdown";
import DashboardOpen from "pages/dashboardOpen/DashboardOpen";

function RequireAuth({ children }) {
  let location = useLocation();
  if (!Userfront.tokens.accessToken) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}

function Router() {
  return (
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
          path="/dashboard/item/*"
          element={
            <RequireAuth>
              <DashboardOpen />
            </RequireAuth>
          }
        />
        <Route
          path="/jobcost"
          element={
            <RequireAuth>
              <JobCostDashboard />
            </RequireAuth>
          }
        />
        <Route
          path="/jobcost/breakdown/:param"
          element={
            <RequireAuth>
              <OpenBreakdown />
            </RequireAuth>
          }
        />
        <Route
          path="/jobcost/change-orders"
          element={
            <RequireAuth>
              <ChangeOrders />
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
          path="/feedback"
          element={
            <RequireAuth>
              <Feedback />
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
  );
}

export default Router;
