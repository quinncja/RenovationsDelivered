import { useHome } from "context/HomeContext";
import AgingItems from "./AgingItems";
import AgingSummary from "./AgingSummary";

function AgingSummaryPage({ data, id }){
    const { widgetData, homeData } = data || {};
    const { openData } = useHome();
    const { focused } = openData;

    let itemsList;
    if(focused) itemsList = homeData ? homeData.filter((item) => item.type === focused) : undefined;
    else itemsList = homeData;

    return(
        <div style={{display: 'flex', flexDirection: "column", gap: "10px", width: "100%"}}> 
            <AgingSummary data={widgetData}/>
            <AgingItems data={itemsList}/>
        </div>
    )
}

export default AgingSummaryPage;