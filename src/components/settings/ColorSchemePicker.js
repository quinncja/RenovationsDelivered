import { motion } from "framer-motion";
import { colorPalettes } from "utils/colors";

export function colorPallete(colorPalette) {
  return (
    <div className="color-palette">
      {colorPalette.map((color) => (
        <span
          key={color}
          style={{
            background: color,
            width: "10px",
            height: "10px",
            display: "inline-block",
            margin: "2px",
          }}
        ></span>
      ))}
    </div>
  );
}

function ColorSchemePicker({ handleClick, colorScheme }) {
  const options = Object.keys(colorPalettes);

  return (
    <motion.div
      className="color-scheme-picker"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.2 }}
    >
      {options.map((option) => (
        <button
          className={`setting-button color-scheme ${colorScheme === option && "active-color-button"}`}
          key={option}
          onClick={(e) => {
            e.stopPropagation();
            handleClick(option);
          }}
        >
          {option}
          {colorPallete(colorPalettes[option])}
        </button>
      ))}
    </motion.div>
  );
}

export default ColorSchemePicker;
