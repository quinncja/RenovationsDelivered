import axios from "axios";
import Userfront from "@userfront/toolkit/react";

const apiUrl = process.env.REACT_APP_API_URL;
const userApiUrl = `https://api.userfront.com/v0/users/${Userfront.user.userUuid}`;
const defaultHeaders = {
  headers: {
    Accept: "*/*",
    Authorization: `Bearer uf_test_admin_xbpwwqmn_12b172c3c811cde03adf090fd03e736d`,
  },
};

const ngrokHeaders = {
  headers: {
    'ngrok-skip-browser-warning': 'true',
    Authorization: `Bearer ${Userfront.tokens.accessToken}`,
  }
}

async function fetchCurrentUser() {
  try {
    const response = await axios.get(userApiUrl, defaultHeaders);
    return response.data.data;
  } catch (error) {
    console.error("Failed to fetch user data", error);
    throw new Error("Failed to fetch user data");
  }
}

async function updateUserSettings(update) {
  try {
    const currentUserData = await fetchCurrentUser();
    const updatedUserData = {
      ...currentUserData,
      ...update,
    };

    const response = await axios.put(
      userApiUrl,
      { data: updatedUserData },
      defaultHeaders,
    );
    return response.data;
  } catch (error) {
    console.error("Failed to update user settings", error);
    throw new Error("Failed to update user settings");
  }
}

export async function saveAppearance(appearance) {
  return await updateUserSettings({ appearance });
}

export async function saveColorScheme(colorScheme) {
  return await updateUserSettings({ colorScheme });
}

export async function saveItems(itemArray) {
  return await updateUserSettings({ itemArray });
}

export async function saveModifiers(itemModifiers) {
  return await updateUserSettings({ itemModifiers });
}

export async function savePageModifiers(pageModifiers) {
  return await updateUserSettings({ pageModifiers });
}

export async function saveSortSetting(smartSort) {
  return await updateUserSettings({ smartSort });
}

export async function saveLabelSettings(label) {
  return await updateUserSettings({ label });
}

export async function fetchUserData() {
  try {
    const response = await axios.get(userApiUrl, defaultHeaders);
    const userData = response.data;
    return userData.data;
  } catch (error) {
    console.error("Error loading user data:", error);
    throw new Error("Failed to load user data");
  }
}

export async function fetchChartData(modifiers) {
  try {
    const response = await axios.get(`${apiUrl}chart-data`, {
      params: { ...modifiers },
      ...ngrokHeaders,
    });
    return response.data;
  }  catch (error) {
    if (error.response && error.response.data && error.response.data.error) {
      console.error(`Error loading ${modifiers.type}:`, error.response.data.error);
    } else {
      console.error(`Error loading ${modifiers.type}:`, error.message);
    }
  }
}

export async function fetchJobList() {

  try {
    const response = await axios.get(`${apiUrl}job-list`, {
      ...ngrokHeaders
    });
    return response.data;
  } catch (error) {
    console.error("Error loading jobs:", error);
  }
}

export async function processTableData(data, type) {
    try {
      const response = await axios.post(`${apiUrl}process-table-data`, {
        data, 
        type,
        ...ngrokHeaders
      });
      return response.data;
    } catch (error) {
      console.error("Error loading revenue:", error);
    }
}

export async function testAPI(){
  try{ 
    const response = await axios({
      method: 'get',
      url: apiUrl,
      headers: {
        'ngrok-skip-browser-warning': 'true'
      }
    })
    return (response.data)
  } catch (error) {
    console.log(error)
  }
}

