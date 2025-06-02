import Select from "react-dropdown-select";
import { useProjectContext } from "context/ProjectContext";
import { useJobCostContext } from "context/JobCostContext";

function PhaseSelector() {
  const { getProjectByNum, getYearById, getYearsByJob,  getPhasesByYear } = useProjectContext();
  const { pageModifiers, modTimeout, updatePageModifiers } = useJobCostContext();

  const selectedJobNum = pageModifiers.jobNum;
  let selectedYearId = pageModifiers.yearId;


  let selectedPhaseId = pageModifiers.phaseId;
   
  const selectedJob = getProjectByNum(selectedJobNum);
  const selectedJobYears = getYearsByJob(selectedJob);
  if(selectedJobYears.length === 1){
    selectedYearId = selectedJobYears[0].id 
  }

  let selectedYearPhases;
  if(selectedJobNum === "none") {
    selectedYearPhases = [];
  } else {
    const selectedYear = getYearById(selectedYearId);
    selectedYearPhases = getPhasesByYear(selectedYear, selectedJob);
      if(selectedYearPhases.length === 1){
        selectedPhaseId = selectedYearPhases[0].id
      }
  }

  const active = pageModifiers.phaseId;

  const handlePhaseChange = (value) => {
    if (modTimeout) return;
    const phaseId = value.length > 0 ? value[0].id : null;

    const newMods = {
      phaseId: phaseId,
    };

    updatePageModifiers(newMods);
  };

  const handleWrapperClick = (e) => {
    if (e.target.closest(".react-dropdown-select")) return;

    const control = e.currentTarget.querySelector(".react-dropdown-select");

    if (control) {
      control.click();
    }
  };

  return (
    <div
     className={`project-select-wrapper ${active && 'project-select-wrapper-active'} `}
      title="Change year"
      style={{
        display: "flex",
        flexDirection: "column",
        width: "fit-content",
        alignItems: "flex-start",
        borderRadius: "0px",
      }}
      onClick={handleWrapperClick}
    >
      <h4> Phase </h4>
      <Select
        labelField="name"
        valueField="id"
        options={selectedYearPhases}
        values={
          selectedPhaseId
            ? [
                selectedYearPhases.find(
                  (phase) => phase.id === selectedPhaseId,
                ),
              ].filter(Boolean)
            : []
        }
        placeholder="-"
        className="project-select-dropdown project-select-dropdown-smaller"
        dropdownGap={-3}
        dropdownHandle={false}
        onChange={handlePhaseChange}
      />
    </div>
  );
}

export default PhaseSelector;
