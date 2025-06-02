import { useHome } from "context/HomeContext";
import PhaseCountChart from "./PhaseCountChart";

function PhaseCount() {
    const id = "phase-overview";
    const { getWidgetDataById, openPage } = useHome();
    const data = getWidgetDataById(id);
    const year = new Date().getFullYear();
    
    if(!data) return(
      <div className="home-phasecount-widget loading-widget"/>
    )
    
    const total = data.find((datum) => datum.phase === "total");

    return(
      <div className="home-phasecount-widget clickable-widget" onClick={() => openPage(id)}>
        <div style={{display: "flex", justifyContent: "space-between", padding: "25px", paddingBottom: "0px"}}>
          <div style={{ display: "flex", flexDirection: "column", textAlign: "left" }}>
            <h4> {year} phase count</h4>
            <h2 style={{ fontSize: "32px" }}> {total.current_year_closed + total.current_year_open} </h2>
          </div>
          <div style={{display: "flex", flexDirection: "row", gap: "30px"}}> 
            <div style={{display: "flex", flexDirection: "row", gap: "15px", alignItems: "center"}}> 
            <div style={{width: "15px", height: "15px", borderRadius: "5px", background: "var(--closed)"}}/>
            <div style={{ display: "flex", flexDirection: "column", textAlign: "left" }}>
            <h4> Closed</h4>
            <h2 style={{ fontSize: "32px" }}> {total.current_year_closed} </h2>
            </div>
          </div>
          <div style={{display: "flex", flexDirection: "row", gap: "30px"}}> 
            <div style={{display: "flex", flexDirection: "row", gap: "15px", alignItems: "center"}}> 
            <div style={{width: "15px", height: "15px", borderRadius: "5px", background: "var(--open)"}}/>
            <div style={{ display: "flex", flexDirection: "column", textAlign: "left" }}>
            <h4> Open</h4>
            <h2 style={{ fontSize: "32px" }}> {total.current_year_open} </h2>
            </div>
          </div>
          </div>
          </div>
        </div>
        <div className="phase-chart" style={{flex: 1, minHeight: 0, paddingBottom: "25px"}} onClick={(e) => e.stopPropagation()}>
          <PhaseCountChart id={id} data={data}/>
        </div>
      </div>
    )
  }

export default PhaseCount;