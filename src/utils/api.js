import axios from "axios";
import { apiUrl, ngrokHeaders } from "./config";
import Userfront from "@userfront/toolkit";
import { toast } from "sonner";

export async function loadUserData() {
  try {
    const userData = localStorage.getItem("userData");

    if (userData === null) {
      return {
        data: null,
        status: 404,
        statusText: "Not Found",
      };
    }

    return {
      data: JSON.parse(userData),
      status: 200,
      statusText: "OK",
    };
  } catch (error) {
    throw new Error(
      "Failed to load user data from localStorage: " + error.message,
    );
  }
}

export async function saveUserData(userData, objectName) {
  try {
    const existingDataString = localStorage.getItem("userData");
    let existingData = {};

    if (existingDataString) {
      try {
        existingData = JSON.parse(existingDataString);
      } catch (parseError) {
        console.warn(
          "Could not parse existing userData, starting fresh:",
          parseError,
        );
        existingData = {};
      }
    }

    existingData[objectName] = userData;

    localStorage.setItem("userData", JSON.stringify(existingData));

    return {
      data: existingData,
      status: 200,
      statusText: "OK",
    };
  } catch (error) {
    throw new Error(
      "Failed to save user data to localStorage: " + error.message,
    );
  }
}
export async function fetchUserList() {
  try {
    const response = await axios.get(`${apiUrl}user-list`, {
      ...ngrokHeaders,
    });
    return response.data;
  } catch (error) {
    console.error("Error loading Users:", error);
  }
}

export async function loadProjectList(signal) {
  try {
    const response = await axios.get(`${apiUrl}job-list-new`, {
      ...ngrokHeaders,
      signal: signal,
    });
    return response;
  } catch (error) {
    if (error.name === "AbortError" || error.code === "ERR_CANCELED") {
      throw error;
    }

    if (error.response?.status === 500) {
      toast.error(
        "VPN connection error. Please wait a few minutes and try again",
      );
    }
    console.error("Error loading jobs:", error);
    throw error;
  }
}

export async function fetchHomeData(signal) {
  try {
    const response = await axios.get(`${apiUrl}home-data`, {
      ...ngrokHeaders,
      signal,
    });
    return response.data;
  } catch (error) {
    if (axios.isCancel(error)) {
    } else if (
      error.response &&
      error.response.data &&
      error.response.data.error
    ) {
      if (error.response.status === 500) {
        toast.error(
          "VPN connection error. Please wait a few minutes and try again",
        );
      }
      console.log(error.response.data.error);
    } else {
      throw Error;
    }
  }
}

export async function fetchOpenHomeData(modifiers, signal) {
  try {
    const response = await axios.get(`${apiUrl}home-data-open`, {
      params: { ...modifiers },
      ...ngrokHeaders,
      signal,
    });
    return response.data;
  } catch (error) {
    if (axios.isCancel(error)) {
    } else if (
      error.response &&
      error.response.data &&
      error.response.data.error
    ) {
      if (error.response.status === 500) {
        toast.error(
          "VPN connection error. Please wait a few minutes and try again",
        );
      }
      console.log(error.response.data.error);
    } else {
      throw Error;
    }
  }
}

export async function fetchFileFromSMB(filePath, signal) {
  try {
    const encodedPath = encodeURIComponent(filePath);
    const url = `${apiUrl}api/file/${encodedPath}`;

    const isImage = /\.(jpg|jpeg|png|gif)$/i.test(filePath);
    const isPDF = /\.pdf$/i.test(filePath);
    const responseType = isPDF ? "blob" : isImage ? "blob" : "arraybuffer";

    const response = await axios.get(url, {
      ...ngrokHeaders,
      responseType,
      signal,
    });

    if (response.data instanceof Blob) {
      return URL.createObjectURL(response.data);
    } else if (response.data instanceof ArrayBuffer) {
      const blob = new Blob([response.data]);
      return URL.createObjectURL(blob);
    }

    return response.data;
  } catch (error) {
    if (axios.isCancel(error)) {
    } else if (
      error.response &&
      error.response.data &&
      error.response.data.error
    ) {
      if (error.response.status === 500) {
        toast.error(
          "File server connection error. Please check your connection and try again.",
        );
      }
      console.error(error.response.data.error);
    } else {
      console.error(`Error fetching file:`, error.message);
    }
    return null;
  }
}

