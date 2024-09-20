export function dollarFormatter(input) {
  const number = parseFloat(input);

  if (isNaN(number)) {
    return null;
  }

  const formattedNumber = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(number);

  return formattedNumber;
}

export function percentFomatter(input) {
  return `${input}%`;
}

export function formatNumberShort(number) {
  if (Math.abs(number) >= 1_000 && Math.abs(number) < 1_000_000) {
    return (number / 1_000).toFixed(1).replace(/\.0$/, "") + "K";
  }
  if (Math.abs(number) >= 1_000_000 && Math.abs(number) < 1_000_000_000) {
    return (number / 1_000_000).toFixed(1).replace(/\.0$/, "") + "M";
  }
  return number.toString();
}

export function stringFormatter(input) {
  const words = input.split(" ");

  const formattedWords = words.map((word) => {
    return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
  });

  return formattedWords.join(" ");
}

export function formatSubtitle({ project, year, phase }) {
  let parts = [];

  if (project) {
    parts.push(project.name);
  }
  if (year) {
    parts.push(year.name);
  }
  if (phase) {
    parts.push(phase);
  }
  return parts.join(" - ");
}

export const formatYear = (year) => {
  return year.slice(-2);
};

export const formatPhase = (phase) => {
  return phase.replace("P", "").padStart(2, "0");
};

export const phaseNumToMonth = (phase) => {
  let phaseMap = {
    "00": "January",
    "01": "January",
    "02": "February",
    "03": "March",
    "04": "April",
    "05": "May",
    "06": "June",
    "07": "July",
    "08": "August",
    "09": "September",
    10: "October",
    11: "November",
    12: "December",
    13: "Extra Work",
    14: "Extra Work",
    15: "Extra Work",
    16: "Extra Work",
  };

  return phaseMap[phase];
};

export const phaseToMonth = (phase, optional) => {
  if (typeof phase !== "string" || phase.length < 5) {
    throw new Error("Invalid phase format");
  }

  const front = phase.substring(0, 2);
  const back = phase.substring(3, 5);

  let phaseMap = {
    "00": "January",
    "01": "January",
    "02": "February",
    "03": "March",
    "04": "April",
    "05": "May",
    "06": "June",
    "07": "July",
    "08": "August",
    "09": "September",
    10: "October",
    11: "November",
    12: "December",
    13: "Extra Work",
    14: "Extra Work",
    15: "Extra Work",
    16: "Extra Work",
  };

  let month = phaseMap[front] || "Unknown Phase";
  if (optional) month = month.slice(0, 3);

  return `${month} '${back}`;
};

export const modifierFormatter = (mods) => {
  const formatted = {
    job: mods.jobNum || "",
    year: "",
    phase: "",
    active: "",
  };

  if (mods.yearId && mods.yearId.length >= 5) {
    formatted.year = mods.yearId.slice(-2);
  }

  if (mods.phaseId && mods.phaseId.length >= 7) {
    formatted.phase = mods.phaseId.slice(-2);
  }
  if (
    formatted.year !== "" &&
    (formatted.job !== "") & (formatted.phase !== "")
  )
    formatted.active = "Total";
  else formatted.active = mods.active;

  return formatted;
};

export const pageModifierToString = (pageModifiers) => {
  const parts = [];
  console.log(pageModifiers)


  const jobName =
    (pageModifiers.job && pageModifiers.job[0]?.name) || "All Projects";
  if (jobName) parts.push(jobName);

  const year =
    pageModifiers.year && pageModifiers.year.length === 1
      ? pageModifiers.year[0].year
      : "";
  if (year) parts.push(year);

  const phaseName =
    pageModifiers.phase && pageModifiers.phase.length === 1
      ? pageModifiers.phase[0].name
      : "";
  if (phaseName) parts.push(phaseName);

  const str = parts.join(" - ");
  return str;
};

export const statusToString = (status) => {
  if (status === 4) return "Active";
  return "Complete";
};
