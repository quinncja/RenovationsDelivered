import { useHome } from "context/HomeContext";
import { dollarFormatter } from "utils/formatters";

function AgingSummary(){
    const id = "aging-summary";
    const { getWidgetDataById, openPage } = useHome();
    const data = getWidgetDataById(id);
    
    if(!data) return(
        <div className="home-agingsummary-widget">
            <div className="loading-widget"/>
        </div>
    )

    const titleMap = {
        "under7": "Due in 7 days",
        "under30": "Due in 30 days",
        "over1": "Overdue 1 - 30 days",
        "over30": "Overdue > 30 days"
    }

    const singleItem = (obj) => {
        return(
        <div
          className={`aging-box jobcost-detail-box clickable-widget ${obj.aging_category === "under7" ? "" : "left-border"}`}
          onClick={(e) => {
            e.stopPropagation();
            openPage(id, `${obj.type}-${obj.aging_category}`)
          }}
          style={{
            display: "flex",
            flexDirection: "column",
            textAlign: "left",
            background: 'var(--dark)',
            paddingInline: "25px",
            paddingBlock: "15px",
            borderLeft: "none",
          }}
        >
          <h4 style={{color: (obj.aging_category === "over30" || obj.aging_category === "over1") ? 'var(--red)' : "var(--secondary-font)", fontWeight:  (obj.aging_category === "over30" || obj.aging_category === "over1")  ? '500' : "400"}}> {titleMap[obj.aging_category]}</h4>
          <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
            <h2 style={{ fontSize: "24px" }}>
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
        <div className="home-agingsummary-widget clickable-widget" onClick={() => openPage(id)}>
            <div className="border-after" style={{ display: 'flex', flexDirection: "column", gap: "10px"}}>
                <div style={{display: "flex", flexDirection: "row", alignItems: 'center', gap: "15px" }}> 
                    <div style={{height: "10px", width: "10px", display: "flex", justifyContent: "center", alignItems: "center", background: "var(--red)", padding: "10px", borderRadius: '5px'}}> 
                        <h3 style={{fontSize: "12px"}}> AP </h3>
                    </div>
                    <h3> Payables Aging </h3>
                </div> 
                <div style={{display: 'grid', gridTemplateColumns: "1fr 1fr 1fr 1fr"}}>
                    {data.slice(0,4).map((item) => singleItem(item))}
                </div>
            </div>
        </div> 
        <div className="home-agingsummary-widget clickable-widget" onClick={() => openPage(id)}>
            <div style={{display: 'flex', flexDirection: "column", gap: "10px"}}>
                <div style={{display: "flex", flexDirection: "row", alignItems: 'center', gap: "15px" }}> 
                    <div style={{height: "10px", width: "10px", display: "flex", justifyContent: "center", alignItems: "center", background: "var(--green)", padding: "10px", borderRadius: '5px'}}> 
                        <h3 style={{fontSize: "12px"}}> AR </h3>
                    </div>
                    <h3> Recievables Aging </h3>
                </div> 
                <div style={{display: 'grid', gridTemplateColumns: "1fr 1fr 1fr 1fr"}}>
                    {data.slice(4,8).map((item) => singleItem(item))}
                </div>
            </div>
        </div>
        </>
    )
}

export default AgingSummary;