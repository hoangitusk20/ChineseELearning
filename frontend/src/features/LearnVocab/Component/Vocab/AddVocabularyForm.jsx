import React, { useState } from "react";
import { Plus } from "lucide-react";
import { twMerge } from "tailwind-merge";

const AddVocabularyForm = ({ onAdd, className, word }) => {
  const [formData, setFormData] = useState({
    word: word,
    definition: "",
    example: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.word && formData.definition) {
      console.log(formData);
      onAdd(formData);
      setFormData({ word: "", definition: "", example: "" });
    } else {
      alert("Vui lòng điền đầy đủ thông tin");
    }
  };

  return (
    <div className="bg-white p-4 mb-2">
      <h2 className="text-xl font-bold mb-4 text-gray-800 flex items-center">
        <Plus className="w-5 h-5 mr-2" />
        Thêm Từ Vựng Mới
      </h2>
      <div>
        <div className={twMerge(`grid grid-cols-1 gap-4 `, className)}>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Từ mới
            </label>

            <input
              type="text"
              name="word"
              value={formData.word}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="Nhập từ tiếng Trung"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Định nghĩa
            </label>
            <input
              type="text"
              name="definition"
              value={formData.definition}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="Nhập nghĩa tiếng Việt"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Ví dụ
            </label>
            <input
              type="text"
              name="example"
              value={formData.example}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="Nhập câu ví dụ"
            />
          </div>
        </div>
        <div className="mt-4 flex justify-end">
          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-blue-600 text-sm text-white rounded-md hover:cursor-pointer hover:bg-blue-500 transition-colors flex items-center"
          >
            <Plus className="w-4 h-4 mr-1" />
            Thêm từ
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddVocabularyForm;
