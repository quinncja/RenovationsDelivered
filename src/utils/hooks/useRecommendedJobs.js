import { pmList } from "utils/modifiers";
import Userfront from "@userfront/toolkit";
import { useProjectContext } from "context/ProjectContext";
import { useTrackedJobs } from "context/TrackedJobContext";

function getPMName() {
  const name = Userfront.user.name;
  const firstName = name.trim().split(" ")[0];
  return firstName;
}

function getPMID(name) {
  const pm = pmList.find((pm) => pm.name === name);
  return pm ? pm.id : null;
}

export default function useReccomendedJobs() {
  const name = getPMName();
  const id = getPMID(name);
  const { projects, getAllProjects, getPhasesForJob } = useProjectContext();
  const { trackedJobs } = useTrackedJobs();

  if (!id) {
    return [];
  }

  if (!projects) {
    return [];
  }

  const jobs = getAllProjects();
  const recommendedJobs = [];

  jobs.forEach((job) => {
    const jobNum = job.num;
    const jobName = job.name;
    const phases = getPhasesForJob(jobNum);
    if (!phases || phases.length === 0) {
      return;
    }

    const sortedPhases = phases.slice().sort((a, b) => {
      const yearA = parseInt(a.yearNum, 10);
      const yearB = parseInt(b.yearNum, 10);
      if (yearA !== yearB) {
        return yearA - yearB;
      } else {
        const phaseNumA = parseInt(a.num, 10);
        const phaseNumB = parseInt(b.num, 10);
        return phaseNumA - phaseNumB;
      }
    });

    const lastPhase = sortedPhases[sortedPhases.length - 1];

    if (lastPhase.status === 4 && lastPhase.pm === String(id)) {
      recommendedJobs.push({ num: jobNum, name: jobName });
    }
  });

  return recommendedJobs.filter((job) => !trackedJobs.includes(job.num));
}
