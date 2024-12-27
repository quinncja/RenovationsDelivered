function Header(props) {
  const {
    view,
    changeView,
    sortOrder,
    changeSortOrder,
    groupBy,
    changeGroupBy,
  } = props;
  const tabs = ["Pending", "Confirmed", "Rejected"];

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        width: "calc(100% - 3rem - 10px)",
      }}
    >
      <div style={{ display: "flex", flexDirection: "row", gap: "1rem" }}>
        {tabs.map((tab) => {
          return (
            <button
              id={tab}
              className={`tab-button ${tab === view ? "active-tab-button" : ""}`}
              onClick={() => changeView(tab)}
            >
              {tab}
            </button>
          );
        })}
      </div>
      <div style={{ display: "flex", gap: "1rem" }}>
        <button
          className={`sub-tab-button ${sortOrder !== "none" ? "sub-active-tab-button" : ""}`}
          onClick={changeSortOrder}
        >
          Sort by Date ({sortOrder})
        </button>
        <button
          className={`sub-tab-button ${groupBy !== "none" ? "sub-active-tab-button" : ""}`}
          onClick={changeGroupBy}
        >
          Group By ({groupBy})
        </button>
      </div>
    </div>
  );
}

export default Header;
