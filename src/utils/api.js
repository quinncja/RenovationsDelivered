import axios from "axios";
import { apiUrl, ngrokHeaders } from "./config";
import Userfront from "@userfront/toolkit";
import { toast } from "sonner";



export async function retryRequest(requestFn, maxRetries = 3, delayMs = 1000) {
  let lastError;

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      return await requestFn();
    } catch (error) {
      lastError = error;

      if (attempt === maxRetries) {
        throw error;
      }

      await new Promise((resolve) => setTimeout(resolve, delayMs));
    }
  }
  
  throw lastError;
}

export async function fetchUserList() {
  try {
    const response = await retryRequest(
      () => axios.get(`${apiUrl}user-list`, { ...ngrokHeaders }),
      3,
      1000
    );
    return response.data;
  } catch (error) {
    console.error("Error loading Users:", error);
  }
}

export async function fetchJobList() {
  try {
    const response = await retryRequest(
      () => axios.get(`${apiUrl}job-list`, { ...ngrokHeaders }),
      3,
      1000
    );
    return response.data;
  } catch (error) {
    if (error?.response?.status === 500) {
      toast.error("VPN connection error. Please wait a few minutes and try again");
    }
    console.error("Error loading jobs:", error);
  }
}

export async function fetchHomeData(id, body, signal) {
  try {
    const response = await retryRequest(
      () => axios.get(`${apiUrl}${id}`, {
        params: body,
        ...ngrokHeaders,
        signal,
      }),
      3,
      1000
    );
    return response.data;
  } catch (error) {
    if (axios.isCancel(error)) {
      // do nothing
    } else if (error.response && error.response.data && error.response.data.error) {
      if (error.response.status === 500) {
        toast.error("VPN connection error. Please wait a few minutes and try again");
      }
      console.log(error.response.data.error);
    } else {
      throw Error;
    }
  }
}

export async function fetchChartData(modifiers, signal) {
  try {
    const response = await retryRequest(
      () => axios.get(`${apiUrl}chart-data`, {
        params: { ...modifiers },
        ...ngrokHeaders,
        signal,
      }),
      3,
      1000
    );
    return response.data;
  } catch (error) {
    if (axios.isCancel(error)) {
      // do nothing
    } else if (error.response && error.response.data && error.response.data.error) {
      if (error.response.status === 500) {
        toast.error("VPN connection error. Please wait a few minutes and try again");
      }
      console.error(error.response.data.error);
    } else {
      console.error(`Error loading ${modifiers.type}:`, error.message);
    }
  }
}

export async function fetchOpenJobData(modifiers, costType, signal) {
  try {
    const response = await retryRequest(
      () => axios.get(`${apiUrl}open-job-data`, {
        params: { ...modifiers, costType },
        ...ngrokHeaders,
        signal,
      }),
      3,
      1000
    );
    return response.data;
  } catch (error) {
    if (axios.isCancel(error)) {
      // do nothing
    } else if (error.response && error.response.data && error.response.data.error) {
      if (error.response.status === 500) {
        toast.error("VPN connection error. Please wait a few minutes and try again");
      }
      console.error(`Error loading ${modifiers.type}:`, error.response.data.error);
    } else {
      console.error(`Error loading ${modifiers.type}:`, error.message);
    }
  }
}

export async function fetchAggrJobData(modifiers, signal) {
  try {
    const response = await retryRequest(
      () => axios.get(`${apiUrl}aggr-job-data`, {
        params: { ...modifiers },
        ...ngrokHeaders,
        signal,
      }),
      3,
      1000
    );
    return response.data;
  } catch (error) {
    if (axios.isCancel(error)) {
      // do nothing
    } else if (error.response && error.response.data && error.response.data.error) {
      console.error(`Error loading ${modifiers.type}:`, error.response.data.error);
    } else {
      console.error(`Error loading ${modifiers.type}:`, error.message);
    }
  }
}

export async function fetchJobData(modifiers, signal) {
  try {
    const response = await retryRequest(
      () => axios.get(`${apiUrl}job-data`, {
        params: { ...modifiers },
        ...ngrokHeaders,
        signal,
      }),
      3,
      1000
    );
    return response.data;
  } catch (error) {
    if (axios.isCancel(error)) {
      // do nothing
    } else if (error.response && error.response.data && error.response.data.error) {
      console.error(`Error loading ${modifiers.type}:`, error.response.data.error);
    } else {
      console.error(`Error loading ${modifiers.type}:`, error.message);
    }
  }
}

