import { useDashboardContext } from "context/DashboardContext";
import { useUserContext } from "context/UserContext";
import { dollarFormatter } from "utils/formatters";
import { AnimatePresence, motion } from "framer-motion";
import { itemFadeIn } from "utils/animations";

function LegendDisplay() {
  const { legends } = useDashboardContext();
  const { colorScheme } = useUserContext();
  const colorPalettes = {
    nivo: ["#e8c1a0", "#f47560", "#f1e15b", "#e8a838", "#61cdbb", "#97e3d5"],
    category10: [
      "#1f77b4",
      "#ff7f0e",
      "#2ca02c",
      "#d62728",
      "#9467bd",
      "#8c564b",
    ],
    accent: ["#7fc97f", "#beaed4", "#fdc086", "#ffff99", "#386cb0", "#f0027f"],
    dark2: ["#1b9e77", "#d95f02", "#7570b3", "#e7298a", "#66a61e", "#e6ab02"],
    paired: ["#a6cee3", "#1f78b4", "#b2df8a", "#33a02c", "#fb9a99", "#e31a1c"],
    pastel1: ["#fbb4ae", "#b3cde3", "#ccebc5", "#decbe4", "#fed9a6", "#ffffcc"],
    pastel2: ["#b3e2cd", "#fdcdac", "#cbd5e8", "#f4cae4", "#e6f5c9", "#fff2ae"],
    set1: ["#e41a1c", "#377eb8", "#4daf4a", "#984ea3", "#ff7f00", "#ffff33"],
    set2: ["#66c2a5", "#fc8d62", "#8da0cb", "#e78ac3", "#a6d854", "#ffd92f"],
    set3: ["#8dd3c7", "#ffffb3", "#bebada", "#fb8072", "#80b1d3", "#fdb462"],
    tableau10: [
      "#4e79a7",
      "#f28e2b",
      "#e15759",
      "#76b7b2",
      "#59a14f",
      "#edc948",
    ],
  };

  
  return (
    <AnimatePresence>
      {legends ? 
      <motion.div variants={itemFadeIn} className="legend-box">
        {legends.map((datum, index) => (
          <div className="legend" key={index}>
            <div
              className="tooltip-cube"
              style={{
                backgroundColor:
                  colorPalettes[colorScheme][
                    index % colorPalettes[colorScheme].length
                  ],
              }}
            />
            <strong>{datum.id}</strong>{" "}
            {datum.value && `- ${dollarFormatter(datum.value)}`}
          </div>
        ))}
      </motion.div> : 
      <div className="empty-space"/>}
    </AnimatePresence>
  );
}
export default LegendDisplay;
