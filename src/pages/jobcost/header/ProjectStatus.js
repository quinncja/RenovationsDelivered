import { useJobCostContext } from "context/JobCostContext";
import { useProjectContext } from "context/ProjectContext";
import { jobStatusFormatter } from "utils/formatters";

function ProjectStatus(){
    const { pageModifiers } =
        useJobCostContext();
    const { getStatusByPhase } = useProjectContext();
    const status = getStatusByPhase(pageModifiers?.phaseId)

    return(
      <div style={{flexShrink: "0", display: "flex", flexDirection: "row"}}>
        <div style={{display: 'flex', minWidth: "8ch", flexDirection: "column", marginRight: "22px", justifyContent: "center", borderRadius: "20px", padding: "10px 8px", 
            background: !status 
            ? "linear-gradient(135deg, var(--closed) 35%, var(--open))" 
            : status > 4 
              ? "var(--closed)" 
              : "var(--open)"}}>
          <h3>
            {jobStatusFormatter(status)}
          </h3>
        </div>
      </div>
    )
}

export default ProjectStatus;