import { buildingSvg } from "business/svg";
import { useProjectContext } from "context/ProjectContext";

function ProjectCount() {
    const { activeProjects } = useProjectContext();
    if (activeProjects === undefined)
        return (
        <div className="tjh-widget">
            <div className="tjh-box "> {buildingSvg()} </div>
            <div
            style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
            }}
            >
            <div className="loading-widget" />
            </div>
        </div>
    );
    if (activeProjects === 0)
        return (
        <div className="tjh-widget">
            <div className="tjh-box"> {buildingSvg()} </div>
            <div
            style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
            }}
            >
            <h2> - </h2>
            <h4> {"Projects"} </h4>
            </div>
        </div>
     );
    else
        return (
        <div className="tjh-widget">
            <div className="tjh-box"> {buildingSvg()} </div>
            <div
            style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
            }}
            >
            <h2> {activeProjects} </h2>
            <h4> {"Projects"} </h4>
            </div>
        </div>
        );
    }

export default ProjectCount;
