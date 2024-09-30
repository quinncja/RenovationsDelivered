import React, { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { dollarFormatter, phaseToMonth } from "utils/formatters";
import { itemFadeIn } from "utils/animations";

function LineTable({ data, activeColumn }) {
  const [hasOverflow, setHasOverflow] = useState(true);
  const tableRef = useRef(null);
  const headerRefs = useRef({});
  const colHeaders = data[0].data.map((item) => item.x);

  useEffect(() => {
    if (!data) return;

    const table = tableRef.current;

    const checkOverflow = () => {
      if (table) {
        setHasOverflow(
          table.scrollWidth - table.scrollLeft > table.clientWidth,
        );
      }
    };

    checkOverflow();

    const handleScroll = () => {
      checkOverflow();
    };

    table.addEventListener("scroll", handleScroll);

    return () => {
      if (table) {
        table.removeEventListener("scroll", handleScroll);
      }
      window.removeEventListener("resize", checkOverflow);
    };
  }, [data]);

  useEffect(() => {
    if (activeColumn !== null && headerRefs.current[activeColumn]) {
      headerRefs.current[activeColumn].scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "center",
      });
    }
  }, [activeColumn]);

  return (
    <AnimatePresence>
      {data ? (
        <motion.div
          variants={itemFadeIn}
          className={`table-wrapper ${hasOverflow && "with-shadow"}`}
        >
          <div ref={tableRef} className="line-table">
            <table>
              <thead>
                <tr>
                  <th></th>
                  {colHeaders.map((colHeader) => (
                    <th
                      key={colHeader}
                      ref={(el) => (headerRefs.current[colHeader] = el)}
                      className={
                        colHeader === activeColumn ? "active-column" : ""
                      }
                    >
                      {phaseToMonth(colHeader)}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {data.map((dataset) => (
                  <tr key={dataset.id}>
                    <td>{dataset.id}</td>
                    {dataset.data.map((item) => (
                      <td
                        key={item.x}
                        className={`${item.x === activeColumn ? "active-column" : ""}
                      ${item.p && (item.y > 0 ? "positive-val" : "negative-val")}
                      `}
                      >
                        {item.f ? `${item.y}%` : dollarFormatter(item.y)}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      ) : (
        <>
          <br />
          <br />
          <br />
          <br />
          <div className="line-table-loading-widget" />
        </>
      )}
    </AnimatePresence>
  );
}

export default LineTable;
