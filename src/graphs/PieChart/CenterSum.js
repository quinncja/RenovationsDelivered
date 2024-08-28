import React from 'react';
import { dollarFormatter } from "utils/formatters";
import { useCSSVariable } from "utils/hooks/useCSSVariable";

export const CenterSum = ({ centerX, centerY, sum }) => {
    sum = dollarFormatter(sum);
    let fontColor = useCSSVariable("--less-white");

    return (
        <svg>
            <text
                x={centerX}
                y={centerY - 10}
                textAnchor="middle"
                dominantBaseline="central"
                style={{
                    fontSize: '14px',
                    fontWeight: '600',
                    letterSpacing: '-1px',
                    fill: fontColor,
                }}
            >
                Total
            </text>
            <text
                x={centerX}
                y={centerY + 10} 
                textAnchor="middle"
                dominantBaseline="central"
                style={{
                    fontSize: `16px`, 
                    fontWeight: '800',
                    fill: fontColor,
                    letterSpacing: '-1px',
                }}
            >
                {sum}
            </text>
        </svg>
    );
};
