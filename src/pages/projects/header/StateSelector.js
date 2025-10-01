import Select from "react-dropdown-select";
import { useProjectContext } from "context/ProjectContext";

function StateSelector() {
  const { getAllStates, projectQuery, updateProjectQuery } =
    useProjectContext();

  const selectedState = projectQuery.state;
  const active = projectQuery.state;
  const stateList = getAllStates();

  const handlePMChange = (value) => {
    const state = value.length > 0 ? value[0].id : null;

    const newMods = {
      state: state,
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
      title="Change State"
      style={{
        display: "flex",
        flexDirection: "column",
        width: "fit-content",
        alignItems: "flex-start",
        borderRadius: "0px",
      }}
      onClick={handleWrapperClick}
    >
      <h4> State </h4>
      <Select
        labelField="name"
        valueField="id"
        options={stateList}
        values={
          selectedState
            ? [stateList.find((state) => state.id === selectedState)].filter(
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

export default StateSelector;
