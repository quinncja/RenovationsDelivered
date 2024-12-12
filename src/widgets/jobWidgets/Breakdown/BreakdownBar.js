import React from 'react';
import { Bar } from '@nivo/bar';
import { useUserContext } from 'context/UserContext';
import { hashData } from 'utils/colors';
import { calculateTotalSum } from 'utils/funcs';
import BarTooltip from 'graphs/charts/BarChart/BarToolTip';

function BreakdownBar({ budget, costItems }) {
    const { posted, committed } = costItems;
    const { getColorScheme } = useUserContext();
    const palette = getColorScheme();
    const keys = ["Budget", "Invoiced", "Committed"];

    const postedSum = calculateTotalSum(posted);
    const committedSum = calculateTotalSum(committed);

    const data = [
    { id: "Budget", Budget: budget },
    { id: "Costs", Invoiced: postedSum, Committed: committedSum },
    ];

    const colorMap = {};
    keys.forEach(k => {
        const hashed = hashData({ id: k }, palette, true);
        colorMap[k] = hashed.color;
    });

    const defs = [
        {
            id: 'stripes',
            type: 'patternDots',
            background: 'inherit',
            color: 'rgba(255, 255, 255, 0.25)',
            size: 5,
            padding: 4,
            stagger: true
        }
    ];

    const fill = [
        { match: { id: 'Committed' }, id: 'stripes' }
    ];

    return (
        <> 
        <Bar
          data={data}
          height={475}
          width={190}
          keys={["Budget", "Invoiced", "Committed"]}
          indexBy="id"
          layout="vertical"
          groupMode="stacked"
          margin={{ top: 0, right: 5, bottom: 0, left: 15}}
          padding={0.1}
          colors={bar => bar.id === "Committed" ? colorMap["Invoiced"] : colorMap[bar.id]}
          borderColor={{ from: 'color', modifiers: [['darker', 1.6]] }}
          axisLeft={false}
          innerPadding={2}
          borderRadius={0}
          axisBottom={false}
          axisTop={null}
          axisRight={null}
          enableGridY={false}
          defs={defs}
          fill={fill}
          label={bar => bar.id}
          labelSkipWidth={12}
          labelSkipHeight={12}
          tooltip={(id, color, value ) => BarTooltip(id, color, value)}
          labelTextColor={"#f3f3f3"}
          animate={false}
          theme={{
            labels: {
                text: {
                    fontSize: 14,
                    fontWeight: 500
                },
            },
        }}
        />
        <div className='bar-bottom'/>
        </>
    );
}

export default BreakdownBar;
