import axios from "axios";
import { apiUrl, ngrokHeaders } from "@core/utils/config";
import { toast } from "sonner";

export async function fetchJobcostData(modifiers, signal) {
  try {
    const response = await axios.get(`${apiUrl}jobcost-data`, {
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
      throw error;
    } else {
      throw error;
    }
  }
}

export async function fetchJobcostItems(modifiers, costType, signal) {
  try {
    const response = await axios.get(`${apiUrl}jobcost-items`, {
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
      throw error;
    } else {
      throw error;
    }
  }
}

export async function fetchFileFromSMB(filePath, signal) {
  try {
    const encodedPath = encodeURIComponent(filePath);
    const url = `${apiUrl}file/${encodedPath}`;

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
