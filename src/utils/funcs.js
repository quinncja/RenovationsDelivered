import { boxSvg, hammerSvg, hardHatSvg, piggyBankSvg } from "business/svg";

export function generateRandomId(length = 8) {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  const charactersLength = characters.length;

  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }

  return result;
}

export function capitalizeFirstLetter(val) {
  return String(val).charAt(0).toUpperCase() + String(val).slice(1);
}

export const scrollToBottom = () => {
  window.scrollTo({
    top: document.documentElement.scrollHeight,
    behavior: "smooth",
  });
};

export const calculateTotalSum = (data) => {
  return data.reduce((acc, datum) => acc + datum.value, 0);
};

export function toggleBodyScroll(disable) {
  if (!window.tempScrollTop) {
    window.tempScrollTop = window.scrollY;
  }
  if (disable) {
    document.getElementById("dashboard").classList.add("noscroll");
    document.getElementById("dashboard").style.top =
      `-${window.tempScrollTop}px`;
  } else {
    document.getElementById("dashboard").classList.remove("noscroll");
    document.getElementById("dashboard").style.top = `0px`;
    window.scrollTo({ top: window.tempScrollTop });
    window.tempScrollTop = 0;
  }
}

export function getItemContainers(type, open) {
  if (type === "Pie") {
    const pieContainer = open
      ? { width: "420px", height: "350px" }
      : { width: "320px", height: "360px" };

    let pieSize = open
      ? { width: 400, height: 400 }
      : { width: 320, height: 320 };

    const imageSize = {
      width: "100%",
      height: "89%",
    };

    return {
      container: pieContainer,
      chartSize: pieSize,
      imageSize: imageSize,
    };
  } else {
    const wideContainer = open
      ? { width: "1100px", height: "450px" }
      : { width: "660px", height: "320px" };

    let wideSize = open
      ? { width: 1125, height: 430 }
      : { width: 640, height: 320 };

    const imageSize = {
      width: "97%",
      height: "100%",
    };

    return {
      container: wideContainer,
      chartSize: wideSize,
      imageSize: imageSize,
    };
  }
}

export const checkEmpty = (data) => {
  if (!Array.isArray(data) || data.length === 0) return true;

  for (const item of data) {
    if (typeof item === "object" && item !== null) {
      const keys = Object.keys(item).filter((key) => key !== "id");

      for (const key of keys) {
        const value = item[key];

        if (Array.isArray(value)) {
          if (value.length > 0) {
            return false;
          }
        } else if (typeof value === "object" && value !== null) {
          if (!checkEmpty([value])) {
            return false;
          }
        } else if (value !== null && value !== 0 && value !== "") {
          return false;
        }
      }
    }
  }

  return true;
};

export function hslToHex(hslString) {
  const hslRegex =
    /^hsl\s*\(\s*([0-9.]+)\s*,\s*([0-9.]+)%\s*,\s*([0-9.]+)%\s*\)$/i;
  const match = hslString.match(hslRegex);
  if (!match) {
    throw new Error("Invalid HSL color string");
  }

  //eslint-disable-next-line
  let [_, h, s, l] = match;
  h = parseFloat(h);
  s = parseFloat(s) / 100;
  l = parseFloat(l) / 100;

  const c = (1 - Math.abs(2 * l - 1)) * s;
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
  const m = l - c / 2;

  let r, g, b;
  if (0 <= h && h < 60) {
    r = c;
    g = x;
    b = 0;
  } else if (60 <= h && h < 120) {
    r = x;
    g = c;
    b = 0;
  } else if (120 <= h && h < 180) {
    r = 0;
    g = c;
    b = x;
  } else if (180 <= h && h < 240) {
    r = 0;
    g = x;
    b = c;
  } else if (240 <= h && h < 300) {
    r = x;
    g = 0;
    b = c;
  } else {
    r = c;
    g = 0;
    b = x;
  }

  r = Math.round((r + m) * 255);
  g = Math.round((g + m) * 255);
  b = Math.round((b + m) * 255);

  const toHex = (num) => num.toString(16).padStart(2, "0");
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

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

export const displayMargin = (margin) => {
  if (margin === "-- %") return margin;
  return `${margin.toFixed(2)}%`;
};

export const getBreakdownIconByType = (type) => {
  if (type === "Material") return boxSvg();
  else if (type === "Labor") return hammerSvg();
  else if (type === "Subcontractors") return hardHatSvg();
  else return piggyBankSvg();
};


export const getStatusColor = (budget, spent) => {
  if(budget > spent) return "var(--green)";
  else return "var(--red)"
}

export const getIconBackground = (budget, spent) => {
if(budget > spent) return "linear-gradient(135deg, var(--green) 0%, #20692e 100%)"
else return "linear-gradient(135deg, #ff4757 0%, var(--red) 100%)"
}