import Select from "react-dropdown-select";
import { useJobCostContext } from "context/JobCostContext";
import { useProjectContext } from "context/ProjectContext";
import useIsAdmin from "utils/hooks/useIsAdmin";

function ProjectManagerSelector() {
  const { modTimeout, pageModifiers, updatePageModifiers } =
    useJobCostContext();
  const { getAllSupervisors, getSupervisorByPhase } = useProjectContext();
  const isAdmin = useIsAdmin(); 

  const selectedPM = pageModifiers.pm || getSupervisorByPhase(pageModifiers?.phaseId).id;
  const supervisorList = getAllSupervisors();

  const active = pageModifiers.pm;
  
  const handlePMChange = (value) => {
    if (modTimeout) return;
    const pm = value.length > 0 ? value[0].id : null;

    const newMods = {
      pm: pm,
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
      className={`project-select-wrapper ${active && 'project-select-wrapper-active'} ${!isAdmin && "inactive-project-select-wrapper"}`}
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
      {isAdmin ?
            <>
            <h4> PM </h4>
      <Select
        labelField="name"
        valueField="id"
        options={supervisorList}
        values={
            selectedPM
                ? [supervisorList.find((pm) => pm.id === selectedPM)].filter(Boolean)
                : []
        }
        placeholder={'-'}
        className="project-select-dropdown project-select-dropdown-smaller"
        dropdownGap={-3}
        dropdownHandle={false}
        searchBy="name"
        sortBy="name"
        onChange={handlePMChange}
      />
              </>
          : 
          <div style={{display: "flex", flexDirection: "column", textAlign: 'left', gap: "5px"}}> 
          <h4> PM </h4>
          <h2 style={{ paddingBottom: "1px", height: "30px"}}>
            {supervisorList && selectedPM && supervisorList.find((pm) => pm.id === selectedPM).name || '-'}
          </h2>
          </div>
      }
    </div>
  );
}

export default ProjectManagerSelector;
