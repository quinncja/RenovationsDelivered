import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import Router from "./app/Router";
import { UserProvider } from "./context/UserContext";
import { ModifierProvider } from "./context/ModifierContext";
import { SystemMessageProvider } from "context/SystemMessageContext";
import { ProjectProvider } from "context/ProjectContext";
import { UserSettingsProvider } from "context/UserSettingsContext";
import { ModalProvider } from "modules/modals/ModalContext";
import { HistoryProvider } from "context/HistoryContext";
import { ItemsProvider } from "context/ItemsContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <SystemMessageProvider>
    <ModalProvider>
      <UserSettingsProvider>
        <HistoryProvider>
          <ItemsProvider>
            <ModifierProvider>
              <ProjectProvider>
                <UserProvider>
                  <Router />
                </UserProvider>
              </ProjectProvider>
            </ModifierProvider>
          </ItemsProvider>
        </HistoryProvider>
      </UserSettingsProvider>
    </ModalProvider>
  </SystemMessageProvider>,
);
