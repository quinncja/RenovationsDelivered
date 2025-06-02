import { useState, useEffect } from "react";
import { formatNumberShort } from "utils/formatters";
import PieChart from "./PieChart";
import { listSvg, pieSvg } from "business/svg";
import { useProjectContext } from "context/ProjectContext";
import { useHome } from "context/HomeContext";

function Insight(props){
  const { id, type, data } = props;
  const { getJobStr } = useProjectContext();
  const { openPage } = useHome();
  
  const localStorageKey = `insight-showList-${type}`;
  
  const [showList, setShowList] = useState(() => {
    const saved = localStorage.getItem(localStorageKey);
    return saved !== null ? JSON.parse(saved) : true;
  });

  useEffect(() => {
    localStorage.setItem(localStorageKey, JSON.stringify(showList));
  }, [showList, localStorageKey]);

  const sumValues = (array) => {
    if (!array || !Array.isArray(array)) {
      console.log('sumValues received:', array);
      return 0;
    }
    return array.reduce((sum, obj) => sum + (obj.value || 0), 0);
  };

  const handleClick = () => {
    openPage(id)
  }
  const sum = sumValues(data);
  const slicedData = data.slice(0, 5);

  const getPercentage = (value) => {
    if (sum === 0) return "0%";
    const percentage = (value / sum) * 100;
    return `${percentage.toFixed(2)}%`;
  };

  const renderList = () => {
    return(
      slicedData.map((data, index) => {
        const name = type === "Project" ? getJobStr(data.jobNumber) : data.id;
        return(
          <div className="insight-item" key={index} onClick={() => openPage(id, data.id)}>
            <div style={{display: "flex", flexDirection: "row", alignItems: "center", gap: "10px"}}>
              <div className={`insight-box insight-box-${index}`} style={{flexShrink: "0"}}>
                <h4> {index + 1} </h4>
              </div>
              <div style={{display: "flex", flexDirection: "column", alignItems: "flex-start"}}>
                <h4 className="truncate-text" style={{color: "var(--white)", textAlign: "left"}}> {name} </h4>
                <h4> {getPercentage(data.value)} </h4>
              </div>
            </div>
            <h4 style={{color: "var(--white)", fontWeight: 600, fontSize: '16px'}}> ${formatNumberShort(data.value)} </h4>
          </div>
        )
      })
    )
  }

  return(
    <div className="insight clickable-widget" onClick={handleClick}>
      <div style={{display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center", boxSizing: 'border-box', width: '100%', paddingBottom: '5px'}}>
        <h3 style={{textAlign: "left", padding: '15px', paddingInline: "20px", paddingTop: "20px", paddingBottom: "10px", boxSizing: "border-box"}}> Top {type}s </h3>
        <button className="insight-button" onClick={(e) => {
            e.stopPropagation(); 
            setShowList(!showList)
        }}> {showList ? pieSvg() : listSvg()} </button>
      </div>
      <div className="insight-chart" onClick={(e) => e.stopPropagation()} style={{display: "flex", flexDirection: "column", gap: "0px", justifyContent: 'space-between', flex: 1, boxSizing: "border-box", height: "100%", width: '100%'}}>
        {showList ? renderList() : <PieChart data={data} type={type}/>}
      </div>
    </div>
  )
}

export default Insight;