import useIsAdmin from "utils/hooks/useIsAdmin";
import ClosedPhases from "./ClosedPhases";
import HomeToggle from "./HomeToggle";
import OpenPhases from "./OpenPhases";
import PendingCO from "./PendingCO";

function HomeWidgets() {
    const isAdmin = useIsAdmin();

  return (
    <>
      {isAdmin && (
        <HomeToggle />
      )}
      <div className="home-widget-container">
        <OpenPhases />
        <ClosedPhases />
        <PendingCO /> 
      </div>
    </>
  );
}

export default HomeWidgets;
