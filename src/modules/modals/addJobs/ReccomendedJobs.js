import { getBaseJobName } from "pages/openItem/transformData";
import useReccomendedJobs from "utils/hooks/useRecommendedJobs";

function RecommendedJobs({ selected, updateSelected }) {
  const recommendedJobs = useReccomendedJobs();

  if (!recommendedJobs || recommendedJobs.length === 0) return null;

  return (
    <div className="recommended">
      <h4 style={{ textAlign: "left", fontWeight: "500" }}>
        Recommended for you
      </h4>
      <div className="recommended-jobs">
        {recommendedJobs.map((job) => {
          const isSelected = selected.includes(job.num);
          return (
            <button
              className={`project-button more-padding ${isSelected ? "active-project-button" : ""}`}
              onClick={() => updateSelected(job.num)}
            >
              {getBaseJobName(job.name)}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default RecommendedJobs;
