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
        <span style={{ fontSize: "1rem" }}>No tracked projects</span>
        <div id="plus">{plus()}</div>
        <span style={{ fontSize: "1rem" }}>Click to add</span>
      </button>
    </div>
  );
}

export default AddJobs;
