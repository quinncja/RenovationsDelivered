import { useJobcostContext } from "@features/jobcost/context/JobcostContext";
import {
  getBreakdownIconByType,
  getStatusColor,
} from "../../../utils/getters";
import { calculateTotalSum, percentFomatter } from "@shared/utils/functions";
import useRelativeTime from "@shared/hooks/useRelativeTime";
import MoneyDisplay from "@shared/components/MoneyDisplay/MoneyDisplay";
import BudgetBar from "./BudgetBar";

function Budget(props) {
  const { type, open} = props;
  const { getDataByType, openBreakdownPage } = useJobcostContext();
  const data = getDataByType(type);

  const updatedDate = data?.recentItems?.[0]?.insdte || "";
  const relativeTime = useRelativeTime(updatedDate);

  const icon = getBreakdownIconByType(type);

  if(!data) return(
    <div className="widget loading-widget" style={{height: '140.5px'}}>
        <div style={{display: 'flex', flexDirection: "row", gap: "8px", alignItems: "center"}}>
            <div className={`breakdown-icon-box`}> {icon} </div>
            <h2 className="widget-title"> {type} </h2>
        </div>  
    </div>
  )
  const { budget, spent, costItems, recentItems } = data;

  const { posted, committed } = costItems;
  const postedSum = calculateTotalSum(posted);
  const committedSum = calculateTotalSum(committed);

  const actualSpent = postedSum + committedSum;
  const color = getStatusColor(budget, actualSpent);

  const utilizationRate = budget === 0 ? "-" : (spent / budget) * 100;
  const remainder = budget - spent;

  return(
    <div 
    className="widget budget-gradient-border" 
    style={{
        display: "grid", 
        gridTemplate: "1fr / .2fr .5fr .2fr", 
        gap: "15px", 
        justifyContent: "space-between", 
        color: color
    }}
    >
        <div className="budget-left" style={{border: "none", display: "flex", flexDirection: "column", gap: "20px"}}> 
            <div style={{display: 'flex', flexDirection: "row", gap: "8px", alignItems: "center"}}>
                <div className={`breakdown-icon-box`}> {icon} </div>
                <div className="widget-title" style={{filter: "brightness(1.1)"}}> {type} </div>
            </div>
            
            <div style={{display: "flex", alignSelf: "flex-start", flexDirection: "column", gap: "0px"}}> 
                <div className="percent-text" style={{fontSize: "36px", color: color, filter: "brightness(1)", textAlign: "left"}}>
                    {percentFomatter(utilizationRate)}
                </div>
                <h5 style={{textAlign: "left"}}> 
                    Budget Used
                </h5>
            </div>
        </div>

        <div style={{display: 'flex', flexDirection: "column", justifyContent: "flex-end", gap: "15px", height: "90%", alignSelf: "center"}}> 
            <div style={{display: "grid", gridTemplate: "1fr / 1fr 1fr 1fr", gap: "5%", alignItems: "center", textAlign: "left"}}>

                <div style={{display: "flex", flexDirection: "column", gap: "10px"}}>
                    <h5> 
                        BUDGETED
                    </h5> 
                    <MoneyDisplay value={budget} tag={"h2"}/>
                </div>

                <div style={{display: "flex", flexDirection: "column", gap: "10px"}}>
                    <h5> 
                        SPENT
                    </h5> 
                    <MoneyDisplay value={spent} tag={"h2"}/>
                </div>

                <div style={{display: "flex", flexDirection: "column", gap: "10px"}}>
                    <h5> 
                        {spent > budget ? "EXCEEDED" : "REMAINING"}
                    </h5> 
                    <span style={{color: color}}> 
                        <MoneyDisplay value={remainder} tag={"h2"} />
                    </span>
                </div>
            </div>
            <BudgetBar budget={budget} costItems={costItems} color={color}/>
        </div>
        
        {!open && 
            <div style={{display: 'flex', flexDirection: "column",  paddingTop: "5px", justifyContent: "center", gap: "20px", height: '100%'}} onClick={() => openBreakdownPage(type)}> 
                <div className="chart-button" style={{width: '110px', height: '40px', alignSelf: "flex-end", justifySelf: "center"}}>
                    <h5> Details → </h5>
                </div>
            </div>
        }

        <div style={{position: "absolute", top: "15px", right: "20px", display: 'flex', flexDirection: 'row', gap: "5px", justifyContent: "flex-end"}}> 
            <h5>
                Updated
            </h5>
            <h4>
                {relativeTime}
            </h4>
        </div>

    </div>
  )

}

export default Budget;