import { useUserContext } from "context/UserContext";
import { getChartProps } from "graphs/getters/getChartProps";
import { getToolTip } from "graphs/getters/getToolTip";

export const useChartProps = (query, type) => {
    const { getColorScheme } = useUserContext();

    const pallete = getColorScheme();
    const tooltip = getToolTip(query, type);
    const chartProps = getChartProps(query, type);
    
    return { chartProps, tooltip, pallete};
};