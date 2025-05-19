import useIsAdmin from "utils/hooks/useIsAdmin";
import ClosedPhases from "./ClosedPhases";
import PendingCO from "./PendingCO";
import Revenue from "./Revenue";

function HomeWidgets() {
  const isAdmin = useIsAdmin();

  return (
    <>
    <div className="home-widget-container">
      {isAdmin && (
          <Revenue />
      )}
        <ClosedPhases />
        <PendingCO />
      </div>
    </>
  );
}

export default HomeWidgets;