export async function fetchJobListData(joblist, signal) {
  try {
    const url = new URL(`${apiUrl}joblist-data`);

    // Ensure joblist is an array
    const jobsArray = Array.isArray(joblist) ? joblist : [joblist];

    jobsArray.forEach((job) => {
      url.searchParams.append("jobs", job);
    });

    const response = await axios.get(url.toString(), {
      ...ngrokHeaders,
      signal,
    });
    return response.data;
  } catch (error) {
    if (axios.isCancel(error)) {
    } else if (
      error.response &&
      error.response.data &&
      error.response.data.error
    ) {
      if (error.response.status === 500) {
        toast.error(
          "VPN connection error. Please wait a few minutes and try again",
        );
      }
      console.error(error.response.data.error);
    } else {
      console.error(`Error loading job list data:`, error.message);
    }
    return null;
  }
}

export async function fetchChartData(modifiers, signal) {
  try {
    const response = await axios.get(`${apiUrl}chart-data`, {
      params: { ...modifiers },
      ...ngrokHeaders,
      signal,
    });
    return response.data;
  } catch (error) {
    if (axios.isCancel(error)) {
    } else if (
      error.response &&
      error.response.data &&
      error.response.data.error
    ) {
      if (error.response.status === 500) {
        toast.error(
          "VPN connection error. Please wait a few minutes and try again",
        );
      }
      console.error(error.response.data.error);
    } else {
      console.error(`Error loading ${modifiers.type}:`, error.message);
    }
  }
}

export async function fetchBreakdownItems(modifiers, costType, signal) {
  try {
    const response = await axios.get(`${apiUrl}breakdown-items`, {
      params: { ...modifiers, costType },
      ...ngrokHeaders,
      signal,
    });
    return response.data;
  } catch (error) {
    if (axios.isCancel(error)) {
    } else if (
      error.response &&
      error.response.data &&
      error.response.data.error
    ) {
      if (error.response.status === 500) {
        toast.error(
          "VPN connection error. Please wait a few minutes and try again",
        );
      }
      console.error(
        `Error loading ${modifiers.type}:`,
        error.response.data.error,
      );
    } else {
      console.error(`Error loading ${modifiers.type}:`, error.message);
    }
  }
}

export async function fetchAggrJobData(modifiers, signal) {
  try {
    const response = await axios.get(`${apiUrl}aggr-job-data`, {
      params: { ...modifiers },
      ...ngrokHeaders,
      signal,
    });
    return response.data;
  } catch (error) {
    if (axios.isCancel(error)) {
    } else if (
      error.response &&
      error.response.data &&
      error.response.data.error
    ) {
      console.error(
        `Error loading ${modifiers.type}:`,
        error.response.data.error,
      );
    } else {
      console.error(`Error loading ${modifiers.type}:`, error.message);
    }
  }
}

export async function fetchJobData(modifiers, signal) {
  try {
    const response = await axios.get(`${apiUrl}job-data`, {
      params: { ...modifiers },
      ...ngrokHeaders,
      signal,
    });
    return response.data;
  } catch (error) {
    if (axios.isCancel(error)) {
    } else if (
      error.response &&
      error.response.data &&
      error.response.data.error
    ) {
      console.error(
        `Error loading ${modifiers.type}:`,
        error.response.data.error,
      );
    } else {
      console.error(`Error loading ${modifiers.type}:`, error.message);
    }
  }
}

export async function changeUserRole(userId, newRole) {
  try {
    const response = await axios.post(
      `${apiUrl}change-user-role`,
      { userId, newRole },
      {
        ...ngrokHeaders,
      },
    );
    return response;
  } catch (error) {
    console.error("Error initializing user", error);
  }
}

