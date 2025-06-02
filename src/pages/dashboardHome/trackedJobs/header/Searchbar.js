import { searchSvg } from "business/svg";
import { useTrackedJobs } from "context/TrackedJobContext";

function Searchbar() {
  const { searchFilter, setSearchFilter } = useTrackedJobs();

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
