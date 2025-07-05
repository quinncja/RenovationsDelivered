import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import Router from "./app/Router";
import { SystemMessageProvider } from "context/SystemMessageContext";
import { ProjectProvider } from "context/ProjectContext";
import { ModalProvider } from "context/ModalContext";
import { HistoryProvider } from "context/HistoryContext";
import { ItemsProvider } from "context/ItemsContext";
import { TrackedJobProvider } from "context/TrackedJobContext";
import { HomeProvider } from "context/HomeContext";
import { JobCostProvider } from "context/JobCostContext";
import { LoadingProvider } from "app/LoadingContext";
import { BrowserRouter } from "react-router-dom";
import { UserfrontProvider } from "@userfront/react";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <UserfrontProvider tenantId="xbpwwqmn">
  <BrowserRouter>
    <LoadingProvider>
      <SystemMessageProvider>
        <ModalProvider>
          <HistoryProvider>
            <ProjectProvider>
              <TrackedJobProvider>
                <ItemsProvider>
                  <JobCostProvider>
                    <HomeProvider>
                      <Router />
                    </HomeProvider>
                  </JobCostProvider>
                </ItemsProvider>
              </TrackedJobProvider>
            </ProjectProvider>
          </HistoryProvider>
        </ModalProvider>
      </SystemMessageProvider>
    </LoadingProvider>
  </BrowserRouter>
  </UserfrontProvider>
  ,
);
