import { useEffect, useRef } from "react";

function WidgetSection({
  title,
  color = "green",
  gap = "10px",
  noPin = false,
  children,
  className = "",
  style = {},
}) {
  const headerRef = useRef(null);
  const sentinelRef = useRef(null);

  useEffect(() => {
    if (noPin) return; 
    
    const header = headerRef.current;
    const sentinel = sentinelRef.current;
    if (!header || !sentinel) return;

    const observer = new IntersectionObserver(
      ([e]) => header.classList.toggle("is-pinned", e.intersectionRatio < 1),
      { threshold: [1] },
    );

    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [noPin]);

  return (
    <div
      className={`left-blur blur-${color} ${className}`}
      style={{
        display: "flex",
        flexDirection: "column",
        gap: gap,
        width: "100%",
        position: "relative",
        ...style,
      }}
    >
      {!noPin && (
        <div
          ref={sentinelRef}
          style={{
            height: "1px",
            position: "absolute",
            top: "19px",
            left: 0,
            right: 0,
          }}
        />
      )}
      {title && (
        <div
          ref={headerRef}
          className="jobs-header"
          style={{
            position: noPin ? "relative" : "sticky",
            top: noPin ? "auto" : 0,
            zIndex: noPin ? "auto" : 10,
          }}
        >
          <h2 style={{ paddingLeft: "2px" }}>{title}</h2>
        </div>
      )}
      {children}
    </div>
  );
}

export default WidgetSection;