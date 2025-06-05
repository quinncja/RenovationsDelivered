import BreakdownBar from "./BreakdownBar";
import CostBreakdown from "./CostBreakdown";
import { motion } from "framer-motion";
import { itemFadeIn } from "utils/animations";
import { useJobCostContext } from "context/JobCostContext";
import RecentItems from "./RecentItems";
import EmptyBreakdown from "./EmptyBreakdown";
import {
  calculateTotalSum,
  getBreakdownIconByType,
  getIconBackground,
  getStatusColor,
} from "utils/funcs";

function Breakdown(props) {
  const { type } = props;
  const { getDataByType, openBreakdownPage } = useJobCostContext();
  const data = getDataByType(type);

  const icon = getBreakdownIconByType(type);

  if (!data)
    return (
      <div className="breakdown-widget loading-widget breakdown-loading-widget">
        <div className="breakdown-widget-header">
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              gap: "15px",
              alignItems: "center",
            }}
          >
            <div className={`breakdown-icon-box`}> {icon} </div>
            <h2 className="breakdown-title"> {type} </h2>
          </div>
        </div>
      </div>
    );

  const { budget, spent, costItems, recentItems } = data;

  if (!budget && !spent)
    return (
      <div className="breakdown-widget">
        <div className="breakdown-widget-header">
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              gap: "15px",
              alignItems: "center",
            }}
          >
            <div className={`breakdown-icon-box breakdown-icon-box-white`}>
              {" "}
              {icon}{" "}
            </div>
            <h2 className="breakdown-title"> {type} </h2>
          </div>
        </div>
        <EmptyBreakdown />
      </div>
    );

  const { posted, committed } = costItems;
  const postedSum = calculateTotalSum(posted);
  const committedSum = calculateTotalSum(committed);

  const actualSpent =  postedSum + committedSum;
  const background = getIconBackground(budget, actualSpent);
  const color = getStatusColor(budget, actualSpent);

  return (
    <div
      className="breakdown-widget clickable-widget"
      onClick={() => openBreakdownPage(type, null)}
    >
      <div className="breakdown-widget-header">
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            gap: "15px",
            alignItems: "center",
          }}
        >
          <div
            className={`breakdown-icon-box breakdown-icon-box-white`}
            style={{ background: background }}
          >
            {" "}
            {icon}{" "}
          </div>
          <h2 className="breakdown-title"> {type} </h2>
        </div>
      </div>
      <motion.div
        initial="hidden"
        animate="visible"
        exit="exit"
        style={{
          position: "relative",
          flex: 1,
          minHeight: 0,
          gap: "5px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
        variants={itemFadeIn}
      >
        <CostBreakdown
          budget={budget}
          costItems={costItems}
          color={color}
          type={type}
        />
        {costItems.posted.length === 0 && costItems.committed.length === 0 ? (
          <EmptyBreakdown />
        ) : (
          <>
            <div
              style={{
                display: "flex",
                flex: 1,
                minHeight: 0,
                gap: "0px",
                paddingTop: "0px",
              }}
            >
              <BreakdownBar costItems={costItems} type={type} />
            </div>
            <RecentItems items={recentItems} />
          </>
        )}
      </motion.div>
    </div>
  );
}

export default Breakdown;
