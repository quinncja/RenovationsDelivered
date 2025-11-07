import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import App from "../../App";
import Dashboard from "@features/dashboard/components/Dashboard";
import DashboardOpen from "@features/dashboard/components/DashboardOpen";
import { useUserfront } from "@userfront/react";
import Jobcost from "@features/jobcost/components/Jobcost";
import BreakdownOpen from "@features/jobcost/components/widgets/Breakdown/BreakdownOpen/BreakdownOpenPage";
import UserPage from "@features/users/components/UserPage";
import FeedbackPage from "@features/feedback/components/FeedbackPage";

function RequireAuth({ children }) {
  const { isAuthenticated } = useUserfront();
  let location = useLocation();
  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}

function Router() {
  const { isAuthenticated } = useUserfront();
  return (
    <Routes>
      <Route path="/" element={<App />}>
        <Route
          index
          element={
            isAuthenticated ? <Navigate to="/dashboard" replace /> : <App />
          }
        />
        <Route path="/*" element={<App />} />
        <Route path="/home" element={<App />} />
        <Route
          path="/dashboard"
          element={
            <RequireAuth>
              <Dashboard />
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
              <Jobcost />
            </RequireAuth>
          }
        />
        <Route
          path="/jobcost/breakdown/:param"
          element={
            <RequireAuth>
              <BreakdownOpen />
            </RequireAuth>
          }
        />
        <Route
          path="/users"
          element={
            <RequireAuth>
              <UserPage />
            </RequireAuth>
          }
        />
        <Route
          path="/feedback"
          element={
            <RequireAuth>
              <FeedbackPage />
            </RequireAuth>
          }
        />
      </Route>
    </Routes>
  );
}

export default Router;
