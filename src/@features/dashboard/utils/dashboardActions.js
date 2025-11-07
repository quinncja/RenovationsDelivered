export const updatePageModifiersAction =
  (setPageModifiers, setModTimeout) => (newMods) => {
    setModTimeout(true);
    setPageModifiers((prevModifiers) => ({
      ...prevModifiers,
      ...newMods,
    }));
  };

export const updateTrackedJobsAction =
  (setTrackedJobs, saveTrackedJobs) => (newJobs) => {
    setTrackedJobs(newJobs);
    saveTrackedJobs(newJobs);
  };