export async function initializeUserRole(userId) {
  try {
    await axios.get(`${apiUrl}initialize-user?userId=${userId}`, {
      ...ngrokHeaders,
    });
  } catch (error) {
    console.error("Error initializing user", error);
  }
}

export async function submitChangeOrder(changeObj) {
  try {
    const response = await axios.post(`${apiUrl}change-order`, changeObj, {
      ...ngrokHeaders,
    });
    return response;
  } catch (error) {
    console.error("Error submitting change order", error);
    throw error;
  }
}

export async function submitFeedback(feedbackObj) {
  try {
    const response = await axios.post(`${apiUrl}feedback`, feedbackObj, {
      ...ngrokHeaders,
    });
    return response;
  } catch (error) {
    console.error("Error submitting change order", error);
    throw error;
  }
}

export async function fetchFeedback() {
  try {
    const response = await axios.get(`${apiUrl}feedback`, {
      ...ngrokHeaders,
    });
    return response;
  } catch (error) {
    console.error("Error submitting change order", error);
    throw error;
  }
}

export async function deleteFeedback(id) {
  try {
    const response = await axios.delete(`${apiUrl}feedback/${id}`, {
      ...ngrokHeaders,
    });
    return response;
  } catch (error) {
    console.error("Error submitting change order", error);
    throw error;
  }
}

export async function sendChangeOrderEmail(changeObj) {
  try {
    const response = await axios.post(
      `${apiUrl}change-order/email`,
      changeObj,
      {
        ...ngrokHeaders,
      },
    );
    return response;
  } catch (error) {
    throw error;
  }
}

export async function sendChangeOrderCreatedEmail(emailObj) {
  try {
    const response = await axios.post(
      `${apiUrl}change-order-created/email`,
      emailObj,
      {
        ...ngrokHeaders,
      },
    );
    return response;
  } catch (error) {
    console.log(error);
  }
}

export async function deleteRun(id) {
  try {
    const response = await axios.delete(`${apiUrl}report/cogs/${id}`, {
      ...ngrokHeaders,
    });
    return response;
  } catch (error) {
    throw error;
  }
}

export async function patchRunItem(id, state) {
  try {
    const response = await axios.patch(
      `${apiUrl}report/run`,
      {
        id: id,
        state: Boolean(state),
      },
      {
        ...ngrokHeaders,
      },
    );
    return response;
  } catch (error) {
    throw error;
  }
}

export async function patchReportItem(type, id, state) {
  try {
    const response = await axios.patch(
      `${apiUrl}report/item`,
      {
        id: id,
        type: type,
        state: Boolean(state),
      },
      {
        ...ngrokHeaders,
      },
    );
    return response;
  } catch (error) {
    throw error;
  }
}

export async function patchChangeOrder(idnum, status) {
  try {
    const response = await axios.patch(
      `${apiUrl}change-order`,
      {
        _idnum: idnum,
        status: Number(status),
      },
      {
        ...ngrokHeaders,
      },
    );
    return response;
  } catch (error) {
    throw error;
  }
}

export async function getReports(type) {
  try {
    const response = await axios.get(`${apiUrl}report/${type}`, {
      ...ngrokHeaders,
    });
    return response;
  } catch (error) {
    throw error;
  }
}

export async function getReport(type, id) {
  try {
    const response = await axios.get(`${apiUrl}report/${type}/${id}`, {
      ...ngrokHeaders,
    });
    return response;
  } catch (error) {
    throw error;
  }
}

export async function getLastRan(type) {
  try {
    const response = await axios.get(`${apiUrl}last-ran/${type}`, {
      ...ngrokHeaders,
    });
    return response;
  } catch (error) {
    throw error;
  }
}

export async function runReport(type) {
  try {
    const response = await axios.post(
      `${apiUrl}report/${type}`,
      { user: Userfront.user.name },
      {
        ...ngrokHeaders,
      },
    );
    return response;
  } catch (error) {
    throw error;
  }
}
