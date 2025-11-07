import axios from "axios";
import { apiUrl, ngrokHeaders } from "@core/utils/config";
import { toast } from "sonner";

export async function fetchDashboardData(signal) {
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

export async function fetchDashboardOpenData(modifiers, signal) {
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
