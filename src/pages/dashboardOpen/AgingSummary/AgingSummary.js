import { useHome } from "context/HomeContext";
import { dollarFormatter } from "utils/formatters";

function AgingSummary({data}){
    const { openData, updateFocusedId } = useHome();
    const { focused } = openData;

    if(!data) return(
        <div className="home-agingsummary-widget">
            <div className="loading-widget"/>
        </div>
    )

    const titleMap = {
        "current": "Current",
        "over": "1 - 30 days",
        "over30": "31 - 60 days",
        "over60": "61 - 90 days",
        "over90": "91+ days",
        "total": "Total"
    }

    const titleColor = {
        "current": 'var(--secondary-font)',
        "over": 'var(--secondary-font)',
        "over30": 'var(--secondary-font)',
        "over60": 'var(--orange)',
        "over90": 'var(--red)',
        "total": 'var(--secondary-font)'
    }

    const titleWeight = {
        "current": '500',
        "over": '500',
        "over30": '500',
        "over60": '600',
        "over90": '600',
        "total": "600",
    }

    console.log(data)
    function addAgingTotals(data) {
        const apTotal = data.slice(0, 5).reduce((sum, item) => sum + item.amount, 0);
        const apCount = data.slice(0, 5).reduce((sum, item) => sum + item.count, 0);
        
        const arTotal = data.slice(5, 10).reduce((sum, item) => sum + item.amount, 0);
        const arCount = data.slice(5, 10).reduce((sum, item) => sum + item.count, 0);
        
        const apTotalObj = {
          type: "AP",
          aging_category: "total",
          amount: apTotal,
          count: apCount
        };
        
        const arTotalObj = {
          type: "AR", 
          aging_category: "total",
          amount: arTotal,
          count: arCount
        };
        
        const result = [
          ...data.slice(0, 5),    
          apTotalObj,             
          ...data.slice(5, 10),   
          arTotalObj              
        ];
        
        return result;
      }

    const totalData = addAgingTotals(data);

    const singleItem = (obj) => {
        const active = focused && focused === `${obj.type}-${obj.aging_category}`
        return(
        <div
          className={`aging-box jobcost-detail-box clickable-widget ${obj.aging_category === "under7" ? "" : "left-border"} ${active && "active-aging"}`}
          onClick={() => updateFocusedId(`${obj.type}-${obj.aging_category}`)}
          style={{
            display: "flex",
            flexDirection: "column",
            textAlign: "left",
            background: 'var(--dark)',
            paddingInline: "25px",
            paddingBlock: "15px",
            paddingTop: "10px",
            borderLeft: "none",
          }}
        >
          <h4 style={{color: titleColor[obj.aging_category], fontWeight:  titleWeight[obj.aging_category]}}> {titleMap[obj.aging_category]}</h4>
          <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
            <h2 style={{ fontSize: "18px" }}>
              {dollarFormatter(obj.amount)}
            </h2>
            <div className="jobcost-hl" />
            <h5>
              {obj.count} {obj.count === 1 ? "item" : "items"}
            </h5>
          </div>
        </div>
        )
    }
    
    return(
        <> 
        <div className="home-agingsummary-widget clickable-widget">
            <div className="border-after" style={{ display: 'flex', flexDirection: "column", gap: "10px"}}>
                <div style={{display: "flex", paddingLeft: '25px', flexDirection: "row", alignItems: 'center', gap: "15px" }}> 
                    <div style={{height: "10px", width: "10px", display: "flex", justifyContent: "center", alignItems: "center", background: "var(--red)", padding: "10px", borderRadius: '5px'}}> 
                        <h3 style={{fontSize: "12px"}}> AP </h3>
                    </div>
                    <h3> Payables Aging </h3>
                </div> 
                <div style={{display: 'grid', gridTemplateColumns: "1fr 1fr 1fr 1fr 1fr 1fr"}}>
                    {totalData.slice(0,6).map((item) => singleItem(item))}
                </div>
            </div>
        </div>
        <div className="home-agingsummary-widget clickable-widget">
            <div style={{display: 'flex', flexDirection: "column", gap: "10px"}}>
                <div style={{display: "flex", paddingLeft: '25px',  flexDirection: "row", alignItems: 'center', gap: "15px" }}> 
                    <div style={{height: "10px", width: "10px", display: "flex", justifyContent: "center", alignItems: "center", background: "var(--green)", padding: "10px", borderRadius: '5px'}}> 
                        <h3 style={{fontSize: "12px"}}> AR </h3>
                    </div>
                    <h3> Recievables Aging </h3>
                </div> 
                <div style={{display: 'grid', gridTemplateColumns: "1fr 1fr 1fr 1fr 1fr 1fr"}}>
                    {totalData.slice(6,12).map((item) => singleItem(item))}
                </div>
            </div>
        </div>
        </>
    )
}

export default AgingSummary;