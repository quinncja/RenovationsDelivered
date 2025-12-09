const RANDOMIZE_VALUES = false;

const randomizeValue = (value) => {
  if (!RANDOMIZE_VALUES) return value;
  const randomMultiplier = 0.05 + Math.random() * 7.7;
  return value * randomMultiplier;
};

export function dollarFormatter(input) {
  const number = parseFloat(input);
  if (isNaN(number)) {
    return null;
  }
  const displayValue = RANDOMIZE_VALUES ? randomizeValue(number) : number;
  const formattedNumber = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(displayValue);
  return formattedNumber;
}

export function percentFomatter(input) {
  if (!input || isNaN(input)) return "-";
  const displayValue = RANDOMIZE_VALUES ? randomizeValue(input) : input;
  return `${displayValue.toFixed(2)}%`;
}

function strToPhase(phaseStr) {
  phaseStr = String(phaseStr);
  if (phaseStr.length === 1) {
    return "0" + phaseStr;
  } else {
    return phaseStr;
  }
}

export function strToMods(job, year, phase) {
  const jobNum = job || null;
  const yearId = jobNum && year ? `${jobNum}-${year}` : null;
  let phaseId = null;
  if (yearId && phase != null) {
    const phaseStr = strToPhase(phase);
    phaseId = phaseStr != null ? `${yearId}-${phaseStr}` : null;
  }

  return {
    jobNum,
    yearId,
    phaseId,
  };
}

export function formatNumberShort(number) {
  const displayValue = RANDOMIZE_VALUES ? randomizeValue(number) : number;

  if (Math.abs(displayValue) >= 1_000 && Math.abs(displayValue) < 1_000_000) {
    return (displayValue / 1_000).toFixed(1).replace(/\.0$/, "") + "K";
  }
  if (
    Math.abs(displayValue) >= 1_000_000 &&
    Math.abs(displayValue) < 1_000_000_000
  ) {
    return (displayValue / 1_000_000).toFixed(1).replace(/\.0$/, "") + "M";
  }
  return displayValue.toString();
}

const phaseMap = {
  "00": "Ex.",
  1: "Jan",
  "01": "Jan",
  2: "Feb",
  "02": "Feb",
  3: "Mar",
  "03": "Mar",
  "04": "Apr",
  4: "Apr",
  "05": "May",
  5: "May",
  "06": "June",
  6: "June",
  "07": "July",
  7: "July",
  "08": "Aug",
  8: "Aug",
  "09": "Sept",
  9: "Sept",
  10: "Oct",
  11: "Nov",
  12: "Dec",
  13: "Ex.",
  14: "Ex.",
  15: "Ex.",
  16: "Ex.",
};

export const fullYearAndPhaseToStr = (year, phase) => {
  return `${phaseMap[phase]} '${year.toString().slice(2, 4)}`;
};

export const yearPhaseToStr = (yearPhase) => {
  const year = yearPhase.slice(1, 3);
  const phase = yearPhase.slice(3, 5);

  return `${phaseMap[String(phase)]} '${year}`;
};

export const phaseNumToMonth = (phase) => {
  const key = String(phase).padStart(2, "0");
  return phaseMap[key];
};

export const phaseToMonth = (phase, optional) => {
  if (typeof phase !== "string" || phase.length < 5) {
    return phaseMap[phase];
  }

  const front = phase.substring(0, 2);
  const back = phase.substring(3, 5);

  let month = phaseMap[front] || "Unknown Phase";
  if (optional) month = month.slice(0, 3);

  return `${month} '${back}`;
};

export const statusFormatter = (status) => {
  if (status === 4) return "Paid";
  if (status === 1) return "Open";
  if (status === 2) return "Review";
  if (status === 3) return "Dispute";
  if (status === 5) return "Void";
};

export const dateFormatter = (dateInput) => {
  if (!dateInput) return "";
  const date = new Date(dateInput);
  const month = String(date.getUTCMonth() + 1).padStart(2, "0");
  const day = String(date.getUTCDate()).padStart(2, "0");
  const year = date.getUTCFullYear();

  return `${month}-${day}-${year}`;
};

export const jobStatusFormatter = (status) => {
  if (!status) return "-";
  if (status === 1) return "Bid";
  if (status === 2) return "Refused";
  if (status === 3) return "Contract";
  if (status === 4) return "Active";
  if (status === 5) return "Closed";
  if (status === 6) return "Closed";
  else return "Mixed";
};

export const costTypeFormatter = (costCode) => {
  if (costCode === 1) return "Material";
  if (costCode === 2) return "Labor";
  if (costCode === 3) return "Equipment";
  if (costCode === 4) return "Sub";
  if (costCode === 5) return "WTPM";
};

export function destructureJobNumber(jobNumber) {
  const jobStr = jobNumber.toString().padStart(8, "0");

  const jobNumberRegex = /^\d{8}$/;
  if (!jobNumberRegex.test(jobStr)) {
    throw new Error("Invalid job number format. It must be exactly 8 digits.");
  }

  const yearDigits = jobStr.slice(0, 2);
  const phaseDigits = jobStr.slice(6, 8);

  const year = `20${yearDigits}`;

  const phaseNumber = parseInt(phaseDigits, 10);
  let jobNum;

  if (phaseDigits === "00" || phaseNumber > 12) {
    jobNum = jobStr.slice(2, 8);
  } else {
    jobNum = jobStr.slice(2, 6);
  }

  const phase = phaseDigits;

  return {
    year,
    jobNum,
    phase,
  };
}

