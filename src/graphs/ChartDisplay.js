import PieChart from "./PieChart/PieChart";
import LineChart from "./LineChart/LineChart";
import BarChart from "./BarChart/BarChart";
import { useUserContext } from "context/UserContext";
import { useEffect, useRef, memo } from "react";
import { useDashboardContext } from "context/DashboardContext";
import svgToImage from "utils/images/svgToImage";
import {
  preloadImage,
  cacheImage,
  getCachedImage,
} from "utils/images/imageCacheUtils";

const ChartDisplay = memo(
  ({ chartObj, data, open, id, handleClick, key, replaceImage }) => {
    const { colorScheme, appearance, getColorScheme, label } = useUserContext();
    const { active } = useDashboardContext();
    const wrapperRef = useRef(null);
    const snapshotImage = useRef(getCachedImage(id));
    const showImage = active || replaceImage;

    let showLabels;
    if (label === "always") showLabels = true;
    if (label === "open") showLabels = open;
    if (label === "never") showLabels = false;

    let pieContainer = open
      ? { width: "420", height: "450" }
      : { width: "320px", height: "360px" };

    let pieSize = open
      ? { width: 700, height: 500 }
      : { width: 320, height: 320 };

    let wideContainer = open
      ? { width: "1100px", height: "450px" }
      : { width: "660px", height: "320px" };

    let wideSize = open
      ? { width: 950, height: 400 }
      : { width: 640, height: 320 };

    useEffect(() => {
      const interval = setInterval(
        () => {
          const image = getCachedImage(id);
          preloadImage(image).then((preloadedImage) => {
            snapshotImage.current = preloadedImage;
          });
        },
        2 * 60 * 1000,
      );

      return () => clearInterval(interval);
    }, [id]);

    useEffect(() => {
      if (data && wrapperRef.current && !open) {
        const svgElement = wrapperRef.current.querySelector("svg");
        if (svgElement instanceof SVGElement) {
          setTimeout(() => {
            svgToImage(svgElement).then((imageData) => {
              preloadImage(imageData).then((preloadedImage) => {
                cacheImage(id, preloadedImage);
                snapshotImage.current = preloadedImage;
              });
            });
          }, 1000);
        }
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [colorScheme, appearance, label]);

    useEffect(() => {
      const reloadImage = () => {
        const image = getCachedImage(id);
        preloadImage(image).then((preloadedImage) => {
          snapshotImage.current = preloadedImage;
        });
      };

      const handleVisibilityChange = () => {
        if (document.visibilityState === "visible") {
          reloadImage();
        }
      };

      const handleFocus = () => {
        reloadImage();
      };

      document.addEventListener("visibilitychange", handleVisibilityChange);
      window.addEventListener("focus", handleFocus);
      return () => {
        document.removeEventListener(
          "visibilitychange",
          handleVisibilityChange,
        );
        window.removeEventListener("focus", handleFocus);
      };
    }, [id]);

    const colorPallete = getColorScheme();

    switch (chartObj.chartType) {
      case "Pie":
        return (
          <div ref={wrapperRef} style={pieContainer}>
            {showImage ? (
              <img
                src={snapshotImage.current}
                draggable="false"
                alt=""
                key={key}
                style={{
                  userSelect: "none",
                  position: "relative",
                  width: "100%",
                  height: "89%",
                }}
              />
            ) : (
              <PieChart
                data={data}
                open={open}
                showLabel={showLabels}
                chartObj={chartObj}
                colorScheme={colorPallete}
                size={pieSize}
              />
            )}
          </div>
        );

      case "Line":
        return (
          <div ref={wrapperRef} style={wideContainer}>
            {showImage ? (
              <img
                src={snapshotImage.current}
                alt=""
                draggable="false"
                style={{
                  userSelect: "none",
                  position: "relative",
                  width: "97%",
                  height: "100%",
                }}
              />
            ) : (
              <LineChart
                data={data}
                open={open}
                handleClick={handleClick}
                showLabel={showLabels}
                chartObj={chartObj}
                colorScheme={colorPallete}
                size={wideSize}
              />
            )}
          </div>
        );

      case "Bar":
        return (
          <div ref={wrapperRef} style={wideContainer}>
            <BarChart
              data={data}
              open={open}
              showLabel={showLabels}
              colorScheme={colorPallete}
              size={wideSize}
            />
          </div>
        );

      default:
        return chartObj.display(data, chartObj);
    }
  },
);

export default ChartDisplay;
