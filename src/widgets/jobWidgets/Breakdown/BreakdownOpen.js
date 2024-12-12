import { useJobDataContext } from "context/JobDataContext";
import { useParams } from "react-router-dom";
import BreakdownOpenBar from "./BreakdownOpenBar";
import { capitalizeFirstLetter } from "utils/funcs";
import CostBreakdown from "./CostBreakdown";
import BreakdownTable from "./BreakdownTable";
import { useState } from "react";

function BreakdownOpen(){
    const { param } = useParams();
    const { getDataByType } = useJobDataContext();
    const [focused, setFocused] = useState({ 
        id: null,
        color: null 
    })
    const type = param === "wtpm" ? param.toUpperCase() : capitalizeFirstLetter(param)
    const data = getDataByType(type);

    if(!data) return (
        <div className="widget-background dashboard-widget-open">
            <div className={`dashboard-welcome user-page open-widget-page`}>
            <h1> {type} Breakdown </h1>
            </div>
            <div style={{display: "flex", width: "100%", height: "50vh", justifyContent: 'center', alignItems: "center"}}>      
                <span
                    className={`home-widget-num ${"home-widget-loading"}`}>
                </span>
            </div>
        </div>
    )  

    const {budget, spent, costItems, updates} = data;
    const {updateItems} = updates;

    const clearFocused = () => {
        setFocused({ 
            id: null,
            color: null 
        })
    }

    const handleClick = (id, color) => {
        const trimmedId = id.replace(" - C", "")
        if(trimmedId === focused.id || trimmedId === "Budget") clearFocused();
        else setFocused({id: trimmedId, color})
    }

    const filteredItems = focused.id ? {
        posted: costItems.posted.filter(item => item.id === focused.id),
        committed: costItems.committed.filter(item => item.id === focused.id)
    } : costItems;

    const filteredUpdates = focused.id ? {
        posted: updateItems.posted.filter(item => item.id === focused.id),
        committed: updateItems.committed.filter(item => item.id === focused.id)
    } : updateItems;
    

    const updatedCount = filteredUpdates.committed.length + filteredUpdates.posted.length;

    console.log(updates)

    return(
        <div className="widget-background dashboard-widget-open">
            <div className={`dashboard-welcome user-page open-widget-page`}>
            <h1> {type} Breakdown </h1>
            <CostBreakdown budget={budget} spent={spent} open={true} />
            <div style={{width: "100%", height: "140px", marginTop: "0px", position: "relative"}}>
                <BreakdownOpenBar budget={budget} costItems={filteredItems} handleClick={handleClick}/>
            </div>
            {updatedCount > 0 && 
            <> 
                <h2 style={{paddingTop: "30px", display: "flex", alignItems: "center", gap: "10px"}}> <div className="update-bubble"/>Recently Updated </h2>
                 <BreakdownTable costItems={filteredUpdates} color={focused.color}/>
            </>
            }
            <h2 style={{paddingTop: !updatedCount ? "30px" : "20px"}}> All Items </h2>
            <BreakdownTable costItems={filteredItems} color={focused.color}/>
            </div>
        </div>
    )
}

export default BreakdownOpen;