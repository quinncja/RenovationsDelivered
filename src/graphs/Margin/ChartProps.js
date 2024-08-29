import AreaLayer from "./AreaLayer";
import LineLayer from "./LineLayer";
import ZeroLineLayer from "./ZeroLineLayer";
import { linearGradientDef } from "@nivo/core";
import { SingleMargin } from "./SingleMargin";

export const marginChartProps = {
  layers: [
    "grid",
    "axes",
    ZeroLineLayer,
    AreaLayer,
    LineLayer,
    "crosshair",
    "slices",
  ],
  defs: [
    linearGradientDef("positiveGradient", [
      { offset: 0, color: "#5bce53", opacity: 0.4 },
      { offset: 100, color: "#5bce53", opacity: 0 },
    ]),
    linearGradientDef("negativeGradient", [
      { offset: 0, color: "#FF4062", opacity: 0 },
      { offset: 100, color: "#FF4062", opacity: 0.4 },
    ]),
  ],
  axisLeft: {
    format: (v) => `${v}%`,
    tickValues: 5,
  },
  chartFormat: (data) => {return [{id: "Margin", data: [...data.current]}]},
  enableArea: true,
  singleItem: (singleItemData, open, showLabel) => (
    <SingleMargin data={singleItemData} open={open} showLabel={showLabel} />
  ),
};
