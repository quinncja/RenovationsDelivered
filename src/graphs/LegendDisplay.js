import { useDashboardContext } from "context/DashboardContext";
import { useUserContext } from "context/UserContext";
import { dollarFormatter } from "utils/formatters";
import { AnimatePresence, motion } from "framer-motion";
import { itemFadeIn } from "utils/animations";

function LegendDisplay() {
  const { legends } = useDashboardContext();
  const { getColorScheme } = useUserContext();
  const colorPalette = getColorScheme();

  return (
    <AnimatePresence>
      {legends ? (
        <motion.div variants={itemFadeIn} className="legend-box">
          {legends.map((datum, index) => (
            <div className="legend" key={index}>
              <div
                className="tooltip-cube"
                style={{
                  backgroundColor: colorPalette[index % colorPalette.length],
                }}
              />
              <strong>{datum.id}</strong>{" "}
              {datum.value && `- ${dollarFormatter(datum.value)}`}
            </div>
          ))}
        </motion.div>
      ) : (
        <div className="empty-space" />
      )}
    </AnimatePresence>
  );
}
export default LegendDisplay;