export async function changeUserRole(userId, newRole) {
  try {
    const response = await retryRequest(
      () => axios.post(`${apiUrl}change-user-role`, { userId, newRole }, {
        ...ngrokHeaders,
      }),
      3,
      1000
    );
    return response;
  } catch (error) {
    console.error("Error initializing user", error);
  }
}

export async function initializeUserRole(userId) {
  try {
    await retryRequest(
      () => axios.get(`${apiUrl}initialize-user?userId=${userId}`, {
        ...ngrokHeaders,
      }),
      3,
      1000
    );
  } catch (error) {
    console.error("Error initializing user", error);
  }
}

export async function submitChangeOrder(changeObj) {
  try {
    const response = await retryRequest(
      () => axios.post(`${apiUrl}change-order`, changeObj, {
        ...ngrokHeaders,
      }),
      3,
      1000
    );
    return response;
  } catch (error) {
    console.error("Error submitting change order", error);
  }
}

export async function sendChangeOrderEmail(changeObj) {
  try {
    const response = await retryRequest(
      () => axios.post(`${apiUrl}change-order/email`, changeObj, {
        ...ngrokHeaders,
      }),
      3,
      1000
    );
    return response;
  } catch (error) {
    throw error;
  }
}

export async function sendChangeOrderCreatedEmail(emailObj) {
  try {
    const response = await retryRequest(
      () => axios.post(`${apiUrl}change-order-created/email`, emailObj, {
        ...ngrokHeaders,
      }),
      3,
      1000
    );
    return response;
  } catch (error) {
    console.log(error);
  }
}

export async function deleteRun(id) {
  try {
    const response = await retryRequest(
      () => axios.delete(`${apiUrl}report/cogs/${id}`, {
        ...ngrokHeaders,
      }),
      3,
      1000
    );
    return response;
  } catch (error) {
    throw error;
  }
}

export async function patchRunItem(id, state) {
  try {
    const response = await retryRequest(
      () =>
        axios.patch(
          `${apiUrl}report/run`,
          {
            id: id,
            state: Boolean(state),
          },
          {
            ...ngrokHeaders,
          }
        ),
      3,
      1000
    );
    return response;
  } catch (error) {
    throw error;
  }
}

export async function patchReportItem(type, id, state) {
  try {
    const response = await retryRequest(
      () =>
        axios.patch(
          `${apiUrl}report/item`,
          {
            id: id,
            type: type,
            state: Boolean(state),
          },
          {
            ...ngrokHeaders,
          }
        ),
      3,
      1000
    );
    return response;
  } catch (error) {
    throw error;
  }
}

export async function patchChangeOrder(idnum, status) {
  try {
    const response = await retryRequest(
      () =>
        axios.patch(
          `${apiUrl}change-order`,
          {
            _idnum: idnum,
            status: Number(status),
          },
          {
            ...ngrokHeaders,
          }
        ),
      3,
      1000
    );
    return response;
  } catch (error) {
    throw error;
  }
}

export async function getReports(type) {
  try {
    const response = await retryRequest(
      () => axios.get(`${apiUrl}report/${type}`, { ...ngrokHeaders }),
      3,
      1000
    );
    return response;
  } catch (error) {
    throw error;
  }
}

export async function getReport(type, id) {
  try {
    const response = await retryRequest(
      () => axios.get(`${apiUrl}report/${type}/${id}`, { ...ngrokHeaders }),
      3,
      1000
    );
    return response;
  } catch (error) {
    throw error;
  }
}

export async function getLastRan(type) {
  try {
    const response = await retryRequest(
      () => axios.get(`${apiUrl}last-ran/${type}`, { ...ngrokHeaders }),
      3,
      1000
    );
    return response;
  } catch (error) {
    throw error;
  }
}

export async function runReport(type) {
  try {
    const response = await retryRequest(
      () =>
        axios.post(
          `${apiUrl}report/${type}`,
          { user: Userfront.user.name },
          { ...ngrokHeaders }
        ),
      3,
      1000
    );
    return response;
  } catch (error) {
    throw error;
  }
}
