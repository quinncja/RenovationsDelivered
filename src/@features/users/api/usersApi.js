import axios from "axios";
import { apiUrl, ngrokHeaders } from "@core/utils/config";

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

export async function changeUserRole(userId, newRole) {
  try {
    const response = await axios.post(
      `${apiUrl}user-role`,
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
