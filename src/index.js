import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import Router from "./app/Router";
import { UserProvider } from "./context/UserContext";
import { DashboardProvider } from "./context/DashboardContext";
import { SystemMessageProvider } from "modules/systemMessage/SystemMessageContext";
import { ProjectProvider } from "context/ProjectContext";
import { UserSettingsProvider } from "context/UserSettingsContext";
import { ModalProvider } from "modules/modals/ModalContext";
import { HistoryProvider } from "context/HistoryContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <SystemMessageProvider>
    <ModalProvider> 
      <UserSettingsProvider>
      <HistoryProvider> 
        <DashboardProvider>
            <ProjectProvider>
              <UserProvider>
                <Router />
              </UserProvider>
            </ProjectProvider>
        </DashboardProvider>
        </HistoryProvider>
      </UserSettingsProvider>
    </ModalProvider>
  </SystemMessageProvider>,
);
