import React from "react";
import ReactDOM from "react-dom/client";
import Router from "./@core/router/Router";
import { SystemMessageProvider } from "@shared/context/SystemMessageContext";
import { ProjectProvider } from "@features/projects/context/ProjectContext";
import { ModalProvider } from "@shared/context/ModalContext";
import { HistoryProvider } from "@shared/context/HistoryContext";
import { TrackedJobProvider } from "@features/projects/context/TrackedProjectContext";
import { DashboardProvider } from "@features/dashboard/context/DashboardContext";
import { JobcostProvider } from "@features/jobcost/context/JobcostContext";
import { LoadingProvider } from "@core/context/InitializingContext";
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
                  <JobcostProvider>
                    <DashboardProvider>
                      <Router />
                    </DashboardProvider>
                  </JobcostProvider>
                </TrackedJobProvider>
              </ProjectProvider>
            </HistoryProvider>
          </ModalProvider>
        </SystemMessageProvider>
      </LoadingProvider>
    </BrowserRouter>
  </UserfrontProvider>,
);
