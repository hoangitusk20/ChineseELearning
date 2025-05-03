import axios from "axios";
const API_URL = import.meta.env.VITE_API_URL;

export const getUserAPIKey = async (accessToken) => {
  try {
    const response = await axios.get(`${API_URL}api-keys`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response;
  } catch (error) {
    console.error("Error fetching API key:", error);
    throw error;
  }
};

export const createAPIKey = async (accessToken, { key, serviceName }) => {
  try {
    const response = await axios.post(
      `${API_URL}api-keys`,
      { key, serviceName },
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      }
    );
    return response;
  } catch (error) {
    console.error("Error creating API key:", error);
    throw error;
  }
};

export const deleteAPIKey = async (accessToken, keyId) => {
  try {
    const response = await axios.delete(`${API_URL}api-keys/${keyId}`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    return response;
  } catch (error) {
    console.error("Error deleting API key:", error);
    throw error;
  }
};
