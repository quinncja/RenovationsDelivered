import ChangeOrder from "pages/changeOrders/ChangeOrder";

export function PopulateChangeOrders({ data }) {
  if (data && data.length === 0) {
    return (
      <p
        style={{
          display: "flex",
          height: "10vh",
          justifyContent: "center",
          alignItems: "center",
          fontWeight: 600,
        }}
      >
        No Change Orders
      </p>
    );
  }

  function sortByCustomStatus(list) {
    const statusPriority = {
      3: 1,
      1: 2,
      6: 3,
    };

    return [...list].sort((a, b) => {
      const priorityA = statusPriority[a.status] || Number.MAX_SAFE_INTEGER;
      const priorityB = statusPriority[b.status] || Number.MAX_SAFE_INTEGER;
      return priorityA - priorityB;
    });
  }

  const sortedData = data ? sortByCustomStatus(data) : null;
  return (
    <div className="open-item-change-orders">
      {sortedData &&
        sortedData.map((datum) => {
          return <ChangeOrder changeOrder={datum} />;
        })}
    </div>
  );
}

export default PopulateChangeOrders;
