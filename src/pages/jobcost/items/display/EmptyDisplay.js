import { getFirstWord } from "utils/formatters";

function EmptyDisplay({ text }) {
  const word = getFirstWord(text);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        position: "relative",
        height: "70%",
        width: "30%",
        marginInline: "auto",
      }}
    >
      <strong>No {word} data</strong>
    </div>
  );
}

export default EmptyDisplay;
