import axios from "axios";
import { apiUrl, ngrokHeaders } from "./config";

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
    console.log(error)
    throw Error;
  }
}

export async function sendChangeOrderCreatedEmail(emailObj) {
  console.log(emailObj)
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
    console.log(error)
    throw Error;
  }
}
