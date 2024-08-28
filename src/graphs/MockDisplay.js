import PieChart from "./PieChart/PieChart";
import LineChart from "./LineChart";
import BarChart from "./BarChart";

export default function MockDisplay({ chartType }) {
  const mockPie = () => {
    const mockPieData = [
      {
        id: "0",
        label: "Item 1",
        value: 10,
      },
      {
        id: "1",
        label: "Item 2",
        value: 10,
      },
      {
        id: "2",
        label: "Item 3",
        value: 10,
      },
    ];
    return (
      <div className="dashboard-widget">
        <div className="widget-top" />
        <PieChart data={mockPieData} />
      </div>
    );
  };

  const mockLine = () => {
    const mockLineData = [
      {
        id: "Mock",
        data: [
          {
            x: "1",
            y: "5",
          },
          {
            x: "2",
            y: "10",
          },
          {
            x: "3",
            y: "20",
          },
          {
            x: "4",
            y: "35",
          },
          {
            x: "5",
            y: "22",
          },
          {
            x: "6",
            y: "15",
          },
          {
            x: "7",
            y: "4",
          },
        ],
      },
    ];
    return (
      <div className="dashboard-widget wide-widget">
        <div className="widget-top" />
        <LineChart data={mockLineData} />
      </div>
    );
  };

  const mockBar = () => {
    const mockBarData = [
      {
        id: "1",
        Estimated: 5000,
        Actual: 4000,
      },
      {
        id: "2",
        Estimated: 5000,
        Actual: 4000,
      },
      {
        id: "3",
        Estimated: 5000,
        Actual: 4000,
      },
      {
        id: "4",
        Estimated: 5000,
        Actual: 4000,
      },
    ];

    return (
      <div className="dashboard-widget wide-widget">
        <div className="widget-top" />
        <BarChart data={mockBarData} />
      </div>
    );
  };

  function renderSwitch() {
    switch (chartType) {
      case "Pie":
        return mockPie();

      case "Line":
        return mockLine();

      default:
        return mockBar();
    }
  }

  return renderSwitch();
}
