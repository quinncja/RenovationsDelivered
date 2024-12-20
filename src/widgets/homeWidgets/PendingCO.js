import { useHome } from "context/HomeContext";
import { useTrackedJobs } from "context/TrackedJobContext";
import { useHomeData } from "utils/hooks/useHomeData";
import { useRef, useEffect } from "react"
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

function PendingCO(){
    const id = "pending-co"
    const { homeState } = useHome()
    const { dataMap, updateDataMap } = useHome();
    const { trackedJobs } = useTrackedJobs();
    const loadData = useHomeData();
    const abortControllerRef = useRef(null);
    const navigate = useNavigate();
    let showCount = -10;

    const query = homeState === "year" ? "" : trackedJobs && trackedJobs.join(",");
    
    const pendingCount = dataMap[id] || null;

    if(pendingCount)
        if(pendingCount[0].pendingCount) showCount = pendingCount[0].pendingCount;
        else showCount = 0;

    useEffect(() => {
        const fetchData = async () => {

          try {
            if (abortControllerRef.current) {
                abortControllerRef.current.abort();
            }
    
            const controller = new AbortController();
            abortControllerRef.current = controller;
            await loadData(id, {recnums: query}, controller.signal);
    
            } catch (error) {
            toast.error(`Failed to load pending change orders`);
            updateDataMap(id, null);
          }
        }
    
        fetchData();
        // eslint-disable-next-line
    }, [homeState, trackedJobs]);


    if(showCount === -1 )
    return(
        <div className="home-widget home-widget-sm">
            <strong style={{color: "white"}}>
                No data
            </strong>
        </div>
    )
    if(showCount >= 0)
    return (
      <div className="home-widget home-widget-sm clickable-home" onClick={() => navigate('/change-orders/pending')}>
        <span
          className={`home-widget-num`}
        >
          {" "}
          {showCount}{" "}
        </span>
        <span className="home-widget-title">
          {" "}
          {"Pending"} <br/> {"change orders"}{" "}
        </span>
      </div>
    );
    return (
        <div className="home-widget home-widget-sm">
          <span
            className={`home-widget-num ${"home-widget-loading"}`}
          >
            {" "}
          </span>
          <span className="home-widget-title">
            {" "}
          </span>
        </div>
    );


}

export default PendingCO;