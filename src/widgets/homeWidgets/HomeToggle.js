import { calendarSvg, personSvg } from "business/svg";
import { useHome } from "context/HomeContext";

function HomeToggle() {
  const { homeState, setHomeState } = useHome();

  const toggleOptions = [
    {
      id: "year",
      svg: calendarSvg,
      title: "View all projects",
    },
    {
      id: "user",
      svg: personSvg,
      title: "View by tracked projects",
    },
  ];

  return (
    <div className="home-toggle-container">
      <div className="home-toggle-wrapper">
        {toggleOptions.map((option) => {
          return (
            <button
              key={option.id}
              className={`home-toggle ${homeState === option.id ? "active-home-button" : ""}`}
              onClick={() => setHomeState(option.id)}
              title={option.title}
            >
              {option.svg()}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default HomeToggle;
