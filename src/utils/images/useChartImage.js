import { useEffect } from "react";
import { cacheImage } from "./imageCacheUtils";
import svgToImage from "./svgToImage";
import { useUserContext } from "context/UserContext";

function useChartImage(chartRef, id, dependencies) {
  const { label, appearance, colorScheme } = useUserContext();
  const dependencyList = [...dependencies, label, appearance, colorScheme];
  useEffect(() => {
    if (chartRef.current) {
      const svgElement = chartRef.current.querySelector("svg");
      if (svgElement instanceof SVGElement) {
        setTimeout(() => {
          svgToImage(svgElement).then((imageData) => {
            cacheImage(id, imageData);
          });
        }, 1000);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, dependencyList);
}

export default useChartImage;
