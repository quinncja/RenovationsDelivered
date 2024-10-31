import { useProjectContext } from "context/ProjectContext";
import { useTrackedJobs } from "context/TrackedJobContext";
import HalfPieChart from "graphs/charts/PieChart/HalfPieChart";
import { useState, useEffect, useMemo } from "react";
import { fetchBudgetVSChartData } from "utils/api";

function ClosedPhases(props) {
  const { homeState } = props;
  const [ pieData, setPieData ] = useState();
  const [ loaded, setLoaded ] = useState(false)
  const { projects, getClosedPhases } = useProjectContext();
  const { trackedJobs } = useTrackedJobs();

  const closedPhases = useMemo(() => {
    if (homeState === "year") return getClosedPhases()
    else {
        if (!projects || !trackedJobs || trackedJobs.length === 0){
            setPieData()
            return undefined;
        } 
        else getClosedPhases(trackedJobs);
    }
    //eslint-disable-next-line
  }, [homeState]);

  useEffect(() => {
    const fetchData = async () => {
    setLoaded(false)
      if (!closedPhases) {
        setLoaded(true)
        return;
      }

      try {
        const recnumsParam = closedPhases.join(",");
        const data = await fetchBudgetVSChartData(recnumsParam);

        if (data && data.length > 0) {
          const counts = data[0];
          const pieChartData = [
            {
              id: "Under Budget",
              label: "Under Budget",
              value: counts.BelowBudgetCount,
              color: "#2cf21e",
            },
            {
              id: "Over Budget",
              label: "Over Budget",
              value: counts.AboveBudgetCount,
              color: "#ff2049",
            },
          ];
          setPieData(pieChartData);
          setLoaded(true)
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setPieData(null);
      }
    };

    fetchData();
  }, [homeState, closedPhases]);

  const size = {
    height: 150,
    width: 400,
  };

  return (
    <div className="home-widget home-widget-m">
      {loaded ? pieData ? (
        <HalfPieChart data={pieData} size={size} />
      ) : 
      <strong style={{color: "white"}}>
        No data
    </strong> :
      (
        <div style={{ paddingTop: "27px" }} className="home-widget-loading" />
      )}
    </div>
  );
}

export default ClosedPhases;
