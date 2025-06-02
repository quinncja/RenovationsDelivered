import Phase from "./Phase";
import PhaseCountOpenChart from "./PhaseCountOpenChart";

function PhaseCountPage({ focused, data }) {

    const {widgetData, homeData} = data || {};
    const year = new Date().getFullYear();
    const lastYear = year - 1;
    const totalData = widgetData && widgetData.find(item => item.phase === "total");
    const totalYearPhases = totalData ? totalData.current_year_closed + totalData.current_year_open : undefined
    const lastYearTotalPhases = totalData ? totalData.previous_year_closed + totalData.previous_year_open : undefined

    const filteredPhases = 
        focused && homeData ? 
        homeData.filter((phase) => phase.Status === focused.status && phase.phase_num === focused.phase)
        : homeData;

    const renderHeader = () => {
        if(!widgetData) return(
            <div style={{width: '100%', height: "107px", borderRadius: "5px", border: "1px solid var(--fancy-border)", background: "var(--dark)", position: "relative"}}>
                <div className="loading-widget"/>
            </div>
        )
        return(
            <div className="open-phase-count-header" style={{display: "flex", justifyContent: "space-between", alignContent: "center"}}>
            <div style={{display: 'flex', flexDirection: "column", textAlign: "left"}}>
            <h4> 
                {year} phase count
            </h4>
            <h2 style={{ fontSize: "32px" }}>
                {totalYearPhases}
            </h2>
            </div>
            <div style={{display: "flex", flexDirection: "row", gap: "30px"}}> 
            <div style={{display: "flex", flexDirection: "row", gap: "15px", alignItems: "center"}}> 
            <div style={{width: "15px", height: "15px", borderRadius: "5px", background: "var(--closed)"}}/>
            <div style={{ display: "flex", flexDirection: "column", textAlign: "right" }}>
            <h4> Closed</h4>
            <h2 style={{ fontSize: "32px" }}> {totalData?.current_year_closed || ""} </h2>
            </div>
          </div>
          <div style={{display: "flex", flexDirection: "row", gap: "30px"}}> 
            <div style={{display: "flex", flexDirection: "row", gap: "15px", alignItems: "center"}}> 
            <div style={{width: "15px", height: "15px", borderRadius: "5px", background: "var(--open)"}}/>
            <div style={{ display: "flex", flexDirection: "column", textAlign: "right" }}>
            <h4> Open</h4>
            <h2 style={{ fontSize: "32px" }}> {totalData?.current_year_open || ""} </h2>
            </div>
            </div>

            <div style={{display: "flex", flexDirection: "row", gap: "15px", alignItems: "center"}}> 
            <div style={{width: "15px", height: "15px", borderRadius: "15px", background: "#ff6b6b"}}/>
            <div style={{ display: "flex", flexDirection: "column", textAlign: "right" }}>
            <h4> {lastYear} </h4>
            <h2 style={{ fontSize: "32px" }}> {lastYearTotalPhases} </h2>
            </div>
            </div>
            </div>
          </div>
        </div>
        )
    }

    return(
        <> 
        {renderHeader()}
        <div style={{display: 'flex', width: "100%", gap: "10px"}}>
            <div className="widget-wrapper" style={{paddingTop: "20px"}}> 
                {widgetData ? <PhaseCountOpenChart data={widgetData} focused={focused}/> : <div className="loading-widget"/>}
            </div>
        </div>
        <div style={{display: 'flex', flexDirection: "column", gap: "0px", width: "100%"}}>
            {filteredPhases ? filteredPhases.map((phase) => <Phase data={phase}/>) 
            : <div className="widget-wrapper"> <div className="loading-widget"/> </div> }
        </div>
        </>
    )
}

export default PhaseCountPage;