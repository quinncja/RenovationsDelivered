import { useState } from "react";
import ClosedPhases from "./ClosedPhases";
import HomeToggle from "./HomeToggle";
import OpenPhases from "./OpenPhases";
import useIsAdmin from "utils/hooks/useIsAdmin";

function HomeWidgets() {
  const isAdmin = useIsAdmin();
  const defaultState = isAdmin ? "year" : "user";
  const [homeState, setHomeState] = useState(defaultState);

  return (
    <>
      {isAdmin && (
        <HomeToggle homeState={homeState} setHomeState={setHomeState} />
      )}
      <div className="home-widget-container">
        <OpenPhases homeState={homeState} />
        <ClosedPhases homeState={homeState} />
      </div>
    </>
  );
}

export default HomeWidgets;
