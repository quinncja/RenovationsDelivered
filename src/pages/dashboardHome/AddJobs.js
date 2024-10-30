import { plus } from "business/svg";
import { useModalContext } from "context/ModalContext";

function AddJobs() {
  const { openModal } = useModalContext();

  const handleClick = () => {
    openModal("addJobs");
  };
  return (
    <div className="addjobs-wrapper">
      <button className="addjobs-button" onClick={() => handleClick()}>
        <div style={{display: "flex", flexDirection: "column", textAlign: "left", gap: "10px"}}>
          <span style={{ fontSize: "1.5rem" }}>No tracked projects</span>
          <span style={{ fontSize: "1rem" }}>Click to add</span>
        </div>
        <div id="plus">{plus()}</div>
      </button>
      
    </div>
  );
}

export default AddJobs;
