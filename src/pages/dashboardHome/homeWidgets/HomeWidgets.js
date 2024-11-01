import useIsAdmin from "utils/hooks/useIsAdmin";
import ClosedPhases from "./ClosedPhases";
import HomeToggle from "./HomeToggle";
import OpenPhases from "./OpenPhases";

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
      </div>
    </>
  );
}

export default HomeWidgets;
