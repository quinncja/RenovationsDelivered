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
      console.error(`Error loading ${id}:`, error.message);
    }
  }
}

export async function fetchBudgetVSChartData(recnumsParam) {
  try {
    const response = await axios.get(
      `${apiUrl}cost-vs-budget?recnums=${recnumsParam}`,
      {
        ...ngrokHeaders,
      },
    );
    return response.data;
  } catch (error) {
    console.error("Error loading jobs:", error);
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

export async function testAPI() {
  try {
    const response = await axios({
      method: "get",
      url: apiUrl,
      headers: {
        "ngrok-skip-browser-warning": "true",
      },
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
}
