import { dollarFormatter } from "utils/formatters";
import useIsAdmin from "utils/hooks/useIsAdmin";

function FinancialOverview(props){
    const { data }  = props;
    const {
        Budget = 0,
        Contract = 0,
        coBudget = 0,
        coContract = 0,
        Cost = 0,
        ChangeOrderCount = 0
    } = data[0] || {};
    const totBudget = Budget + coBudget;
    const totContract = Contract + coContract;
    const isAdmin = useIsAdmin();

    const margin = (totContract - Cost) / totContract;
    const marginAmnt = totContract - Cost || 0

    const underBudget = totBudget - Cost;
    const text = underBudget >= 0 ? "Under budget" : "Over budget";


    const ytdObjs = [
        {
            header: "Original",
            c: Contract, 
            b: Budget
        },
        {
            header: `${ChangeOrderCount || 0} Change Order${ChangeOrderCount === 1 ? "" : "s"}`,
            c: coContract, 
            b: coBudget,
        },
        {
            header: "Total",
            c: totContract, 
            b: totBudget,
            t: Cost,
        },
    ]

    const ytdItem = (obj) => {
        return(
            <div className="ytd-item"> 
            <h2> {obj.header} </h2>
            {isAdmin && (
                <div className={`ytd-single `}>
                <p> Contract </p>
                <h2> {dollarFormatter(obj.c || 0)} </h2>
                </div>
            )}
            <div className={` ${!isAdmin ? "ytd-no-margin" : ""} ytd-single `}>
                <p> Budget </p>
                <h2> {dollarFormatter(obj.b || 0)} </h2>
            </div>
            {obj.header === "Total" &&(
                <div className={` ${!isAdmin ? "ytd-no-margin" : ""} ytd-single `}>
                    <p> Cost </p>
                    <h2> {dollarFormatter(obj.t || 0)} </h2>
                </div>
            )}
            </div>
        )
    }
    return(
        <>
        <h2 className={`${underBudget >= 0 ? "under" : "over"} open-ytd-h2`}> {dollarFormatter(underBudget)} {text} </h2>

        <div className="ytd-row">
            {ytdItem(ytdObjs[0])}
               <span className="ytd-span"> + </span> 
            {ytdItem(ytdObjs[1])}
            <span className="ytd-span"> = </span> 
            {ytdItem(ytdObjs[2])} 
        </div>
        <div className="ytd-row" style={{paddingTop: '3px'}}>
        <div className="ytd-item"/> 
        <span className="ytd-span" style={{opacity: "0", userSelect: "none"}}> + </span> 
        <div className="ytd-item"/> 
        <span className="ytd-span" style={{opacity: "0", userSelect: 'none'}}> + </span> 
        <div className="ytd-item"> 
        <div className="divising-line"/>
        {isAdmin && ( <div className={` ${!isAdmin ? "ytd-no-margin" : ""} ytd-single `}>
            <p> Margin ($)</p>
            <h2> {dollarFormatter(marginAmnt)}  </h2>
        </div>) }
        <div className={` ${!isAdmin ? "ytd-no-margin" : ""} ytd-single `}>
            <p> Margin (%) </p>
            <h2> {((margin || 0) * 100).toFixed(2)}%  </h2>
        </div>
        </div>  
        </div>  
        </>
    )
}

export default FinancialOverview;