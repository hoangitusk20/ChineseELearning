import React from "react";
import { Plus } from "lucide-react";

const CreateBox = ({ handleModalOpen }) => {
  return (
    <div
      onClick={handleModalOpen}
      className="flex flex-col items-center justify-center bg-gray-100 shadow-md rounded-lg p-6 cursor-pointer hover:bg-gray-200 transition"
    >
      <Plus className="text-primary" size={32} />
      <p className="text-primary font-semibold mt-2">Tạo list từ</p>
    </div>
  );
};

export default CreateBox;
