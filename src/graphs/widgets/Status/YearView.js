import { leftArrowSvg, rightArrowSvg } from "business/svg";
import { useModifiers } from "context/ModifierContext";

const YearView = ({ yearData, setItemView }) => {
  const { updatePageModifiers, setModTimeout } = useModifiers();
  const {  
    year,
    phases,
    job,
    jobs,
    prevYear,
    nextYear 
  } = yearData;

  const stepBack = (e) => {
    e.stopPropagation();
    if (!prevYear) return;
    setModTimeout(true);
    updatePageModifiers({
      yearId: prevYear.id,
    });
  };

  const stepForward = (e) => {
    e.stopPropagation();
    if (!nextYear) return;
    setModTimeout(true);
    updatePageModifiers({
      yearId: nextYear.id,
    });
  };

  const handleClick = () => {
  if(jobs.length === 1)
    setItemView({
      display: true,
      items: phases,
      tag: "name",
      job: job.name,
      itemClick: (item) => 
      {
        setModTimeout(true)
        updatePageModifiers({
          phaseId: item.id,
        });
      }
    })
  else 
    setItemView({
      display: true,
      items: jobs,
      tag: "name",
      job: job.name,
      itemClick: (item) => 
      {
        setModTimeout(true)
        updatePageModifiers({
          jobNum: item.num,
        });
      }
    })
  }

  return (
    <div className="job-display job-display-single job-display-all">
      <strong>{job.name}</strong>
      <div className="job-display-content">
      <button
          className={`job-display-arrow ${!prevYear && "arrow-hidden"}`}
          onClick={stepBack}
        >
          {leftArrowSvg()}
        </button>
        <div className="job-display-section all-section btn-section" onClick={() => handleClick()}>
          <h2 style={{fontSize: "50px"}}>{year.year}</h2>
        </div>
        <button
          className={`job-display-arrow ${!nextYear && "arrow-hidden"}`}
          onClick={stepForward}
        >
          {rightArrowSvg()}
        </button>
      </div>
    </div>
  );
};

export default YearView;
