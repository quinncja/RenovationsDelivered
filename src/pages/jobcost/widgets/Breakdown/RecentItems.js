import { fileSvg } from "business/svg"
import { useModalContext } from "context/ModalContext";
import { getColor } from "utils/colors"
import { dateFormatter, dateTimeToString, dollarFormatter } from "utils/formatters"

function RecentItems(props){
    const {items} = props
    const { openModalWithData } = useModalContext();
    
    const handleClick = (e, entry) => {
        e.stopPropagation()
        if (entry.imagePath)
          openModalWithData("attachment", {
            path: entry.imagePath,
            name: entry.imageName,
            user: entry.imageUser,
          });
        else return;
      };


    const renderItem = (item, last) => {

        if(last && !item) return(
            <div className="recent-item" style={{borderRadius: last ? "0px 0px 5px 5px" : "0px", marginBottom: last ? "10px" : "0px", opacity: "0"}}>
            <div style={{display: "flex", flexDirection: 'row', gap: '15px', alignItems: "center"}}> 
                <span className="tooltip-cube bigger-cube"></span>
                <div style={{display: "flex", flexDirection: "column", textAlign: "left"}}> 
                    <h4 style={{color: "var(--white)"}}> - </h4>
                    <h5> - </h5>
                </div>
            </div>
            <div style={{display: "flex", flexDirection: "column", textAlign: "right"}}> 
                <h4 style={{color: "var(--white)"}}> - </h4>
                <h5 style={{fontStyle: "italic", opacity: .8}}> - </h5>
            </div>
        </div>
        )
        return(
            <div className="recent-item" style={{borderRadius: last ? "0px 0px 5px 5px" : "0px", marginBottom: last ? "10px" : "0px"}} onClick={(e) => handleClick(e, item)}>
                <div style={{display: "flex", flexDirection: 'row', gap: '15px', alignItems: "center"}}> 
                {item.imagePath ? <div className="tooltip-cube bigger-cube cube-svg"> {fileSvg(getColor(item.id, "Tranquil"))} </div> : <span className={`tooltip-cube bigger-cube ${item?.type === "committed" ? "committed-cube" : ""}`} style={{ backgroundColor: getColor(item.id, "Tranquil")}}></span> }
                        <div style={{display: "flex", flexDirection: "column", textAlign: "left"}}> 
                            <h4 style={{color: "var(--white)"}}> {item.id} </h4>
                            <h5> {item.dscrpt} </h5>
                        </div>
        
                </div>
                <div style={{display: "flex", flexDirection: "column", textAlign: "right"}}> 
                    <h4 style={{color: "var(--white)"}}> {dollarFormatter(item.value)} </h4>
                    <h5 style={{fontStyle: "italic", opacity: .8}}> {item.upddte ? dateTimeToString(dateFormatter(item.upddte)) : dateTimeToString(dateFormatter(item.insdte))} </h5>
                </div>
            </div>
        )
    }

    return(
        <div className="recent-items" style={{justifySelf: 'flex-start', paddingBottom: "0px", paddingTop: "5px", display: "flex", flexDirection: 'column', gap: "5px"}}>
            <h4 style={{textAlign: "left", paddingInline: '25px'}}> Recent Items </h4>
            <div style={{display: 'flex', flexDirection: "column", gap: "0px"}}> 
                {renderItem(items[0] || false, false)}
                {renderItem(items[1] || false, true)}
            </div>
        </div>
    )
}

export default RecentItems;