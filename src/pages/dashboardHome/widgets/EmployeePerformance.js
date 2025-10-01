import { useHome } from "context/HomeContext";
import { useJobCostContext } from "context/JobCostContext";
import { useNavigate } from "react-router-dom";
import { dollarFormatter, percentFomatter } from "utils/formatters";
import { getMarginClass } from "utils/funcs";

function EmployeePerformance() {
  const id = "employee-performance";
  const { getWidgetDataById } = useHome();
  const data = getWidgetDataById(id);
  const { updatePageModifiers } = useJobCostContext();
  const navigate = useNavigate();

  const handleClick = (employeeNum) => {
    const currentYear = new Date().getFullYear();
    const yearTwoDigit = currentYear.toString().slice(-2);
    updatePageModifiers({
      jobNum: null,
      yearId: `xxxx-${yearTwoDigit}`,
      phaseId: null,
      pm: employeeNum,
      status: null,
      state: null,
      client: null,
    });
    navigate("/jobcost");
  };

  const employeeCard = (employee) => {
    const { firstName, lastName, employeeNum, margin, totalContract } =
      employee;

    return (
      <div
        className="widget clickable-widget"
        id={employeeNum}
        onClick={() => handleClick(employeeNum)}
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          paddingInline: "20px",
          gap: "20px",
          boxSizing: "border-box",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            gap: "10px",
            alignItems: "center",
          }}
        >
          <div
            className="tjh-box"
            style={{
              borderRadius: "50%",
              flexShrink: 0,
              color: "white",
              fontWeight: "600",
              opacity: ".7",
              fontSize: "14px",
            }}
          >
            {firstName.slice(0, 1)}
            {lastName.slice(0, 1)}
          </div>
          <h3>
            {" "}
            {firstName} {lastName}{" "}
          </h3>
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "10px",
            alignItems: "center",
            textAlign: "left",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "9px",
              justifyContent: "flex-end",
            }}
          >
            <h4> Completed Work </h4>
            <h4 style={{ color: "white" }}>
              {" "}
              {dollarFormatter(totalContract)}{" "}
            </h4>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              textAlign: "right",
            }}
          >
            <h4> Closed Margin </h4>
            <h2 style={{ fontSize: "22px" }} className={getMarginClass(margin)}>
              {percentFomatter(margin)}
            </h2>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr 1fr 1fr",
        gap: "10px",
        flexWrap: "wrap",
        position: "relative",
        width: "100%",
      }}
    >
      {data ? (
        data.map((employee) => employeeCard(employee))
      ) : (
        <div className="loading-widget"> </div>
      )}
    </div>
  );
}

export default EmployeePerformance;
