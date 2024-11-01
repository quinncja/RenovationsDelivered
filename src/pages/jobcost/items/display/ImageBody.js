import useImage from "utils/images/useImage";

function ImageBody({ id, container, dragging, size }) {
  const imageSrc = useImage(id);

  return (
    <div className={`${!dragging ? "invisible-container" : ""}`} style={container}>
      <img
        src={imageSrc}
        alt=""
        draggable="false"
        className={`image-body ${dragging ? "visible-image" : "invisible-image"}`}
        style={{
          userSelect: "none",
          position: "relative",
          ...size,
        }}
      />
    </div>
  );
}

export default ImageBody;
