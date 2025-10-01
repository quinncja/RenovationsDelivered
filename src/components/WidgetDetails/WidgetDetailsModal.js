import { toast } from "sonner";
import { fetchWidgetDetails } from "utils/api";
import { useEffect, useState, useRef } from "react";
import { dollarFormatter, formatNumberShort } from "utils/formatters";
import { getMarginBackground } from "utils/funcs";

function WidgetDetailsModal({ type }) {
  const [widgetData, setWidgetData] = useState(undefined);
  const abortControllerRef = useRef(null);

  useEffect(() => {
    const loadWidgetDetails = async () => {
      const maxRetries = 5;
      let retryCount = 0;

      const attemptLoad = async () => {
        try {
          if (abortControllerRef.current) {
            abortControllerRef.current.abort();
          }
          const controller = new AbortController();
          abortControllerRef.current = controller;
          const widgetData = await fetchWidgetDetails(type, controller.signal);
          setWidgetData(widgetData);
        } catch (error) {
          if (error.name === "AbortError") {
            throw error;
          }
          retryCount++;
          if (retryCount <= maxRetries) {
            console.log(
              `Retrying test details fetch (attempt ${retryCount}/${maxRetries})`,
            );
            await attemptLoad();
          } else {
            throw error;
          }
        }
      };

      try {
        await attemptLoad();
      } catch (error) {
        if (error.name !== "AbortError") {
          console.log(error);
          toast.error(`Failed to load ${type} test`);
        }
      }
    };

    if (!widgetData) loadWidgetDetails();
  }, [type]);

  if (!widgetData)
    return (
      <div className="popup-wrapper">
        <div className="new-widget-popup">
          <div className="loading-widget"> </div>
        </div>
      </div>
    );

  const { testTitle, testDescription, queryInformation, result, testResults } =
    widgetData;

  const renderTestResultIcon = (success) => {
    const obj = {
      color: success ? "var(--green)" : "var(--red)",
      icon: success ? "✓" : "x",
    };
    return (
      <div
        style={{
          width: "13px",
          height: "13px",
          backgroundColor: obj.color,
          color: "white",
          fontSize: "9px",
          borderRadius: "50%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          fontWeight: "600",
        }}
      >
        {obj.icon}
      </div>
    );
  };
  const renderLOCTests = (tests) => {
    return tests.map((test, index) => {
      return (
        <div
          className="loc-test"
          key={index}
          style={{
            paddingBlock: "25px",
            display: "grid",
            gridTemplate: "1fr / .5fr .7fr .5fr",
          }}
        >
          <h5
            style={{ fontWeight: "600", fontSize: "12px", marginBlock: "auto" }}
          >
            {test.period}
          </h5>
          <div
            style={{ display: "flex", flexDirection: "column", gap: "15px" }}
          >
            <div
              style={{ display: "flex", flexDirection: "column", gap: "5px" }}
            >
              <h5> EXPECTED</h5>
              <h3 style={{ fontSize: "16px" }}>
                {dollarFormatter(test.expectedValue)}
              </h3>
            </div>
            <div
              style={{ display: "flex", flexDirection: "column", gap: "5px" }}
            >
              <h5> CALCULATED</h5>
              <h3 style={{ fontSize: "16px" }}>
                {dollarFormatter(test.calculatedValue)}
              </h3>
            </div>
          </div>
          <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
            {renderTestResultIcon(test.success)}
            <h4
              style={{
                marginBlock: "auto",
                fontWeight: "600",
                color: test.success ? "var(--green)" : "var(--red)",
              }}
            >
              {" "}
              {test.success ? "Match" : "Mismatch"}{" "}
            </h4>
          </div>
        </div>
      );
    });
  };

  const renderTests = (type, tests) => {
    switch (type) {
      case "loc":
        return renderLOCTests(tests);
      default:
        return "";
    }
  };

  const testResultBackground = getMarginBackground(result ? 100 : 0);
  return (
    <div className="popup-wrapper">
      <div className="new-widget-popup" onClick={(e) => e.stopPropagation()}>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              textAlign: "left",
              width: "70%",
              gap: "10px",
            }}
          >
            <h2> {testTitle} </h2>
            <h4> {testDescription} </h4>
          </div>

          <div
            className={`widget ${testResultBackground}`}
            style={{
              display: "flex",
              flexDirection: "row",
              boxSizing: "border-box",
              justifyContent: "center",
              alignItems: "center",
              height: "40px",
              width: "14ch",
              gap: "10px",
              border: "0px",
            }}
          >
            <div
              style={{
                height: "7px",
                width: "7px",
                borderRadius: "50%",
                background: result ? "var(--green)" : "var(--red)",
              }}
            >
              {" "}
            </div>
            <h3 style={{ color: result ? "var(--green)" : "var(--red)" }}>
              {" "}
              {result ? "Success" : "Failed"}{" "}
            </h3>
          </div>
        </div>
        <div
          style={{
            position: "relative",
            textAlign: "left",
            flex: 1,
            minHeight: 0,
            display: "flex",
            flexDirection: "column",
            width: "calc(100% + 10px)",
          }}
        >
          <h3
            style={{
              textAlign: "left",
              position: "sticky",
              top: "0px",
              paddingBottom: "10px",
            }}
          >
            Test Results
          </h3>

          <div
            style={{
              background: "var(--popover-dark)",
              border: "1px solid var(--fancy-border)",
              padding: "15px",
              borderRadius: "10px",
              position: "absolute",
              top: "0px",
              right: "10px",
              width: "40%",
              textAlign: "left",
              display: "flex",
              flexDirection: "column",
              gap: "15px",
            }}
          >
            <h3>Query Details</h3>
            <h4 style={{ lineHeight: "1.5em", whiteSpace: "pre-wrap" }}>
              {queryInformation}
            </h4>
          </div>

          <div
            style={{
              overflow: "auto",
              flex: 1,
              minHeight: 0,
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "10px",
                width: "53%",
              }}
            >
              {renderTests(type, testResults)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default WidgetDetailsModal;
