import { useEffect, useState, useRef } from "react";
import Header from "./Header";
import { toast } from "sonner";
import useIsAdmin from "utils/hooks/useIsAdmin";
import { useTrackedJobs } from "context/TrackedJobContext";
import { useHomeData } from "utils/hooks/useHomeData";
import { useHome } from "context/HomeContext";
import { useProjectContext } from "context/ProjectContext";
import ChangeOrder from "./ChangeOrder";
import { confirmedSvg, rejectedSvg, userReviewSvg } from "business/svg";
import { patchChangeOrder, sendChangeOrderEmail } from "utils/api";
import { confirmCORejection } from "business/swal";
import { parseFile } from "utils/changeOrderUtils";
import { useModalContext } from "context/ModalContext";
import { motion, AnimatePresence } from "framer-motion";
import { destructureJobNumber } from "utils/formatters";
import { useParams, useNavigate } from "react-router-dom";

function ChangeOrders() {
  const id = "change-orders";
  const { view: routeView } = useParams();

  function capitalizeFirstLetter(val) {
    return String(val).charAt(0).toUpperCase() + String(val).slice(1);
  }

  const view = capitalizeFirstLetter(routeView) || "Pending";

  const navigate = useNavigate();
  const [sortOrder, setSortOrder] = useState("none");
  const [groupBy, setGroupBy] = useState("none");

  const { dataMap, updateDataMap } = useHome();
  const { trackedJobs } = useTrackedJobs();
  const { projects, getJobStr } = useProjectContext();
  const { openModalWithData } = useModalContext();
  const isAdmin = useIsAdmin();
  const recnums = isAdmin
    ? ""
    : projects && trackedJobs && trackedJobs.join(",");
  const abortControllerRef = useRef(null);
  const loadData = useHomeData();
  const fileInputRef = useRef(null);
  const [reload, setReload] = useState(false);
  const data = dataMap[`${id}`] || null;

  const [mouseOver, setMouseOver] = useState(false);

  //so hacky i hate it but its 4:08pm on friday
  useEffect(() => {
    updateDataMap(id, null);
    //eslint-disable-next-line
  }, []);

  const buildJobString = (jobnum) => {
    const job = getJobStr(destructureJobNumber(jobnum).jobNum);
    const year = destructureJobNumber(jobnum).year;
    const phase = `P${destructureJobNumber(jobnum).phase}`;
    return `${job} ${phase} ${year}`;
  };
  const sendEmail = async (changeObj) => {
    const jobString = buildJobString(changeObj.jobnum);
    const emailObj = {
      ...changeObj,
      jobString: jobString,
    };
    try {
      await sendChangeOrderEmail(emailObj);
    } catch (error) {
      console.log(error);
      toast.error(`Failed to send email`);
    }
  };
  const patchCO = async (idnum, status) => {
    try {
      await patchChangeOrder(idnum, status);
      updateDataMap(
        `${id}`,
        data.filter((datum) => datum._idnum !== idnum),
      );
      toast.success(
        status === 1
          ? "Change order confirmed"
          : status === 6
            ? "Change order rejected"
            : "Change order reverted to pending",
      );
    } catch (error) {
      console.log(error);
      toast.error(`Failed to change status`);
      throw Error(error);
    }
  };

  const handlePatch = async (obj, status) => {
    let rejectMessage = "";
    let response;
    if (status === 6) {
      response = await confirmCORejection();
      if (!response.isConfirmed) return;
      rejectMessage = response.value;
    }
    try {
      await patchCO(obj._idnum, status);
      await sendEmail({ ...obj, status, rejectMessage });
    } catch (error) {
      console.log(error);
    }
  };

  const uploadCallback = (newCO) => {
    setReload(!reload);
  };

  const handleFileChange = async (event) => {
    let file;
    if (event.type === "drop") {
      file = event.dataTransfer.files[0];
    } else {
      file = event.target.files[0];
    }

    if (file) {
      try {
        const { excelData, rowObjects } = await parseFile(file);
        const modalData = {
          pageModifiers: null,
          excelData,
          changeOrder: rowObjects,
        };
        openModalWithData("changeOrder", {
          modalData,
          callback: uploadCallback,
        });
      } catch (error) {
        console.log(error);
      }
    }
  };

  const changeView = (newView) => {
    if (newView !== view) {
      updateDataMap(id, null);
      navigate(`/change-orders/${newView.toLowerCase()}`);
    }
  };

  const changeSortOrder = () => {
    if (sortOrder === "none") {
      setSortOrder("newest");
    } else if (sortOrder === "newest") {
      setSortOrder("oldest");
    } else {
      setSortOrder("none");
    }
  };

  const changeGroupBy = () => {
    if (groupBy === "none") {
      setGroupBy("project");
    } else if (groupBy === "project") {
      setGroupBy("PM");
    } else {
      setGroupBy("none");
    }
  };

  useEffect(() => {
    const loadChangeOrders = async () => {
      try {
        if (abortControllerRef.current) {
          abortControllerRef.current.abort();
        }
        const controller = new AbortController();
        abortControllerRef.current = controller;
        await loadData(id, { recnums: recnums, view: view }, controller.signal);
      } catch (error) {
        toast.error(`Failed to load ${view} change orders`);
        updateDataMap(id, -10);
      }
    };
    if (projects) loadChangeOrders();
    //eslint-disable-next-line
  }, [projects, view, recnums, reload]);

  const buttons = (datum) => {
    const { _idnum, status } = datum;
    const showButtons = mouseOver === _idnum;

    const variants = {
      hidden: { x: -60, scale: 0.5, opacity: 0 },
      visible: { x: 0, scale: 1, opacity: 1 },
    };

    const renderButton = (keySuffix, title, onClickHandler, svgIcon) => (
      <button
        className="co-button"
        key={`${_idnum}-${keySuffix}`}
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
          duration: 0.3,
        }}
        style={{ transformOrigin: "0% 0%" }}
      >
        {(status === 1 || status === 6) && (
          <>
            {renderButton(
              "pending",
              "Revert CO",
              () => handlePatch(datum, 3),
              userReviewSvg,
            )}
          </>
        )}

        {status === 3 && (
          <>
            {renderButton(
              "confirm",
              "Confirm CO",
              () => handlePatch(datum, 1),
              confirmedSvg,
            )}
            {renderButton(
              "reject",
              "Reject CO",
              () => handlePatch(datum, 6),
              rejectedSvg,
            )}
          </>
        )}
      </motion.div>
    );
  };

  const handleButtonClick = (event) => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 20 },
  };

  const processData = (data) => {
    let processedData = [...data];

    if (sortOrder !== "none") {
      processedData.sort((a, b) => {
        const dateA = new Date(a.insdte);
        const dateB = new Date(b.insdte);
        if (sortOrder === "newest") {
          return dateB - dateA;
        } else {
          return dateA - dateB;
        }
      });
    }

    if (groupBy !== "none") {
      let groupedData = {};
      if (groupBy === "project") {
        processedData.forEach((item) => {
          const project =
            destructureJobNumber(item.jobnum).jobNum || "Unknown Project";
          if (!groupedData[project]) groupedData[project] = [];
          groupedData[project].push(item);
        });
      } else if (groupBy === "PM") {
        processedData.forEach((item) => {
          const pm = item.user || "Unknown PM";
          if (!groupedData[pm]) groupedData[pm] = [];
          groupedData[pm].push(item);
        });
      }

      let finalData = [];
      for (let groupKey in groupedData) {
        finalData.push({ groupHeader: groupKey });
        finalData.push(...groupedData[groupKey]);
      }
      return finalData;
    } else {
      return processedData;
    }
  };

  const body = (data) => {
    if (data === -10) return;
    if (!data)
      return (
        <div
          style={{
            display: "flex",
            width: "100%",
            height: "50vh",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <span className={`home-widget-num ${"home-widget-loading"}`}></span>
        </div>
      );
    if (data.length === 0) {
      return (
        <p
          style={{
            display: "flex",
            width: "100%",
            height: "10vh",
            alignItems: "center",
            fontWeight: 600,
            paddingLeft: "3px",
          }}
        >
          No {view} Change Orders
        </p>
      );
    }
    const processedData = processData(data);
    return (
      <motion.div className="change-orders" layout="position">
        <AnimatePresence>
          {processedData.map((datum, index) =>
            datum.groupHeader ? (
              <motion.div key={"group-" + index} className="group-header">
                {groupBy === "project"
                  ? getJobStr(datum.groupHeader)
                  : datum.groupHeader}
              </motion.div>
            ) : (
              <motion.div
                key={datum._idnum}
                layout
                variants={itemVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                style={{ display: "flex", gap: "10px", zIndex: "1" }}
                onMouseEnter={() => setMouseOver(datum._idnum)}
              >
                <ChangeOrder changeOrder={datum} />
                {isAdmin && buttons(datum)}
              </motion.div>
            ),
          )}
        </AnimatePresence>
      </motion.div>
    );
  };

  return (
    <div className="dashboard-welcome user-page">
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "baseline",
          gap: ".5rem",
        }}
      >
        {" "}
        <h1> Change Orders </h1>{" "}
        <button
          className="job-button add-new-button"
          onClick={(event) => handleButtonClick(event)}
        >
          {" "}
          + add new{" "}
        </button>{" "}
      </div>
      <Header
        view={view}
        changeView={changeView}
        sortOrder={sortOrder}
        changeSortOrder={changeSortOrder}
        groupBy={groupBy}
        changeGroupBy={changeGroupBy}
      />
      {body(data)}
      <input
        id="co-upload"
        type="file"
        accept=".xls,.xlsx"
        onChange={handleFileChange}
        ref={fileInputRef}
        style={{ display: "none" }}
      />
    </div>
  );
}

export default ChangeOrders;
