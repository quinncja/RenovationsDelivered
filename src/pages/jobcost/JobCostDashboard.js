import Breakdown from "widgets/jobWidgets/Breakdown/Breakdown";
import CostItem from "./items/CostItem";
import useIsAdmin from "utils/hooks/useIsAdmin";

const { useSingle } = require("utils/hooks/useSingle");

function JobCostDashboard(){
    const single = useSingle();
    const isAdmin = useIsAdmin();

    return(
        <div id="dashboard" className={`dashboard-dropzone`}>
            <CostItem
                key={"Status"}
                id={"Status"}
                type={"Status"}
                single={single}
            />
            <CostItem
                key={"Margin"}
                id={"Margin"}
                type={"Margin"}
                single={single}
            />
            <CostItem
                key={"Financial Overview"}
                id={"Financial Overview"}
                type={"Financial Overview"}
                single={single}
            />
            <Breakdown type={"Material"} />
            <Breakdown type={"Labor"} />
            <Breakdown type={"Subcontractors"} />
            <Breakdown type={"WTPM"} />
            {isAdmin && 
            <CostItem
                key={"Client Breakdown"}
                id={"Client Breakdown"}
                type={"Client Breakdown"}
                single={single}
            />
            }
            <CostItem
                key={"Change Orders"}
                id={"Change Orders"}
                type={"Change Orders"}
                single={single}
            />
        </div>
    ) 
}

export default JobCostDashboard;