const timeOptions = {
  weekday: "short",
  day: "numeric",
  month: "short",
  hour: "numeric",
  minute: "numeric",
  timeZone: "America/Chicago",
};

export const dateTimeToString = (date) => {
  if (!date) return "";
  return date.toLocaleString("en-US", timeOptions);
};

export const formatSageUsername = (name) => {
  if (!name) return "";
  const match = name.match(/\\(.*?)\.ren/);
  if (match && match[1]) {
    return match[1];
  } else return name;
};

export const phaseToShortMonth = (month) => {
  if (month === 0 || month === "0") return "Extra";
  if (month === 13 || month === "13") return "Extra";
  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  return monthNames[month - 1];
};

export const phaseToFullMonth = (month) => {
  if (month === 0 || month === "0") return "Extra";
  if (month === 13 || month === "13") return "Extra";
  
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  
  return monthNames[month - 1];
};

export const getBaseJobName = (jobName) => {
  if (!jobName) return "";
  const substrings = ["\\.", "ave", "tr", "pl", "st", "dr", "ct", "rd", "dt"];
  const substringsPattern = substrings.join("|");
  return jobName
    .replace(/P\d{1,2}\s?/g, "")
    .replace(/\s20\d{2}(?:\s|$)/g, " ")
    .replace(/[.-]+$/g, "")
    .replace(
      new RegExp(
        `(\\s(${substringsPattern})\\.?\\s)|(\\s(${substringsPattern})\\.?$)`,
        "gi",
      ),
      " ",
    )
    .trim();
};

export function camelToTitleCase(camelCase) {
  if (!camelCase || typeof camelCase !== "string") {
    return "";
  }

  return camelCase
    .replace(/([A-Z])/g, " $1")
    .replace(/^./, (str) => str.toUpperCase())
    .trim();
}

export const calculateTotalSum = (data) => {
  return data.reduce((acc, datum) => acc + datum.value, 0);
};

export const calculateMargin = (contract, cogs) => {
  if (!contract || !cogs) return "-- %";
  return (100 * (contract - cogs)) / contract;
};

export const getMarginClass = (margin) => {
  if (margin === "-- %") return "";
  else if (margin >= 20) return "under";
  else if (margin >= 17) return "semi-good"
  else return "over";
};

export const getMarginColor = (margin) => {
  if (margin === "-- %") return "";
  else if (margin >= 20) return "var(--green)";
  else if (margin >= 17) return "var(--yellow)"
  else return "var(--red)";
};

export const getMarginBackground = (margin) => {
  if (margin === "-- %") return "";
  else if (margin >= 20) return "green-background";
  else if (margin >= 17) return "yellow-background"
  else return "red-background";
};

export const displayMargin = (margin) => {
  if (margin === "-- %") return margin;
  const displayValue = RANDOMIZE_VALUES ? randomizeValue(margin) : margin;
  return `${displayValue.toFixed(2)}%`;
};

export function capitalizeFirstLetter(str) {
  if (!str) return str;
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function displayString(input) {
  if (!RANDOMIZE_VALUES || !input) return input;

  const prefixes = [
    "Premier",
    "Elite",
    "Superior",
    "Diamond",
    "Crown",
    "Royal",
    "Metro",
    "Universal",
    "Pacific",
    "Atlantic",
    "Summit",
    "Pinnacle",
    "Apex",
    "Vista",
  ];

  const companies = [
    "Construction",
    "Builders",
    "Contractors",
    "Development",
    "Properties",
    "Renovations",
    "Remodeling",
    "Solutions",
    "Services",
    "Enterprises",
    "Group",
    "Associates",
    "Partners",
    "Industries",
    "Corporation",
  ];

  const names = [
    "Anderson",
    "Johnson",
    "Williams",
    "Martinez",
    "Thompson",
    "Garcia",
    "Miller",
    "Davis",
    "Rodriguez",
    "Wilson",
    "Moore",
    "Taylor",
    "Jackson",
    "White",
    "Harris",
    "Martin",
    "Brown",
    "Lee",
    "Walker",
    "Hall",
  ];

  const projectTypes = [
    "Residential",
    "Commercial",
    "Industrial",
    "Mixed-Use",
    "Retail",
    "Office",
    "Healthcare",
    "Educational",
    "Hospitality",
    "Municipal",
  ];

  const locations = [
    "Downtown",
    "Midtown",
    "Uptown",
    "Lakeside",
    "Riverside",
    "Hillside",
    "North Side",
    "South Side",
    "East Side",
    "West Side",
    "Central",
    "Plaza",
  ];

  const hasNumbers = /\d/.test(input);
  const hasCompany = /llc|inc|corp|company|contractor|builder/i.test(input);

  if (hasNumbers) {
    const type = projectTypes[Math.floor(Math.random() * projectTypes.length)];
    const location = locations[Math.floor(Math.random() * locations.length)];
    return `${location} ${type} Project`;
  } else if (hasCompany) {
    const prefix = prefixes[Math.floor(Math.random() * prefixes.length)];
    const company = companies[Math.floor(Math.random() * companies.length)];
    return `${prefix} ${company}`;
  } else {
    const name = names[Math.floor(Math.random() * names.length)];
    const company = companies[Math.floor(Math.random() * companies.length)];
    return `${name} ${company}`;
  }
}
