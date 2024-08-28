import Select from "react-dropdown-select";
import { useDashboardContext } from "context/DashboardContext";
import { useProjectContext } from "context/ProjectContext";
import { useEffect, useState } from "react";
import { close } from "business/svg";
function Modifiers() {
  const { projects } = useProjectContext();
  const { pageModifiers, setPageModifiers } = useDashboardContext();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (projects && projects.length > 0) {
      setLoading(false);
    }
  }, [projects]);

  const yearList = [
    { num: 24, year: "2024" },
    { num: 23, year: "2023" },
  ];
  const phaseList = [
    { num: "01", name: "P1" },
    { num: "02", name: "P2" },
    { num: "03", name: "P3" },
    { num: "04", name: "P4" },
    { num: "05", name: "P5" },
    { num: "06", name: "P6" },
    { num: "07", name: "P7" },
    { num: "08", name: "P8" },
    { num: "09", name: "P9" },
    { num: "10", name: "P10" },
    { num: "11", name: "P11" },
    { num: "12", name: "P12" },
  ];

  const [years, setYears] = useState(yearList);
  const [phases, setPhases] = useState([]);

  const handleProjectChange = (value) => {
    if (value.length > 0) {
      setPageModifiers((prev) => ({
        ...prev,
        job: value,
        year: null,
        phase: null,
      }));
      setYears(value[0].years);
    } else {
      setPageModifiers((prev) => ({
        ...prev,
        job: null,
        year: null,
        phase: null,
      }));
      setYears(yearList);
    }
  };

  const handleYearChange = (value) => {
    if (value.length > 0) {
      setPageModifiers((prev) => ({
        ...prev,
        year: value,
        phase: null,
      }));
      if (value[0].phases) setPhases(value[0].phases);
      else setPhases(phaseList);
    } else {
      setPageModifiers((prev) => ({
        ...prev,
        year: null,
        phase: null,
      }));
      setPhases([]);
    }
  };

  const handlePhaseChange = (value) => {
    setPageModifiers((prev) => ({
      ...prev,
      phase: value,
    }));
  };

  return (
    <div className="modifier-options">
      <Select
        labelField="name"
        valueField="name"
        options={projects}
        values={pageModifiers.job || []}
        placeholder="Showing All Projects"
        className="select-dropdown"
        dropdownGap={10}
        dropdownHandle={false}
        disabled={loading}
        onChange={(value) => handleProjectChange(value)}
      />
      <Select
        labelField="year"
        valueField="year"
        values={pageModifiers.year || []}
        options={years}
        placeholder="Year"
        className="select-dropdown select-dropdown-small"
        dropdownGap={10}
        dropdownHandle={false}
        disabled={loading}
        onChange={(value) => handleYearChange(value)}
      />
      <Select
        labelField="name"
        valueField="name"
        options={phases}
        values={pageModifiers.phase || []}
        placeholder="Phase"
        className="select-dropdown select-dropdown-small"
        dropdownGap={10}
        dropdownHandle={false}
        disabled={loading}
        onChange={(value) => handlePhaseChange(value)}
      />
      {(pageModifiers.job || pageModifiers.year) && (
        <button
          className="clear-modifiers"
          onClick={() => handleProjectChange([])}
        >
          {close()}
        </button>
      )}
    </div>
  );
}

export default Modifiers;
