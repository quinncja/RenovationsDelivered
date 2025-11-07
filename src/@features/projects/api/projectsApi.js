import axios from "axios";
import { apiUrl, ngrokHeaders } from "@core/utils/config";
import { toast } from "sonner";

export async function loadProjectList(signal) {
  try {
    const response = await axios.get(`${apiUrl}project-list`, {
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

export async function fetchProjectListData(joblist, signal) {
  try {
    const url = new URL(`${apiUrl}project-list-data`);

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

export async function fetchProjectPhaseData(job, signal) {
  try {
    const response = await axios.get(`${apiUrl}project-phase-data`, {
      params: { job: job },
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
      console.error(`Error loading project phase data:`, error.message);
    }
  }
}
