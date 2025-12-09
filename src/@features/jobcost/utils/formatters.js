export const modifierFormatter = (mods, prevPhase) => {
  const formatted = {
    job: "",
    year: "",
    phase: "",
    status: mods.status || "",
    state: mods.state || "",
    pm: mods.pm || "",
    client: mods.client || "",
  };

  if (mods.jobNum && mods.jobNum.length === 8) {
    formatted.year = mods.jobNum.slice(0, 2);
    formatted.job = mods.jobNum.slice(2, 6);
    formatted.phase = mods.jobNum.slice(-2);
  } else {
    if (mods.jobNum) formatted.job = mods.jobNum;
    if (mods.phaseId && mods.phaseId.length >= 7) {
      formatted.phase = mods.phaseId.slice(-2);
    }
  }

  if (mods.yearId && mods.yearId.length >= 5) {
    formatted.year = mods.yearId.slice(-2);
  }

  if (prevPhase && prevPhase.id.length >= 7) {
    formatted.prevYear = prevPhase.yearNum;
    formatted.prevPhase = prevPhase.id.slice(-2);
  } else {
    formatted.prevYear = "";
    formatted.prevPhase = "";
  }

  return formatted;
};
