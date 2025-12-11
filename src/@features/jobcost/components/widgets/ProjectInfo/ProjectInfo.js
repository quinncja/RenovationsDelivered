import { useJobcostContext } from "@features/jobcost/context/JobcostContext";
import { useProjectContext } from "@features/projects/context/ProjectContext";
import { getBaseJobName } from "@shared/utils/functions";
import { useEffect, useState } from "react";

function ProjectInfo() {
  const { getDataByType, pageModifiers, updatePageModifiers } = useJobcostContext();
  const { getJobStr, getClientIdByName, getSupervisorIdByName, getJobListByPageModifiers } = useProjectContext();

  const id = "projectInfo";
  const data = getDataByType(id);
  const [popup, setPopup] = useState({
    isOpen: false,
    items: [],
    type: "",
    x: 0,
    y: 0,
  });

  useEffect(() => {
        if (popup.isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }

        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [popup.isOpen]);

  if (!data) return(
     <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "40px",
        alignItems: "flex-start",
        paddingTop: "20px",
        width: "100%",
      }}
    >
      <h4 style={{ fontStyle: "italic", marginBottom: "-20px" }}>
        {" "}
        Showing results for...
      </h4>

      <div style={{height: '134.5px'}}>

      </div>
      </div>
  );

  const { project, phase, year, status, pm, state, client } = data;

  const handleClick = (list, type, event) => {
    if (list.length > 1) {
      setPopup({
        isOpen: true,
        items: list,
        type: type,
        x: event.clientX,
        y: event.clientY,
      });
    }
  };

  const closePopup = () => {
    setPopup({ isOpen: false, items: [], type: "", x: 0, y: 0 });
  };

  const renderList = (list, type) => {
    const content =
      list.length === 1 ? (
        <div style={{ display: "flex", flexDirection: "row", gap: "7px" }}>
          {`${type}`}
          <span style={{ color: "white", fontWeight: "600" }}> {type === "Phase" ?  list[0].split("-")[1] : list[0]} </span>
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "row", gap: "8px" }}>
          {`${type}s`}
          <span style={{ color: "white", fontWeight: "600" }}>
            {" "}
            {list.length}{" "}
          </span>
        </div>
      );

    return (
    <div
        className={`${list.length > 1 ? "clickable-widget widget" : "widget"} ${
          popup.isOpen && popup.type === type ? "job-info-button-active" : ""
        }`.trim()}
        style={{
          paddingBlock: "10px",
          display: "flex",
          justifyContent: "center",
          width: "max-content",
          cursor: list.length > 1 ? "pointer" : "default",
        }}
        onClick={(e) => handleClick(list, type, e)}
      >
        <h4 style={{ fontSize: "14px" }}>{content}</h4>
      </div>
    );
  };

  const renderProjects = (projects) => {
    const jobList = getJobListByPageModifiers(pageModifiers);
    if (pageModifiers.jobNum) return <div> {getJobStr(pageModifiers.jobNum)} </div>
    return(
      <div
      onClick={(e) => handleClick(jobList, 'Project', e)}
      >
        {`${projects} Projects`}
      </div>
    )
  }

  const handlePopupClick = (type, item) => {
    let newMods; 
    switch(type){
        case("Client"): 
            newMods = {"client": getClientIdByName(item)};
            break;
        case("Phase"): 
            newMods = {"phaseId": `${pageModifiers.yearId || pageModifiers.jobNum ? `${pageModifiers.jobNum}-xx` : 'xxxx-xx'}-${item.split('-')[1].slice(2,4)}`};
            break;
        case("Project Manager"): 
            newMods = {"pm": getSupervisorIdByName(item.split(" ")[0])};
            break;
        case("Year"): 
            newMods = {"yearId": `${pageModifiers.jobNum || 'xxxx'}-${item.slice(2,4)}`};
            break;
        case("State"): 
            newMods = {"state": item};
            break;
        case("Project"): 
            newMods = {"jobNum": item};
            break;
    }
    updatePageModifiers(newMods)
    closePopup();
  }

  const renderPopup = () => {
    return (
      <>
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 999,
          }}
          onClick={closePopup}
        />
        <div
        className="popover-background"
          style={{
            position: "fixed",
            left: `${popup.x + 10}px`,
            top: `${popup.y + 10}px`,
            borderRadius: "8px",
            minWidth: "200px",
            maxWidth: "300px",
            maxHeight: "400px",
            overflowY: "scroll",
            border: "1px solid var(--fancy-border)",
            boxShadow: "0 4px 20px rgba(0, 0, 0, 0.4)",
            zIndex: 1000,
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: '20px'
            }}
          >
            <h4 style={{ fontSize: "14px", letterSpacing: ".02em", color: "#cbd5e1d1", margin: 0 }}>
              {popup.type}s
            </h4>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "0px",
            }}
          >
            {popup.type === "Project" ?
             popup.items.map((item, index) => (
              <div
              onClick={() => handlePopupClick(popup.type, item.jobNum)}
              className="popup-item"
                key={index}
                style={{
                  padding: "15px 20px",
                  textAlign: "left",
                  color: "white",
                  fontSize: "14px",
                }}
              >
                {item.name}
              </div>
            ))
            :
            popup.items.map((item, index) => (
              <div
              onClick={() => handlePopupClick(popup.type, item)}
              className="popup-item"
                key={index}
                style={{
                  padding: "15px 20px",
                  textAlign: "left",
                  color: "white",
                  fontSize: "14px",
                }}
              >
                {item}
              </div>
            ))}
          </div>
        </div>
      </>
    );
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "40px",
        alignItems: "flex-start",
        paddingTop: "50px",
        width: "100%",
      }}
    >
      <h4 style={{ fontStyle: "italic", marginBottom: "-10px" }}>
        {" "}
        Showing results for...
      </h4>
      <div
        style={{
          boxSizing: "border-box",
          display: "flex",
          flexDirection: "column",
          gap: "10px",
          paddingTop: "0px",
          width: "100%"
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "7px",
            justifyContent: "space-between",
            width: "100%",
            alignItems: "baseline",
          }}
        >
          <h2 style={{ fontSize: "36px", fontWeight: "500", textAlign: "left", paddingBottom: "5px" }}> {renderProjects(project)} </h2>
          <div style={{ display: "flex", gap: "10px"}}>
              <div
              className="widget"
                style={{
                  fontSize: "14px",
                  display: "flex",
                  flexDirection: "row",
                  gap: "7px",
                  paddingInline: "15px",
                  paddingBlock: "10px",
                  width: "fit-content",
                  display: "flex",
                  justifyContent: "center",
                  background:
                      status === "Mixed"
                        ? "linear-gradient(135deg, var(--closed) 35%, var(--open))"
                        : status === "Closed"
                          ? "var(--closed)"
                          : "var(--open)",
                }}
              >
                <h4> Status </h4>
                <span style={{ color: "white", fontWeight: "600" }}>
                  {" "}
                  {status}{" "}
                </span>
              </div>
            {renderList(year, "Year")}
            {renderList(phase, "Phase")}
            {renderList(pm, "Project Manager")}
            {renderList(client, "Client")}
            {renderList(state, "State")}
          </div>
        </div>
      </div>

      {popup.isOpen && renderPopup()}
    </div>
  );
}

export default ProjectInfo;
