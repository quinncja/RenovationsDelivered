import { revChartProps } from "graphs/types/Revenue/ChartProps"
import { marginChartProps } from "graphs/types/Margin/ChartProps"

export const getChartProps = (query, type) => {

    if(query === "revenue") return revChartProps;
    if(query === "margin") return marginChartProps;
    else return {};

}