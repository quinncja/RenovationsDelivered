import { useJobcostContext } from "@features/jobcost/context/JobcostContext";
import TableHeader from "./TableHeader";
import { useEffect, useRef } from "react";
import Table from "./Table";

function TableWrapper(props) {
  const { setIsVisible, type } = props;
  const headerRef = useRef(null);
  const { getBreakdownItems } = useJobcostContext();
  const data = getBreakdownItems();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      {
        threshold: 0,
        rootMargin: "-70px 0px 100% 0px",
      },
    );

    if (headerRef.current) {
      observer.observe(headerRef.current);
    }

    return () => {
      if (headerRef.current) {
        //eslint-disable-next-line
        observer.unobserve(headerRef.current);
      }
    };
    //eslint-disable-next-line
  }, []);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "10px",
        width: "100%",
        paddingTop: "40px",
        paddingBottom: "150px",
      }}
    >
      <div style={{ display: "flex", flexDirection: "column", gap: "0px" }}>
        <div className="jobs-header jobs-header-old no-sticky" ref={headerRef}>
          <h2> Cost Items </h2>
        </div>
        <TableHeader data={data} type={type} />
        <Table data={data} color={null} type={type} />
      </div>
    </div>
  );
}

export default TableWrapper;
