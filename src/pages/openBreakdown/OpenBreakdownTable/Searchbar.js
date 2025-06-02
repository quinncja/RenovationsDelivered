import { searchSvg } from "business/svg";
import { useJobCostContext } from "context/JobCostContext";

function Searchbar() {
  const { searchFilter, setSearchFilter } = useJobCostContext();

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
