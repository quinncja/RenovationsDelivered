import Select from "react-dropdown-select";
import { useJobCostContext } from "context/JobCostContext";
import { useProjectContext } from "context/ProjectContext";
import useIsAdmin from "utils/hooks/useIsAdmin";

function StateSelector() {
  const { modTimeout, pageModifiers, updatePageModifiers } =
    useJobCostContext();
  const isAdmin = useIsAdmin();
  const { getAllStates, getStateByJob } = useProjectContext();

  const selectedState =
    pageModifiers.state || getStateByJob(pageModifiers.jobNum)?.id;
  const active = pageModifiers.state;
  const stateList = getAllStates();

  const handlePMChange = (value) => {
    if (modTimeout) return;
    const state = value.length > 0 ? value[0].id : null;

    const newMods = {
      state: state,
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
      className={`project-select-wrapper ${active && "project-select-wrapper-active"} ${!isAdmin && "inactive-project-select-wrapper"}`}
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
      {isAdmin ? (
        <>
          <h4> State </h4>
          <Select
            labelField="name"
            valueField="id"
            options={stateList}
            values={
              selectedState
                ? [
                    stateList.find((state) => state.id === selectedState),
                  ].filter(Boolean)
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
        </>
      ) : (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            textAlign: "left",
            gap: "5px",
          }}
        >
          <h4> State </h4>
          <h2 style={{ paddingBottom: "1px", height: "30px" }}>
            {selectedState || "-"}
          </h2>
        </div>
      )}
    </div>
  );
}

export default StateSelector;
