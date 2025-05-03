import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export const generateStoryFromTopic = async (
  accessToken,
  { content, hskLevel, wordCount },
  provider
) => {
  try {
    const response = await axios.post(
      `${API_URL}generate-from-topic/${provider}`,
      { content, hskLevel, wordCount },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error generating story:", error);
    throw error;
  }
};
