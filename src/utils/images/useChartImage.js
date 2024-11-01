import { useEffect } from "react";
import svgToImage from "./svgToImage";
import { useUserContext } from "context/UserContext";
import { setImage, getImage } from "./imageStore";
import isEqual from 'lodash/isEqual';
import { useModifiers } from "context/ModifierContext";

function useChartImage(chartRef, id) {
  const { pageModifiers } = useModifiers();
  const { jobNum, yearId, phaseId, state, pm, active } = pageModifiers;
  const { label, appearance, colorScheme } = useUserContext();
  const dependencyList = [id, label, appearance, colorScheme, jobNum, yearId, phaseId, state, pm, active];
  
  useEffect(() => {
    const previousData = getImage(id);
    const previousDependencies = previousData ? previousData.dependencies : null;

    const dependenciesChanged = !isEqual(previousDependencies, dependencyList);

    if (dependenciesChanged && chartRef.current) {
      const svgElement = chartRef.current.querySelector("svg");
      if (svgElement instanceof SVGElement) {
        setTimeout(() => {
          svgToImage(svgElement).then((imageData) => {
            setImage(id, imageData, dependencyList);
          });
        }, 1000);
      }
    }
    //eslint-disable-next-line
  }, [id, label, appearance, colorScheme, jobNum, yearId, phaseId, state, pm, active]);
}

export default useChartImage;
