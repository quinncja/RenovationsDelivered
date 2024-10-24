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
      ? { width: "900px", height: "450px" }
      : { width: "660px", height: "320px" };

    let wideSize = open
      ? { width: 850, height: 430 }
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
