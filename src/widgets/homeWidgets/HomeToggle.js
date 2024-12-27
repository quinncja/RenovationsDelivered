import { calendarSvg, personSvg } from "business/svg";
import { useHome } from "context/HomeContext";

function HomeToggle() {
  const { homeState, setHomeState } = useHome();

  const toggleOptions = [
    {
      id: "year",
      svg: calendarSvg,
      title: "Admin View",
      alt: "Admin View",
    },
    {
      id: "user",
      svg: personSvg,
      title: "PM View",
      alt: "PM View",
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
              {homeState !== option.id ? (
                option.alt
              ) : (
                <h2 style={{ margin: 0 }}> {option.title} </h2>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default HomeToggle;
