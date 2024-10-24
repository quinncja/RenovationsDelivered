import useImage from "utils/images/useImage";

function ImageBody({ id, container, size }) {
  const imageSrc = useImage(id);

  return (
    <div style={container}>
      <img
        src={imageSrc}
        alt=""
        draggable="false"
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
