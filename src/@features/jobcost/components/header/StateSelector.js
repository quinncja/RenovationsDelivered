import Select from "react-dropdown-select";
import { useJobcostContext } from "@features/jobcost/context/JobcostContext";
import { useProjectContext } from "@features/projects/context/ProjectContext";
import useIsAdmin from "@shared/hooks/useIsAdmin";
import { close } from "@assets/icons/svgs";
import { useState } from "react";

function StateSelector() {
  const { modTimeout, pageModifiers, updatePageModifiers } =
    useJobcostContext();
  const isAdmin = useIsAdmin();
  const { getAllStates } = useProjectContext();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const selectedState = pageModifiers.state;
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

  const handleClear = (e) => {
    e.stopPropagation();
    const newMods = {
      state: null,
    };
    updatePageModifiers(newMods);
  };

  return (
    <div
      className={`project-select-wrapper ${active ? "project-select-wrapper-active" : ""} ${isDropdownOpen ? "project-select-wrapper-open" : ""} ${!isAdmin ? "inactive-project-select-wrapper" : ""}`}
      title="Change State"
      style={{
        display: "flex",
        flexDirection: "column",
        width: "fit-content",
        alignItems: "flex-start",
        borderRadius: "0px",
        paddingLeft: "22px",
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
            dropdownGap={15}
            dropdownHandle={false}
            searchBy="name"
            sortBy="name"
            onChange={handlePMChange}
            portal={document.body}
            dropdownPosition="bottom"
            onDropdownOpen={() => setIsDropdownOpen(true)}
            onDropdownClose={() => setIsDropdownOpen(false)}
          />
          {active && (
            <div
              className="select-clear"
              title="Clear state"
              onClick={(e) => handleClear(e)}
            >
              {close()}
            </div>
          )}
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
