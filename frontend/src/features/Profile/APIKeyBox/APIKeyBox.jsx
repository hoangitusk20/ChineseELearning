// APIKeyBox.tsx
import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/components/ui/select";
import { Button } from "@/shared/components/ui/button";
import { useAPIKeyForm } from "./hooks/useAPIKeyBoxHandle";
import SelectProvider from "@/shared/components/SelectProvider";
const APIKeyBox = () => {
  const {
    isAddingKey,
    setIsAddingKey,
    provider,
    setProvider,
    APIKey,
    inputAPIKey,
    setInputAPIKey,
    handleDeleteKey,
    handleCreateAPIKey,
  } = useAPIKeyForm();

  return (
    <div className="mt-10 max-w-[800px] rounded-lg border shadow-lg mx-auto text-left p-4">
      <SelectProvider
        provider={provider}
        setProvider={setProvider}
        className="w-full my-2"
      />

      <div className="text-center">
        {isAddingKey ? (
          <>
            <input
              type="text"
              className="border rounded-lg w-full my-5 py-2 px-2"
              placeholder="Nhập API Key"
              value={inputAPIKey}
              onChange={(e) => setInputAPIKey(e.target.value)}
            />
            <Button className="mb-5" onClick={handleCreateAPIKey}>
              Đồng ý
            </Button>
          </>
        ) : (
          <>
            <p className="py-10 px-2 flex-grow">{APIKey}</p>
            {APIKey === "Chưa có API Key" ? (
              <Button className="mb-5" onClick={() => setIsAddingKey(true)}>
                Tạo mới API Key
              </Button>
            ) : (
              <Button className="mb-5" onClick={handleDeleteKey}>
                Xóa
              </Button>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default APIKeyBox;
