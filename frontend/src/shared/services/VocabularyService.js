import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export const createVocabulary = async (
  accessToken,
  { listId, word, definition, example }
) => {
  try {
    const response = await axios.post(
      `${API_URL}vocabulary-lists/${listId}/vocabularies`,
      { word, definition, example },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error creating vocabulary :", error);
    throw error;
  }
};

export const getAllVocabularyInPage = async (
  accessToken,
  page,
  pageSize,
  listId
) => {
  try {
    console.log("List Id from service: " + listId);
    const response = await axios.get(
      `${API_URL}vocabulary-lists/${listId}/vocabularies`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        params: {
          page,
          pageSize,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching vocabulary :", error);
    throw error;
  }
};

export const deleteVocabulary = async (accessToken, listId, id) => {
  try {
    const response = await axios.delete(
      `${API_URL}vocabulary-lists/${listId}/vocabularies/${id}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error deleting vocabulary :", error);
    throw error;
  }
};

export const updateVocabulary = async (
  accessToken,
  listId,
  id,
  { word, definition, example }
) => {
  try {
    const response = await axios.put(
      `${API_URL}vocabulary-lists/${listId}/vocabularies/${id}`,

      { word, definition, example },
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
