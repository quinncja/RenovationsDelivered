import { useHome } from "context/HomeContext";
import { useNavigate } from "react-router-dom";
import { dataValidationObjectList } from "./dataValidationObjectList";

function DataValidation() {
  const id = "data-validation";
  const { getWidgetDataById } = useHome();
  const data = getWidgetDataById(id);
  const navigate = useNavigate();

  if (!data)
    return (
      <div style={{ display: "flex", flexDirection: "row", gap: "10px" }}>
        <div className="validation-card loading-widget" />
        <div className="validation-card loading-widget" />
        <div className="validation-card loading-widget" />
        <div className="validation-card loading-widget" />
      </div>
    );

  const renderCard = (obj) => {
    return (
      <div
        className="validation-card clickable-widget"
        onClick={() => navigate(obj.route)}
      >
        <div className="dv-card-header">
          <div className={`status-indicator ${obj.className}`}></div>
          <div className="dv-card-title"> {obj.title} </div>
        </div>
        <div className="dv-card-value">{data[0][obj.accessor]}</div>
        <h4> {obj.subtitle} </h4>
      </div>
    );
  };

  return (
    <div style={{ display: "flex", flexDirection: "row", gap: "10px" }}>
      {dataValidationObjectList.map((item) => renderCard(item))}
    </div>
  );
}

export default DataValidation;
