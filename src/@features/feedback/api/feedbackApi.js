import axios from "axios";
import { apiUrl, ngrokHeaders } from "@core/utils/config";

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
