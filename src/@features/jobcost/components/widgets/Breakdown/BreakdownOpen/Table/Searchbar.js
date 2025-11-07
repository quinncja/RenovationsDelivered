import { searchSvg } from "@assets/icons/svgs";
import { useJobcostContext } from "@features/jobcost/context/JobcostContext";

function Searchbar() {
  const { searchFilter, setSearchFilter } = useJobcostContext();

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
        placeholder="Search items"
        value={searchFilter}
        onChange={(e) => setSearchFilter(e.target.value)}
      />
    </div>
  );
}

export default Searchbar;
