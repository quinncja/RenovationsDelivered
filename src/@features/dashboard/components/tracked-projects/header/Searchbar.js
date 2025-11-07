import { searchSvg } from "@assets/icons/svgs";
import { useTrackedProjects } from "@features/projects/context/TrackedProjectContext";

function Searchbar() {
  const { searchFilter, setSearchFilter } = useTrackedProjects();

  return (
    <div
      className="tjh-searchbar-container"
      onClick={() => {
        document.getElementById("tjh-searchbar").focus();
      }}
    >
      {searchSvg()}
      <input
        id="tjh-searchbar"
        className="tjh-searchbar"
        placeholder="Search projects"
        value={searchFilter}
        onChange={(e) => setSearchFilter(e.target.value)}
      />
    </div>
  );
}

export default Searchbar;
