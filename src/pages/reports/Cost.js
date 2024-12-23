import { useState } from "react";
import { costTypeFormatter, dateTimeToString, dollarFormatter, formatSageUsername } from "utils/formatters";
import { motion, AnimatePresence } from "framer-motion";

function Cost(props){
    const {item} = props;
    const {
        _id,
        amount,
        desc,
        job_name,
        jobnum,
        recnum,
        type,
        insert_by,
        insert_date,
        update_by,
        update_date,
        vendor,
        vndnum,
    } = item;
    const [isOpen, setOpen] = useState(false);
    const [tooltip, setTooltip] = useState(null);

    const handleClick = (e, value, type) => {
        e.stopPropagation();
        navigator.clipboard.writeText(value).then(() => {
            setTooltip({ x: e.clientX, y: e.clientY, message: ` ${type} copied` });
            
            setTimeout(() => {
                setTooltip(null);
            }, 1000);
        });
    }

    return(
        <div className="cost-item" onClick={() => setOpen(!isOpen)}>
            <div className="cost-body"> 
            <div className="cost-left">
            <h3> {dollarFormatter(amount)}</h3>
            <h2> {`${desc}`} </h2>
            <div className="home-widget-title copy-btn" onClick={(e) => handleClick(e, jobnum, "Job number")}> {job_name} </div>
            </div>
            <div className="cost-right">
            <div className="home-widget-title copy-btn" onClick={(e) => handleClick(e, recnum,  "Record number")}> {recnum} </div>
            <div className="cost-bottom-right"> 
            <div className="home-widget-title"> {costTypeFormatter(type)} </div>
            <div className="home-widget-title copy-btn" onClick={(e) => handleClick(e, vndnum || "",  "Vendor number")}> {vendor} </div>
            </div>
            </div>
            </div>
            <AnimatePresence>
            {isOpen &&
                <motion.div 
                className="cost-bottom"
                style={{ overflow: "hidden" }}
                initial={{ height: 0 }}
                animate={{ height: "120px" }} 
                transition={{ duration: 0.3, ease: "easeInOut" }}
                exit={{ height: 0 }}
                key={_id}
                >
                    <div className="cost-bottom-item">
                    <div className="home-widget-title hwt-strong"> Created </div>
                    <div className="home-widget-title"> {formatSageUsername(insert_by)} - {dateTimeToString(new Date(insert_date))}</div>
                    </div>
                    {update_by && 
                        <div className="cost-bottom-item">
                        <div className="home-widget-title hwt-strong"> Updated </div>
                        <div className="home-widget-title"> {formatSageUsername(update_by)} - {dateTimeToString(new Date(update_date))}</div>
                        </div>
                    }
                </motion.div>
            }
            </AnimatePresence>
            {tooltip && (
                <div 
                    style={{ 
                        position: 'fixed', 
                        left: tooltip.x, 
                        top: tooltip.y - 10,
                        transform: 'translateX(-50%) translateY(-100%)', 
                        background: 'var(--primary)', 
                        color: 'var(--white)', 
                        padding: '10px 10px', 
                        borderRadius: '4px', 
                        fontSize: '14px', 
                        pointerEvents: 'none',
                        zIndex: "100"
                    }}
                >
                    {tooltip.message}
                </div>
            )}
        </div>
    )

}

export default Cost;