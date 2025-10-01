import { useEffect, useRef } from 'react';

function WidgetSection({
  title,
  color = 'green',
  gap = '10px',
  children,
  className = '',
  style = {}
}){
  const headerRef = useRef(null);
  const sentinelRef = useRef(null);
  
  useEffect(() => {
    const header = headerRef.current;
    const sentinel = sentinelRef.current;
    if (!header || !sentinel) return;

    const observer = new IntersectionObserver(
      ([e]) => header.classList.toggle("is-pinned", e.intersectionRatio < 1),
      { threshold: [1] }
    );

    observer.observe(sentinel);

    return () => observer.disconnect();
  }, []);

  return (
    <div
      className={`left-blur blur-${color} ${className}`}
      style={{
        display: "flex",
        flexDirection: "column",
        gap: gap,
        width: "100%",
        position: 'relative',
        ...style
      }}
    >
      <div
        ref={sentinelRef}
        style={{
          height: '1px',
          position: 'absolute',
          top: '-1px',
          left: 0,
          right: 0,
        }}
      />
      <div
        ref={headerRef}
        className="jobs-header"
        style={{
          background: "none",
          position: 'sticky',
          top: 0,
          zIndex: 10,
        }}
      >
        <h2 style={{paddingLeft: "2px"}}>{title}</h2>
      </div>
      {children}
    </div>
  );
};

export default WidgetSection;