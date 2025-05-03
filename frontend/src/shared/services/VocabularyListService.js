import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export const createVocabularyList = async (
  accessToken,
  { name, description }
) => {
  try {
    const response = await axios.post(
      `${API_URL}vocabulary-lists`,
      { name, description },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error creating vocabulary list:", error);
    throw error;
  }
};

export const getAllVocabularyList = async (accessToken) => {
  try {
    const response = await axios.get(`${API_URL}vocabulary-lists`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching vocabulary list:", error);
    throw error;
  }
};

export const deleteVocabularyList = async (accessToken, listId) => {
  try {
    const response = await axios.delete(
      `${API_URL}vocabulary-lists/${listId}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error deleting vocabulary list:", error);
    throw error;
  }
};

export const updateVocabularyList = async (
  accessToken,
  listId,
  { name, description }
) => {
  try {
    const response = await axios.put(
      `${API_URL}vocabulary-lists/${listId}`,
      { name, description },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error updating vocabulary list:", error);
    throw error;
  }
};

export const getVocabularyListById = async (accessToken, listId) => {
  try {
    const response = await axios.get(`${API_URL}vocabulary-lists/${listId}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching vocabulary list by ID:", error);
    throw error;
  }
};
