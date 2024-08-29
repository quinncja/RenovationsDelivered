import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import Router from "./app/Router";
import { UserProvider } from "./context/UserContext";
import { DashboardProvider } from "./context/DashboardContext";
import { SystemMessageProvider } from "context/SystemMessageContext";
import { ProjectProvider } from "context/ProjectContext";
import { UserSettingsProvider } from "context/UserSettingsContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <SystemMessageProvider>
      <UserSettingsProvider> 
        <DashboardProvider>
          <ProjectProvider>
            <UserProvider>
              <Router />
            </UserProvider>
          </ProjectProvider>
        </DashboardProvider>
      </UserSettingsProvider>
    </SystemMessageProvider>
  </React.StrictMode>,
);
