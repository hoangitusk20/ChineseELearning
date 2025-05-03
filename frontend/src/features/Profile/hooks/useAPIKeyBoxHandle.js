// useAPIKeyForm.ts
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  getUserAPIKey,
  createAPIKey,
  deleteAPIKey,
} from "@/shared/services/APIKeyService";

export const useAPIKeyForm = () => {
  const [isAddingKey, setIsAddingKey] = useState(false);
  const [provider, setProvider] = useState("");
  const [userAPIKeys, setUserAPIKey] = useState([]);
  const [APIKey, setAPIKey] = useState("Chưa có API Key");
  const [inputAPIKey, setInputAPIKey] = useState("");
  const { accessToken } = useSelector((state) => state.auth);

  const handleDeleteKey = async () => {
    const keyId = userAPIKeys.find((item) => item.serviceName === provider)?.id;
    if (keyId) {
      try {
        const response = await deleteAPIKey(accessToken, keyId);
        if (response.status === 200) {
          alert("Xóa API Key thành công");
          await fetchAPIKey();
        }
      } catch (error) {
        console.error("Error deleting API key:", error);
        alert("Xóa API Key không thành công, vui lòng thử lại sau");
      }
    } else {
      alert("Không tìm thấy API Key để xóa");
    }
  };

  const handleCreateAPIKey = async () => {
    setIsAddingKey(false);
    try {
      const response = await createAPIKey(accessToken, {
        key: inputAPIKey,
        serviceName: provider,
      });
      if (response.status === 200) {
        alert("Tạo API Key thành công");
        await fetchAPIKey();
      }
    } catch (error) {
      console.error("Error creating API key:", error);
      if (
        error.response?.data?.errors?.DTO?.includes(
          "The DTO field is required."
        )
      )
        alert("Chúng tôi chưa hỗ trợ sử dụng API Key cho dịch vụ này");
      else {
        alert("Tạo API Key không thành công, vui lòng thử lại sau");
      }
    }
    setInputAPIKey("");
  };
  const fetchAPIKey = async () => {
    try {
      const response = await getUserAPIKey(accessToken);
      if (response.status === 200) {
        console.log("API keys fetched successfully:", response.data);
        setUserAPIKey(response.data);
      }
    } catch (error) {
      console.log("Error fetching API key:", error);
      setUserAPIKey([]);
    }
  };
  useEffect(() => {
    fetchAPIKey();
  }, []);

  useEffect(() => {
    const apikey = userAPIKeys.find((item) => item.serviceName === provider);
    setAPIKey(apikey ? apikey.key : "Chưa có API Key");
  }, [provider, userAPIKeys]);

  return {
    isAddingKey,
    setIsAddingKey,
    provider,
    setProvider,
    APIKey,
    inputAPIKey,
    setInputAPIKey,
    handleDeleteKey,
    handleCreateAPIKey,
  };
};
