import useIsAdmin from "utils/hooks/useIsAdmin";
import ClosedPhases from "./ClosedPhases";
import HomeToggle from "./HomeToggle";
import OpenPhases from "./OpenPhases";
import PendingCO from "./PendingCO";
import Revenue from "./Revenue";

function HomeWidgets() {
    const isAdmin = useIsAdmin();

  return (
    <>
      {isAdmin && (
        <> 
        <HomeToggle />
        <Revenue/>
        </>
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
