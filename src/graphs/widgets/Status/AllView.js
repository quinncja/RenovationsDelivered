import { useModifiers } from "context/ModifierContext";

const AllView = ({ allViewData, setItemView }) => {
  const { job, years, jobs } = allViewData;
  const { updatePageModifiers, setModTimeout } = useModifiers();

  const handleClick = () => {
    if(jobs.length === 1)
    setItemView({
      display: true,
      items: years,
      tag: "yearName",
      job: job.name,
      itemClick: (item) => 
      {
        setModTimeout(true)
        updatePageModifiers({
          yearId: item.year.id,
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
        <div className="job-display-section all-section btn-section" onClick={() => handleClick()}>
          <h2 style={{fontSize: "35px"}}>All Time</h2>
        </div>
    </div>
  );
};

export default AllView;
