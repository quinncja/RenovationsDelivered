import { useParams } from "react-router-dom";
import { reportList } from "./reportList";
import { useEffect, useState } from "react";
import { getReport, patchReportItem, patchRunItem } from "utils/api";
import { toast } from "sonner";
import { costTypeFormatter, destructureJobNumber } from "utils/formatters";
import Header from "./Header";
import Cost from "./Cost";
import { useProjectContext } from "context/ProjectContext";
import { motion } from "framer-motion";
import { confirmedSvg, userReviewSvg } from "business/svg";
import Discrepancy from "./Discrepancy";
import Invoice from "./Invoice";

function OpenReport() {
  const { getJobStr } = useProjectContext();
  const { param, id } = useParams();
  const reportType = reportList.find((report) => report.type === param);
  const { text, type } = reportType;
  const [report, setReport] = useState();
  const { run, items } = report || {};
  const [updatingState, setUpdating] = useState();
  const ranOn = run ? run.ran_on : false;
  const ranBy = run ? run.ran_by : false;

  const svg = run
    ? run.is_completed
      ? confirmedSvg()
      : userReviewSvg()
    : null;
  const title = run
    ? run.is_completed
      ? "Mark in progress"
      : "Mark completed"
    : "";
  const btnText = run ? (run.is_completed ? "Completed" : "In progress") : "";

  useEffect(() => {
    const fetchReport = async () => {
      try {
        const response = await getReport(type, id);
        console.log(response.data);
        setReport(response.data);
      } catch (error) {
        toast.error(`Failed to load ${type} report`);
      }
    };

    fetchReport();
    //eslint-disable-next-line
  }, []);

  const [sortOrder, setSortOrder] = useState("none");
  const [groupBy, setGroupBy] = useState("none");
  const [view, setView] = useState("Needs review");
  const [typeFilter, setTypeFilter] = useState("none");
  const [invoiceFilter, setInvoiceFilter] = useState("none");
  const [mouseOver, setMouseOver] = useState(false);

  const changeSortOrder = () => {
    if (sortOrder === "none") {
      setSortOrder("newest");
    } else if (sortOrder === "newest") {
      setSortOrder("oldest");
    } else {
      setSortOrder("none");
    }
  };

  useEffect(() => {
    console.log(view, typeFilter);
  });

  const changeGroupBy = () => {
    if (groupBy === "none") {
      setGroupBy("project");
    } else if (groupBy === "project" && type === "cogs") {
      setGroupBy("type");
    } else if (groupBy === "type" && type === "cogs") {
      setGroupBy("accounts payable");
    } else {
      setGroupBy("none");
    }
  };

  const changeView = () => {
    if (view === "Needs review") {
      setView("Confirmed");
    } else {
      setView("Needs review");
    }
  };

  const changeTypeFilter = () => {
    if (typeFilter === "none") {
      setTypeFilter("Wrong Fields");
    } else if (typeFilter === "Wrong Fields") {
      setTypeFilter("Missing Fields");
    } else if (typeFilter === "Missing Fields") {
      setTypeFilter("Open POs");
    } else if (typeFilter === "Open POs") {
      setTypeFilter("none");
    }
  };

  const changeInvoiceFilter = () => {
    if (invoiceFilter === "none") {
      setInvoiceFilter("Over Invoiced");
    } else if (invoiceFilter === "Over Invoiced") {
      setInvoiceFilter("Under Invoiced");
    } else if (invoiceFilter === "Under Invoiced") {
      setInvoiceFilter("none");
    }
  };

  const filterCostsByType = (items) => {
    if (!items) return [];
    if (typeFilter === "Wrong Fields") {
      return items.filter((item) => item.wrong.length > 0);
    } else if (typeFilter === "Missing Fields") {
      return items.filter((item) => item.missing.length > 0);
    } else if (typeFilter === "Open POs") {
      return items.filter((item) => item.open.length > 0);
    } else return items;
  };

  const filterCostsByInvoice = (items) => {
    if (!items) return [];
    if (invoiceFilter === "Under Invoiced") {
      return items.filter(
        (item) => Number(item.invoiced) < Number(item.contracted),
      );
    } else if (invoiceFilter === "Over Invoiced") {
      return items.filter(
        (item) => Number(item.invoiced) > Number(item.contracted),
      );
    } else return items;
  };

  const filterCostsByView = (items) => {
    if (!items) return [];
    if (view === "Confirmed") {
      return items.filter((item) => item.confirmed === true);
    } else {
      return items.filter((item) => item.confirmed === false);
    }
  };

  const sortCosts = (items) => {
    if (sortOrder === "none") return items;
    return [...items].sort((a, b) => {
      const getDate = (c) =>
        c.update_date ? new Date(c.update_date) : new Date(c.insert_date);
      const dateA = getDate(a);
      const dateB = getDate(b);

      if (sortOrder === "newest") {
        return dateB - dateA;
      } else if (sortOrder === "oldest") {
        return dateA - dateB;
      }
      return 0;
    });
  };

  const groupCosts = (items) => {
    if (groupBy === "none") {
      return { "": items };
    }

    return items.reduce((groups, item) => {
      let key = "";
      if (groupBy === "project") {
        key = destructureJobNumber(item.jobnum).jobNum;
      } else if (groupBy === "type") {
        key = item.type;
      } else if (groupBy === "accounts payable") {
        key = item.vendor;
      }
      if (!groups[key]) {
        groups[key] = [];
      }
      groups[key].push(item);
      return groups;
    }, {});
  };

  const itemVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 20 },
  };

  const handleReportPatch = async () => {
    const state = !run.is_completed;
    setUpdating(true);
    try {
      await patchRunItem(id, state);
      setReport((prevReport) => {
        if (!prevReport) return prevReport;

        return {
          ...prevReport,
          run: {
            ...prevReport.run,
            is_completed: state,
          },
        };
      });
    } catch (error) {
      toast.error("Failed to change report status");
    } finally {
      setUpdating(false);
    }
  };

  const patchItem = async (id, state) => {
    try {
      await patchReportItem(type, id, state);
      setReport((prevReport) => {
        if (!prevReport) return prevReport;

        const updatedCosts = prevReport.items.map((item) =>
          item._id === id ? { ...item, confirmed: state } : item,
        );

        return { ...prevReport, items: updatedCosts };
      });
    } catch (error) {
      toast.error("Failed to change item status");
    }
  };

  const buttons = (id) => {
    const showButtons = mouseOver === id;

    const variants = {
      hidden: { x: -60, scale: 0.5, opacity: 0 },
      visible: { x: 0, scale: 1, opacity: 1 },
    };

    const renderButton = (keySuffix, title, onClickHandler, svgIcon) => (
      <button
        className="co-button"
        key={`${id}-${keySuffix}`}
        title={title}
        onClick={onClickHandler}
      >
        {svgIcon()}
      </button>
    );

    return (
      <motion.div
        className="co-buttons"
        initial="hidden"
        animate={showButtons ? "visible" : "hidden"}
        variants={variants}
        transition={{
          type: "linear",
          stiffness: 200,
          damping: 20,
          duration: 0.2,
        }}
        style={{ transformOrigin: "0% 0%" }}
      >
        {view === "Confirmed"
          ? renderButton(
              "pending",
              "Revert item",
              () => patchItem(id, false),
              userReviewSvg,
            )
          : renderButton(
              "confirm",
              "Confirm item",
              () => patchItem(id, true),
              confirmedSvg,
            )}
      </motion.div>
    );
  };

  const renderBody = () => {
    let filtered = filterCostsByView(items);
    filtered = filterCostsByType(filtered);
    filtered = filterCostsByInvoice(filtered);
    filtered = sortCosts(filtered);

    const grouped = groupCosts(filtered);
    if (filtered.length === 0)
      return (
        <>
          <Header
            ranOn={ranOn}
            ranBy={ranBy}
            view={view}
            changeView={changeView}
            sortOrder={sortOrder}
            invoiceFilter={invoiceFilter}
            changeInvoiceFilter={changeInvoiceFilter}
            typeFilter={typeFilter}
            changeTypeFilter={changeTypeFilter}
            changeSortOrder={changeSortOrder}
            groupBy={groupBy}
            changeGroupBy={changeGroupBy}
            type={type}
          />
          <h3 style={{ color: "var(--less-white)" }}> No items to display </h3>
        </>
      );

    return (
      <>
        <Header
          svg={svg}
          title={title}
          ranOn={ranOn}
          ranBy={ranBy}
          view={view}
          changeView={changeView}
          invoiceFilter={invoiceFilter}
          changeInvoiceFilter={changeInvoiceFilter}
          typeFilter={typeFilter}
          changeTypeFilter={changeTypeFilter}
          sortOrder={sortOrder}
          changeSortOrder={changeSortOrder}
          groupBy={groupBy}
          changeGroupBy={changeGroupBy}
          type={type}
        />
        <>
          {Object.keys(grouped).map((groupKey) => (
            <div key={groupKey} style={{ width: "100%" }}>
              {groupBy !== "none" && (
                <h2 className="group-header">
                  {" "}
                  {groupBy === "project"
                    ? getJobStr(groupKey)
                    : groupBy === "type"
                      ? costTypeFormatter(Number(groupKey))
                      : groupKey}{" "}
                </h2>
              )}
              <div className="cost-items">
                {grouped[groupKey].map((item) => (
                  <motion.div
                    key={item._id}
                    layout
                    variants={itemVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    style={{ display: "flex", gap: "10px", zIndex: "1" }}
                    onMouseEnter={() => setMouseOver(item._id)}
                  >
                    {type === "cogs" ? (
                      <Cost item={item} key={item._id || item.recnum} />
                    ) : type === "data-validation" ? (
                      <Discrepancy item={item} key={item._id} />
                    ) : type === "invoice-validation" ? (
                      <Invoice item={item} key={item._id} />
                    ) : (
                      <></>
                    )}
                    {buttons(item._id)}
                  </motion.div>
                ))}
              </div>
            </div>
          ))}
        </>
      </>
    );
  };

  return (
    <div className="dashboard-welcome user-page report-page">
      <div className="report-open-row">
        <h1> {text} Report </h1>
        <div
          className={`run-svg run-svg-button ${updatingState ? "loading-widget" : ""}`}
          title={title}
          onClick={handleReportPatch}
        >
          {" "}
          {btnText} {svg}{" "}
        </div>
      </div>
      {items ? renderBody() : ""}
    </div>
  );
}

export default OpenReport;
