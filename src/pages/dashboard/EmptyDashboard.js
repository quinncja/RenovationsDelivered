import { useModalContext } from "modules/modals/ModalContext";

function EmptyDashboard(){
    const { openModal } = useModalContext();
    return(
        <div className="loading-wrapper no-item-text">
            <h2>Your dashboard is empty. </h2>
            <br />
            <h3 onClick={() => openModal("newWidget")}>
            {" "}
            Click here to add a widget{" "}
            </h3>
        </div>
    )
}

export default EmptyDashboard;