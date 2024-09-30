import { useModifiers } from "context/ModifierContext";
import { useProjectContext } from "context/ProjectContext";
import { useMemo } from "react";

export const useSingle = () => {
  const { pageModifiers } = useModifiers();
  const { projects } = useProjectContext();

  const single = useMemo(() => {
    if (!projects) return false;
    if (
      pageModifiers.jobNum !== null &&
      pageModifiers.yearId !== null &&
      pageModifiers.phaseId !== null
    ) {
      return true;
    }
    if (pageModifiers.yearId !== null && pageModifiers.phaseId !== null)
      return true;

    if (!pageModifiers.jobNum) return false;

    const jobNum = pageModifiers.jobNum;
    if (!pageModifiers.yearId) {
      const jobYears = projects.jobs[jobNum]?.years || [];
      if (jobYears.length > 1) return false;
    }

    const yearId = projects.jobs[jobNum]?.years[0];
    const phaseNums = projects.years[yearId]?.phases || [];
    if (phaseNums.length > 1) return false;

    return true;
  }, [pageModifiers, projects]);

  return single;
};
