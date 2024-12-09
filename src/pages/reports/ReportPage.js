import { useNavigate, useParams } from "react-router-dom";
import { reportList } from "./reportList";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { getReports, deleteRun, runReport } from "utils/api";
import Run from "./Run";
import { runSvg } from "business/svg";

function ReportPage(){
    const { param } = useParams();
    const Navigate = useNavigate();
    const reportType = reportList.find((report) => report.type === param)
    if(!reportType) Navigate("/reports")
    const { text, type } = reportType;
    const [ runs, setRuns ] = useState();

    const deleteReport = async (id) => {
        try{
            await deleteRun(id)
            setRuns((prevRuns) => prevRuns.filter((run) => run._id !== id));
            toast.success(`${type.toLocaleUpperCase()} report deleted successfully`)
        } catch (error){
            toast.error(`failed to delete ${type.toLocaleUpperCase()} report`)
        }
    }
    
    const handleClick = async () => {
        try {
            const response = await runReport(type);
            setRuns((prev) => {
                return [response.data, ...(prev || [])];
              });
        } catch (error){
            console.log(error)
        }
    }

    useEffect(() => {
        const fetchReports = async () => {
            try{
                const response = await getReports(type);
                console.log(response)
                setRuns(response.data)
            } catch (error) {
                toast.error(`Failed to load ${type} reports`)
            }
        }

        fetchReports();
    }, [])

    return(
        <div className="dashboard-welcome user-page">
            <div style={{display: "flex", alignItems: "center", gap: "15px"}}>  
            <h1> {text} </h1> 
            <button className="run-button run-button-wide" title="Run Report" onClick={handleClick}>
                {runSvg()} Run report
            </button>
            </div>
            {runs && runs.length === 0 && (
                <div className="home-widget-title"> No previous reports </div>
            )}       
            {runs && runs.length > 0 && (
            <>
            <h2>Most Recent Report</h2>
            <div className="run-container" style={{paddingTop: "10px"}}>
                <Run run={runs[0]} deleteReport={deleteReport} />
            </div>
            </>
            )}
            {runs && runs.length > 1 && (
            <>
                <h2>Previous Reports </h2>
                <div className="run-container" style={{paddingTop: "10px"}}>
                {runs.slice(1).map((run, index) => (
                    <Run key={run._id || index} run={run} deleteReport={deleteReport}/>
                ))}
                </div>
            </>
            )}
        </div>
    )
}

export default ReportPage;