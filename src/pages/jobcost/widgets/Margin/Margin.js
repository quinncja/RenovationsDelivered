import { displayMargin, getMarginColor } from "utils/funcs";
import { dollarFormatter } from "utils/formatters";
import { useJobCostContext } from "context/JobCostContext";
import MarginLineChart from "./MarginLineChart";
import useIsAdmin from "utils/hooks/useIsAdmin";

function Margin(){
    const { getDataByType } = useJobCostContext();
    const id = "margin";
    const data = getDataByType(id); 
    const isAdmin = useIsAdmin();

    if (!data) return;

    const total = data.find((item) => item.id === "total");
    const marginColor = getMarginColor(total.value);

    const phaseData = data
    .filter(item => item.id !== "total")
    .sort((a, b) => a.phase.localeCompare(b.phase));

    if(phaseData.length <= 1) return;

    return(
        <div className="home-margin-widget">
            <div style={{ display: "flex", flexDirection: "column", textAlign: "left", justifyContent: "center", width: '30%', gap: "20px", flexShrink: '0' }}>
                <div style={{ display: "flex", flexDirection: "column", textAlign: "left"}}>
                    <h4> Closed Margin</h4>
                    <h2 style={{ fontSize: "42px", color: marginColor }}> { displayMargin(total.value)} </h2>
                </div>
                <div style={{display: "flex", flexDirection: "column", gap: "6px", width: "100%"}}> 
                {isAdmin &&
                    <div style={{ display: "flex", flexDirection: "column", textAlign: "left"}}>
                        <h4> Profit </h4>
                        <h2 style={{ fontSize: "32px" }}> { dollarFormatter(total.TotalContract - total.TotalCost)} </h2>
                    </div>
                }
                </div>
            </div>
            <MarginLineChart phaseData={phaseData} marginColor={'#acadae'}/>
        </div>
    )
}

export default Margin