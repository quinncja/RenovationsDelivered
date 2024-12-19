import axios from "axios";
import { apiUrl, ngrokHeaders } from "./config";
import Userfront from "@userfront/toolkit";

export async function fetchUserList(){
  try{
    const response = await axios.get(`${apiUrl}user-list`, {

      ...ngrokHeaders,
    });
    return response.data;
  }  catch (error) {
    console.error("Error loading Users:", error);
  }
}

export async function fetchJobList() {
  try {
    const response = await axios.get(`${apiUrl}job-list`, {
      ...ngrokHeaders,
    });
    return response.data;
  } catch (error) {
    console.error("Error loading jobs:", error);
  }
}

export async function fetchHomeData(id, body, signal){
  try {
    const response = await axios.get(`${apiUrl}${id}`, {
      params: body,
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
        `Error loading ${id}:`,
        error.response.data.error,
      );
    } else {
      throw Error
    }
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
      console.error(
        `Error loading ${modifiers.type}:`,
        error.response.data.error,
      );
    } else {
      console.error(`Error loading ${modifiers.type}:`, error.message);
    }
  }
}

export async function fetchOpenJobData(modifiers, costType, signal) {
  try {
    const response = await axios.get(`${apiUrl}open-job-data`, {
      params: { ...modifiers, costType},
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

export async function changeUserRole(userId, newRole){
  try{
    const response = await axios.post(`${apiUrl}change-user-role`, { userId, newRole }, {
      ...ngrokHeaders,
    });
    return response;
  } catch (error) {
    console.error("Error initializing user", error);
  }
}

export async function initializeUserRole(userId){
  try{
    await axios.get(`${apiUrl}initialize-user?userId=${userId}`, 
    {
      ...ngrokHeaders,
    });
  } catch (error) {
    console.error("Error initializing user", error);
  }
}

export async function submitChangeOrder(changeObj) {
  try {
    const response = await axios.post(
      `${apiUrl}change-order`,
      changeObj,
      {
        ...ngrokHeaders,
      }
    );
    return response;
  } catch (error) {
    console.error("Error submitting change order", error);
  }
}

export async function sendChangeOrderEmail(changeObj) {
  try {
    const response = await axios.post(
      `${apiUrl}change-order/email`,
      changeObj,
      {
        ...ngrokHeaders,
      }
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
      }
    );
    return response;
  } catch (error) {
    console.log(error)
  }
}

export async function deleteRun(id) {
  try {
    const response = await axios.delete(
      `${apiUrl}report/cogs/${id}`,
      {
        ...ngrokHeaders,
      }
    );
    return response;
  } catch (error) {
    throw error;
  }
}


export async function patchRunItem(id, state) {
  try {
    const response = await axios.patch(
      `${apiUrl}report/cogs/run`,
      {
        id: id,
        state: Boolean(state),
      },
      {
        ...ngrokHeaders,
      }
    );
    return response;
  } catch (error) {
    throw error;
  }
}


export async function patchCostItem(id, state) {
  try {
    const response = await axios.patch(
      `${apiUrl}report/cogs/item`,
      {
        id: id,
        state: Boolean(state),
      },
      {
        ...ngrokHeaders,
      }
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
      }
    );
    return response;
  } catch (error) {
    throw error;
  }
}

export async function getReports(type){
  try {
    const response = await axios.get(
      `${apiUrl}report/${type}`,
      {
        ...ngrokHeaders,
      }
    );
    return response;
  } catch (error) {
    throw error;
  }
}

export async function getReport(type, id){
  try {
    const response = await axios.get(
      `${apiUrl}report/${type}/${id}`,
      {
        ...ngrokHeaders,
      }
    );
    return response;
  } catch (error) {
    throw error;
  }
}

export async function getLastRan(type){
  try {
    const response = await axios.get(
      `${apiUrl}last-ran/${type}`,
      {
        ...ngrokHeaders,
      }
    );
    return response;
  } catch (error) {
    throw error;
  }
}

export async function runReport(type){
  try {
    const response = await axios.post(
      `${apiUrl}report/${type}`,
      {user: Userfront.user.name},
      {
        ...ngrokHeaders,
      }
    );
    return response;
  } catch (error) {
    throw error;
  }
}
