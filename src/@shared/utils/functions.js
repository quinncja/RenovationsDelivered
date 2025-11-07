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
  if (!input) return "$0.00";
  return `${input.toFixed(2)}%`;
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
  if (Math.abs(number) >= 1_000 && Math.abs(number) < 1_000_000) {
    return (number / 1_000).toFixed(1).replace(/\.0$/, "") + "K";
  }
  if (Math.abs(number) >= 1_000_000 && Math.abs(number) < 1_000_000_000) {
    return (number / 1_000_000).toFixed(1).replace(/\.0$/, "") + "M";
  }
  return number.toString();
}

export const yearPhaseToStr = (yearPhase) => {
  const year = yearPhase.slice(1, 3);
  const phase = yearPhase.slice(3, 5);

  const phaseMap = {
    "00": "Ex.",
    "01": "Jan",
    "02": "Feb",
    "03": "Mar",
    "04": "Apr",
    "05": "May",
    "06": "June",
    "07": "July",
    "08": "Aug",
    "09": "Sept",
    10: "Oct",
    11: "Nov",
    12: "Dec",
    13: "Ex.",
    14: "Ex.",
    15: "Ex.",
    16: "Ex.",
  };

  return `${phaseMap[String(phase)]} ${year}`;
};

export const phaseNumToMonth = (phase) => {
  const phaseMap = {
    0: "Extra Work",
    "00": "Extra Work",
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

  const key = String(phase).padStart(2, "0");
  return phaseMap[key];
};

export const phaseToMonth = (phase, optional) => {
  let phaseMap = {
    0: "Extra Work",
    "00": "Extra Work",
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

export function capitalizeFirstLetter(val) {
  return String(val).charAt(0).toUpperCase() + String(val).slice(1);
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
  else if (margin < 0) return "over";
  else if (margin > 25) return "under";
  else if (margin > 20) return "semi-good";
  else return "semi-bad";
};

export const getMarginColor = (margin) => {
  if (margin === "-- %") return "";
  else if (margin < 0) return "var(--red)";
  else if (margin > 25) return "var(--green)";
  else if (margin > 20) return "var(--yellow)";
  else return "var(--orange)";
};

export const getMarginBackground = (margin) => {
  if (margin === "-- %") return "";
  else if (margin < 0) return "red-background";
  else if (margin > 25) return "green-background";
  else if (margin > 20) return "yellow-background";
  else return "orange-background";
};

export const displayMargin = (margin) => {
  if (margin === "-- %") return margin;
  return `${margin.toFixed(2)}%`;
};
