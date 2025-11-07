import Select from "react-dropdown-select";
import { useProjectContext } from "@features/projects/context/ProjectContext";
import { phaseList } from "@features/projects/utils/defaultModifiers";

function PhaseSelector() {
  const { projectQuery, updateProjectQuery } = useProjectContext();

  let selectedPhaseId = projectQuery.phase;

  const active = projectQuery.phase;

  const handlePhaseChange = (value) => {
    const phaseId = value.length > 0 ? value[0].id : null;

    const newMods = {
      phase: phaseId,
    };

    updateProjectQuery(newMods);
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
      className={`project-select-wrapper ${active && "project-select-wrapper-active"} `}
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
        options={phaseList}
        values={
          selectedPhaseId
            ? [phaseList.find((phase) => phase.id === selectedPhaseId)].filter(
                Boolean,
              )
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
