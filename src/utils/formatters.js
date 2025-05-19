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
  return `${input.toFixed(2)}%`;
}

export function strToPhase(phaseStr) {
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
    active: "Total",
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
  console.log(phase)
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
    "10": "October",
    "11": "November",
    "12": "December",
    "13": "Extra Work",
    "14": "Extra Work",
    "15": "Extra Work",
    "16": "Extra Work",
    0: "January",
    1: "January",
    2: "February",
    3: "March",
    4: "April",
    5: "May",
    6: "June",
    7: "July",
    8: "August",
    9: "September",
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
  let phaseMap = {
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

export const modifierFormatter = (mods, prevPhase) => {
  const formatted = {
    job: "",
    year: "",
    phase: "",
    prevYear: "",
    prevPhase: "",
    state: mods.state || "",
    pm: mods.pm || "",
    active: "",
  };

  if (mods.jobNum && mods.jobNum.length === 6) {
    formatted.job = mods.jobNum.slice(0, 4);
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
  if (
    formatted.year !== "" &&
    (formatted.job !== "") & (formatted.phase !== "")
  )
    formatted.active = "Total";
  else formatted.active = mods.active;
  return formatted;
};

export const statusToString = (status) => {
  if (status === 4) return "Active";
  return "Complete";
};

export const trimLabel = (label) => {
  if (!label) return;
  return label
    .replace(/the/gi, "")
    .replace(/, inc/gi, "")
    .replace(/inc\./gi, "")
    .replace(/inc/gi, "")
    .replace(/llc/gi, "")
    .trim();
};

export const toParam = (str) => {
  return str.replace(" ", "-");
};

export const fromParam = (str) => {
  return str.replace("-", " ");
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
  if (status === 1) return "Bid";
  if (status === 2) return "Refused";
  if (status === 3) return "Contract";
  if (status === 4) return "Current";
  if (status === 5) return "Complete";
  if (status === 6) return "Closed";
};

export const costTypeFormatter = (costCode) => {
  if (costCode === 1) return "Material";
  if (costCode === 2) return "Labor";
  if (costCode === 3) return "Equipment";
  if (costCode === 4) return "Sub";
  if (costCode === 5) return "WTPM";
};

export function formatMarginData(data, maxLayer) {
  let formattedData;

  if (maxLayer === 2) {
    const flattenedData = data.flatMap((yearObj) => {
      const year = yearObj.Year;
      return yearObj.Phases.map((phaseObj) => ({
        x: `${phaseObj.Phase}_${year}`,
        y: phaseObj.marginPercentage,
      }));
    });

    flattenedData.sort((a, b) => {
      const [phaseA, yearA] = a.x.split("_").map((item) => parseInt(item, 10));
      const [phaseB, yearB] = b.x.split("_").map((item) => parseInt(item, 10));

      if (yearA !== yearB) {
        return yearA - yearB;
      }

      return phaseA - phaseB;
    });

    formattedData = [
      {
        id: "Margin",
        data: flattenedData,
      },
    ];
  } else {
    formattedData = [
      {
        id: "Margin",
        data: data.map((item) => ({
          x: item.Phase,
          y: item.marginPercentage,
        })),
      },
    ];

    formattedData[0].data.sort((a, b) => {
      const phaseA = parseInt(a.x, 10);
      const phaseB = parseInt(b.x, 10);
      return phaseA - phaseB;
    });
  }

  return formattedData;
}

export function formatRevenueData(data, maxLayer, isAdmin) {
  let formattedData;

  if (maxLayer === 2) {
    const budgetedSums = {};
    const cogsSums = {};
    const cntrctSums = isAdmin ? {} : null;

    data.forEach((yearObj) => {
      const year = yearObj.Year;
      yearObj.Phases.forEach((phaseObj) => {
        const key = `${phaseObj.Phase}_${year}`;

        // Sum budgetedAmount
        budgetedSums[key] = (budgetedSums[key] || 0) + phaseObj.budgetedAmount;

        // Sum totalCost
        cogsSums[key] = (cogsSums[key] || 0) + phaseObj.totalCost;

        // Sum contractValue only if isAdmin is true
        if (isAdmin && phaseObj.contractValue !== undefined) {
          cntrctSums[key] = (cntrctSums[key] || 0) + phaseObj.contractValue;
        }
      });
    });

    const sortByPhaseAndYear = (a, b) => {
      const [phaseA, yearA] = a.x.split("_").map((item) => parseInt(item, 10));
      const [phaseB, yearB] = b.x.split("_").map((item) => parseInt(item, 10));

      if (yearA !== yearB) {
        return yearA - yearB;
      }

      return phaseA - phaseB;
    };

    const budgetedResult = {
      id: "Budgeted",
      data: Object.keys(budgetedSums)
        .map((key) => ({
          x: key,
          y: budgetedSums[key],
        }))
        .sort(sortByPhaseAndYear),
    };

    const cogsResult = {
      id: "COGS",
      data: Object.keys(cogsSums)
        .map((key) => ({
          x: key,
          y: cogsSums[key],
        }))
        .sort(sortByPhaseAndYear),
    };

    const contractResult = isAdmin
      ? {
          id: "Contracted",
          data: Object.keys(cntrctSums)
            .map((key) => ({
              x: key,
              y: cntrctSums[key],
            }))
            .sort(sortByPhaseAndYear),
        }
      : null;

    formattedData = [budgetedResult, cogsResult];
    if (isAdmin && contractResult) {
      formattedData.push(contractResult);
    }
  } else {
    const budgetedSums = {};
    const cogsSums = {};
    const cntrctSums = isAdmin ? {} : null;

    data.forEach((item) => {
      const phase = item.Phase;

      // Sum budgetedAmount
      budgetedSums[phase] = (budgetedSums[phase] || 0) + item.budgetedAmount;

      // Sum totalCost
      cogsSums[phase] = (cogsSums[phase] || 0) + item.totalCost;

      // Sum contractValue only if isAdmin is true
      if (isAdmin && item.contractValue !== undefined) {
        cntrctSums[phase] = (cntrctSums[phase] || 0) + item.contractValue;
      }
    });

    const sortByPhase = (a, b) => {
      const phaseA = parseInt(a.x, 10);
      const phaseB = parseInt(b.x, 10);
      return phaseA - phaseB;
    };

    const budgetedResult = {
      id: "Budgeted",
      data: Object.keys(budgetedSums)
        .map((phase) => ({
          x: phase,
          y: budgetedSums[phase],
        }))
        .sort(sortByPhase),
    };

    const cogsResult = {
      id: "COGS",
      data: Object.keys(cogsSums)
        .map((phase) => ({
          x: phase,
          y: cogsSums[phase],
        }))
        .sort(sortByPhase),
    };

    const contractResult = isAdmin
      ? {
          id: "Contracted",
          data: Object.keys(cntrctSums)
            .map((phase) => ({
              x: phase,
              y: cntrctSums[phase],
            }))
            .sort(sortByPhase),
        }
      : null;

    formattedData = [budgetedResult, cogsResult];
    if (isAdmin && contractResult) {
      formattedData.push(contractResult);
    }
  }

  return formattedData;
}

export function getFirstWord(str) {
  const words = str.trim().split(" ");
  return words[0];
}

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
