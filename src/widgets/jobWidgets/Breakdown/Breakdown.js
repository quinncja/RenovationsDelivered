import { useJobDataContext } from "context/JobDataContext";
import BreakdownPie from "./BreakdownPie";
import BreakdownBar from "./BreakdownBar";
import { useNavigate } from "react-router-dom";
import CostBreakdown from "./CostBreakdown";
import { AnimatePresence, motion } from "framer-motion";
import { itemFadeIn } from "utils/animations";

function Breakdown(props){
    const { type } = props;
    const { getDataByType } = useJobDataContext();
    const navigate = useNavigate();
    const data = getDataByType(type);

    if(!data) return (
        <div className="breakdown-widget loading-widget">
            <div className="breakdown-widget-header">
            <div className="breakdown-title"> {type} </div>
            </div>
        </div>
    )
    const {budget, spent, costItems, updates} = data;

    const showGraph = costItems.posted.length !== 0 || costItems.committed.length !== 0;

    const handleClick = () => {
        navigate(`/jobcost/breakdown/${type.toLowerCase()}`)
    }
    if (!budget && !spent) return(
        <div className="breakdown-widget">
            <div className="breakdown-widget-header">
            <div className="breakdown-title"> {type} </div>
                {updates > 0 && <div className="updates"> {updates} {updates === 1 ? "Update" : "Updates"} </div>}
            </div>
            <div style={{display: "flex", justifyContent: "center", alignItems: "center", color: "var(--white)", fontWeight: "600", height: "100%"}}> 
                No data
            </div>
        </div>
    )

    const mockPie = () => {
        return(
            <div style={{ height: "227px", width: "250px", display: "flex", justifyContent: "center", alignItems: "center", color: "var(--white)", fontWeight: "600"}}>
                No data
            </div>
        )
    }
    const mockBar = () => {
        return(
            <div style={{ height: "140px", width: "580px", display: "flex", justifyContent: "center", alignItems: "center", color: "var(--white)", fontWeight: "600"}}>
                No data
            </div>
        )
    }
    return(
        <AnimatePresence>
        <div
          className="breakdown-widget clickable-widget" onClick={handleClick}
        >
            <div className="breakdown-widget-header">
            <div className="breakdown-title"> {type} </div>
            </div>
            <motion.div
             initial="hidden"
             animate="visible"
             exit="exit"
             style={{ position: "relative", height: "100%"}}
             variants={itemFadeIn}
             >
            {updates.count > 0 && <div className="updates"> {updates.count} {updates.count === 1 ? "Update" : "Updates"} </div>}
            <div style={{display: "flex", }}> 
                <div className="breakdown-widget-left"> 
                    <CostBreakdown budget={budget} spent={spent} />
                    {showGraph ? <BreakdownPie costItems={costItems}/> : mockPie()}
                </div>
                <div className="breakdown-widget-right"> 
                    {showGraph || budget ? <BreakdownBar budget={budget} costItems={costItems}/> : mockBar()}
                </div>
            </div>
        </motion.div>
        </div>
        </AnimatePresence>
    )
}

export default Breakdown;