import { runSvg } from "business/svg";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { getLastRan, runReport } from "utils/api";

const { useEffect, useState } = require("react");


function Report(props){
    const { report } = props;
    const { type, text, icon } = report;
    const Navigate = useNavigate();
    const [lastRan, setLastRan] = useState(-1);
    const [newRun, setNewRun] = useState(false);

    const dateOptions = {
        weekday: "long",
        day: "numeric",
        month: "short",
        hour: "numeric",
        minute: "numeric",
        timeZone: "America/Chicago",
    };
      
    const dateToString = (date) => {
        return date.toLocaleString("en-US", dateOptions);
    };

    const user = lastRan !== -1 ? lastRan.ran_by : "";
    const time = lastRan !== -1 ? dateToString(new Date(lastRan.ran_on)) : "";

    const handleClick = async () => {
        try {
            const response = await runReport(type);
            setNewRun(!newRun)
            Navigate(`/reports/${type}/${response.data._id}`)
        } catch (error){
            console.log(error)
        }
    }

    useEffect(() => {
        const loadLastRan = async () => {
            try{
                const response = await getLastRan(type);
                setLastRan(response.data);
            } catch (error) {
                toast.error(`Failed to load last ${type} run`)
            }
        }

        loadLastRan();

    }, [newRun, type])

    return(
        <div style={{display: "flex", flexDirection: "row", gap: "10px", alignItems: "center"}}> 
            <div className="report-card clickable-widget" key={type} onClick={() => Navigate(`/reports/${type}`)}>
                <div className="report-icon"> {icon} </div>
                <div style={{display: "flex", flexDirection: "column", gap: "10px"}}> 

                <h2>{text} </h2>
                    <div className="last-ran">
                        <strong> Last ran </strong>
                        <p style={{opacity: lastRan === -1 ? 0 : 1, transition: "all .3s ease-in-out"}}> {lastRan.length === 0 ? "Never" : `${user} - ${time}`} </p>
                    </div>
                </div>
            </div>
            <button className="run-button" title="Run Report" onClick={handleClick}>
                {runSvg()}
            </button>
        </div>
    )
}

export default Report;