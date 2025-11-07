import Select from "react-dropdown-select";
import { useProjectContext } from "@features/projects/context/ProjectContext";

function ProjectManagerSelector() {
  const { getAllSupervisors, projectQuery, updateProjectQuery } =
    useProjectContext();

  const selectedPM = projectQuery.pm;
  const supervisorList = getAllSupervisors();

  const active = projectQuery.pm;

  const handlePMChange = (value) => {
    const pm = value.length > 0 ? value[0].id : null;

    const newMods = {
      pm: pm,
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
      className={`project-select-wrapper ${active && "project-select-wrapper-active"}`}
      title="Change PM"
      style={{
        display: "flex",
        flexDirection: "column",
        width: "fit-content",
        alignItems: "flex-start",
        borderRadius: "0px",
      }}
      onClick={handleWrapperClick}
    >
      <h4> PM </h4>
      <Select
        labelField="name"
        valueField="id"
        options={supervisorList}
        values={
          selectedPM
            ? [supervisorList.find((pm) => pm.id === selectedPM)].filter(
                Boolean,
              )
            : []
        }
        placeholder={"-"}
        className="project-select-dropdown project-select-dropdown-smaller"
        dropdownGap={-3}
        dropdownHandle={false}
        searchBy="name"
        sortBy="name"
        onChange={handlePMChange}
      />
    </div>
  );
}

export default ProjectManagerSelector;
