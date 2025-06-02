import { filePenSvg, hardHatSvg } from "business/svg";
import { useJobCostContext } from "context/JobCostContext";
import { useNavigate } from "react-router-dom";

function SubcontractButton(){
    const navigate = useNavigate()
    const { jobData, getCommittedCosts, getPostedCosts } = useJobCostContext();
    let totalSubs;
    if(jobData){
        const commited = getCommittedCosts(4).length;
        const posted = getPostedCosts(4).length;
        totalSubs = commited + posted;
    }

    return(
        <div className="job-cost-header-button" title="View change orders" style={{paddingLeft: "15px", paddingRight: "20px", gap: "15px"}} onClick={() => navigate(`/jobcost/breakdown/subcontractors`)}>
            <div style={{marginTop: '5px'}}> {hardHatSvg()}</div>
                {jobData ?
                <div style={{display: "flex", flexDirection: "column", textAlign: "left"}}>
                    <h2 style={{fontWeight: 700}}> {totalSubs || 0}</h2>
                    <h5 style={{minWidth: "17ch"}}> {totalSubs && totalSubs === 1 ? "Subcontract" : "Subcontracts"} </h5>
                </div> : 
                <> 
                <div style={{display: "flex", flexDirection: "column", textAlign: "left", width: "7.5ch", position: "relative"}}> 
                    <div className="loading-widget"/>
                    <h5 style={{opacity: 0, minWidth: "17ch"}}> Subcontracts </h5>
                </div>
                </>
                }
        </div>
    )
}

export default SubcontractButton;