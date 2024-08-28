import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import Router from "./app/Router";
import { UserProvider } from "./context/UserContext";
import { DashboardProvider } from "./context/DashboardContext";
import { SystemMessageProvider } from "context/SystemMessageContext";
import { ProjectProvider } from "context/ProjectContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <SystemMessageProvider>
      <DashboardProvider>
        <ProjectProvider>
          <UserProvider>
            <Router />
          </UserProvider>
        </ProjectProvider>
      </DashboardProvider>
    </SystemMessageProvider>
  </React.StrictMode>,
);
