import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import Router from "./app/Router";
import { UserProvider } from "./context/UserContext";
import { ModifierProvider } from "./context/ModifierContext";
import { SystemMessageProvider } from "context/SystemMessageContext";
import { ProjectProvider } from "context/ProjectContext";
import { UserSettingsProvider } from "context/UserSettingsContext";
import { ModalProvider } from "context/ModalContext";
import { HistoryProvider } from "context/HistoryContext";
import { ItemsProvider } from "context/ItemsContext";
import { TrackedJobProvider } from "context/TrackedJobContext";
import { HomeProvider } from "context/HomeContext";
import { JobDataProvider } from "context/JobDataContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <SystemMessageProvider>
    <ModalProvider>
      <UserSettingsProvider>
        <HistoryProvider>
          <TrackedJobProvider>
            <ItemsProvider>
              <ModifierProvider>
                <ProjectProvider>
                    <HomeProvider>
                      <UserProvider>
                        <JobDataProvider> 
                          <Router />
                        </JobDataProvider>
                      </UserProvider>
                    </HomeProvider>
                </ProjectProvider>
              </ModifierProvider>
            </ItemsProvider>
          </TrackedJobProvider>
        </HistoryProvider>
      </UserSettingsProvider>
    </ModalProvider>
  </SystemMessageProvider>,
);
