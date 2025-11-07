import { fetchFileFromSMB } from "@features/jobcost/api/jobcostApi";
import { fileSvg, leftArrowSvg, rightArrowSvg } from "@assets/icons/svgs";
import { useEffect, useState, useRef } from "react";
import { formatSageUsername } from "@shared/utils/functions";

function AttachmentViewer(props) {
  const { closeSelf, data } = props;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [imageUrls, setImageUrls] = useState([]);
  const [loadedIndices, setLoadedIndices] = useState(new Set());
  const abortControllerRef = useRef(null);

  const parseAttachments = () => {
    if (!data) return [];
    const paths = data.path ? data.path.split(",") : [];
    const names = data.name ? data.name.split(",") : [];
    const users = data.user ? data.user.split(",") : [];
    return paths.map((path, index) => ({
      path: path,
      name: names[index] || "",
      user: users[index] || "",
    }));
  };

  const attachments = parseAttachments();

  const loadImage = async (index) => {
    if (loadedIndices.has(index)) {
      setLoading(false);
      return;
    }

    setLoading(true);
    try {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
      const controller = new AbortController();
      abortControllerRef.current = controller;

      const path = attachments[index].path;
      const imageUrl = await fetchFileFromSMB(path, controller.signal);

      setImageUrls((prevUrls) => {
        const newUrls = [...prevUrls];
        newUrls[index] = imageUrl;
        return newUrls;
      });

      setLoadedIndices((prev) => new Set([...prev, index]));
      setLoading(false);
    } catch (error) {
      if (error.name === "AbortError") {
        console.log("Fetch request aborted");
      } else {
        console.error("Error fetching file:", error);
      }
      setLoading(false);
    }
  };

  useEffect(() => {
    loadImage(currentIndex);
  }, [currentIndex]);
  const prevImage = () => {
    if (attachments.length <= 1) return;
    const newIndex =
      currentIndex === 0 ? attachments.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const nextImage = () => {
    if (attachments.length <= 1) return;
    const newIndex = (currentIndex + 1) % attachments.length;
    setCurrentIndex(newIndex);
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "ArrowLeft") {
        prevImage();
      } else if (event.key === "ArrowRight") {
        nextImage();
      } else if (event.key === "Escape") {
        closeSelf();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [currentIndex, attachments.length]);

  if (attachments.length === 0) {
    return null;
  }

  return (
    <div className="popup-wrapper">
      <div
        className="new-widget-popup"
        style={{
          background: "#161b2218",
          borderRadius: "5px",
          backdropFilter: "blur(10px)",
          WebkitBackdropFilter: "blur(10px)",
          padding: "0px",
          width: "70%",
          alignSelf: "flex-start",
          marginTop: "20px",
          overflow: "scroll",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            width: "100%",
            height: "100%",
          }}
        >
          <div
            style={{
              display: "flex",
              width: "100%",
              boxSizing: "border-box",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              backgroundColor: "var(--dark)",
              padding: "10px",
              paddingInline: "20px",
              paddingBottom: "10px",
              borderRadius: "5px 5px 0px 0px",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "flex-start",
                flexDirection: "row",
                alignItems: "center",
                gap: "18px",
              }}
            >
              <div className="bigger-svg">{fileSvg()}</div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-start",
                  flexDirection: "column",
                  alignItems: "flex-start",
                  gap: "0px",
                }}
              >
                <h3>{attachments[currentIndex].name}</h3>
                <h4>{formatSageUsername(attachments[currentIndex].user)}</h4>
              </div>
            </div>
            <h3 className="attachment-counter">
              {currentIndex + 1} of {attachments.length}
            </h3>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              width: "100%",
              minHeight: "calc(100vh - 150px)",
              position: "relative",
              alignSelf: "center",
            }}
          >
            {attachments.length > 1 && (
              <button className="attachment-button" onClick={prevImage}>
                {leftArrowSvg()}
              </button>
            )}
            {loading && !imageUrls[currentIndex] ? (
              <div
                style={{
                  width: "100%",
                  padding: "20px",
                  minHeight: "calc(100vh - 150px)",
                }}
                className="loading-widget"
              />
            ) : (
              <div
                style={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  padding: "20px",
                  minHeight: "calc(100vh - 150px)",
                }}
              >
                {renderFile(
                  attachments[currentIndex].path,
                  imageUrls[currentIndex],
                )}
              </div>
            )}
            {attachments.length > 1 && (
              <button className="attachment-button" onClick={nextImage}>
                {rightArrowSvg()}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function renderFile(filePath, fileUrl) {
  if (!fileUrl) return null;

  const isImage = /\.(jpg|jpeg|png|gif)$/i.test(filePath);
  const isPDF = /\.pdf$/i.test(filePath);

  if (isImage) {
    return (
      <img
        src={fileUrl}
        alt="Attachment"
        style={{
          maxWidth: "100%",
          maxHeight: "80vh",
          objectFit: "contain",
        }}
      />
    );
  } else if (isPDF) {
    return (
      <object
        data={fileUrl}
        type="application/pdf"
        width="100%"
        height="100%"
        position="relative"
        style={{ minHeight: "calc(100vh - 150px)" }}
      >
        <p>
          It appears your browser doesn't support embedded PDFs.
          <a href={fileUrl} target="_blank" rel="noopener noreferrer">
            Click here to download the PDF
          </a>
          .
        </p>
      </object>
    );
  } else {
    return (
      <div style={{ textAlign: "center" }}>
        <p>This file type cannot be previewed directly.</p>
        <a
          href={fileUrl}
          download={filePath.split("\\").pop()}
          className="btn"
          style={{
            padding: "10px 15px",
            backgroundColor: "var(--primary)",
            color: "white",
            borderRadius: "5px",
            textDecoration: "none",
            display: "inline-block",
            marginTop: "10px",
          }}
        >
          Download File
        </a>
      </div>
    );
  }
}

export default AttachmentViewer;
