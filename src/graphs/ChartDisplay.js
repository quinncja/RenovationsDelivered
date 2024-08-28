import PieChart from "./PieChart/PieChart";
import LineChart from "./LineChart";
import { motion } from "framer-motion";
import BarChart from "./BarChart";
import { useUserContext } from "context/UserContext";
import { useEffect, useRef, useState, memo } from "react";
import svgToImage from "utils/hooks/svgToImage";
import { useDashboardContext } from "context/DashboardContext";

const ChartDisplay = memo(({ chartObj, data, open, id, handleClick}) => {
  const { label } = useUserContext();
  const { snapshots, setSnapshots, active } = useDashboardContext();
  const wrapperRef = useRef(null);
  const showImage = active;

  let showLabels;
  if(label === "always") showLabels = true;
  if(label === "open") showLabels = open;
  if(label === "never") showLabels = false;

  useEffect(() => {  
    if (data && wrapperRef.current && !open) {
      const svgElement = wrapperRef.current.querySelector('svg');      
      if (svgElement instanceof SVGElement) {

        svgToImage(svgElement).then((imageData) => {
          setSnapshots((prevSnapshots) => ({
            ...prevSnapshots,
            [id]: imageData,
          }));
        });
      }
    }
  }, []);

    
  useEffect(() =>{
    console.log("chart display rerender")
  }, [])

  
  const snapshotImage = snapshots[id];

  switch (chartObj.chartType) {
    case "Pie":
      return (
        <motion.div
          ref={wrapperRef}
          layoutId={`chart-container-${id}`}
          style={{ position: "relative", width: "320px", height: "360px"}}
        >
          {showImage ? 
           <img src={snapshotImage} draggable="false"  style={{ userSelect: "none", position: "relative", width: "100%", height: "89%"}}/>
          :
            <PieChart data={data} open={open} showLabel={showLabels} chartObj={chartObj}/>
          }
        </motion.div>
      );

    case "Line":
      return (
        <motion.div
          ref={wrapperRef}
          layoutId={`chart-container-${id}`}
          style={{ position: "relative", width: "660px", height: "320px" }}
        >
        {showImage ? 
           <img src={snapshotImage} alt="line" draggable="false" style={{ userSelect: "none", position: "relative", width: "97%", height: "100%"}}/>
          :
          <LineChart data={data} open={open} handleClick={handleClick} showLabel={showLabels} chartObj={chartObj}/>
        }
        </motion.div>
    );

    case "Bar": 
      return (
        <motion.div
          ref={wrapperRef}
          layoutId={`chart-container-${id}`}
          style={{ position: "relative", width: "660px", height: "320px" }}
        >
          <BarChart data={data} open={open} showLabel={showLabels}/>
        </motion.div>
      );

    default:
      return (
      <motion.div
        layoutId={`chart-container-${id}`}
      >
        {chartObj.display(data)}
      </motion.div>
      )
  }
});

export default ChartDisplay;

