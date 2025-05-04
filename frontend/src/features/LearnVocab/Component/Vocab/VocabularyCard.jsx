import React, { useState } from "react";
import { Trash2, Edit, Save, X } from "lucide-react";
import { formatDate } from "@/shared/Utils";

const VocabularyCard = ({ vocabulary, onEdit, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    word: vocabulary.word,
    definition: vocabulary.definition,
    example: vocabulary.example,
  });

  const handleChange = (e) => {
    setEditData({
      ...editData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = () => {
    onEdit(vocabulary.id, editData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditData({
      word: vocabulary.word,
      definition: vocabulary.definition,
      example: vocabulary.example,
    });
    setIsEditing(false);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow">
      {isEditing ? (
        <div className="space-y-3">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Từ mới
            </label>
            <input
              type="text"
              name="word"
              value={editData.word}
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
              value={editData.definition}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="Nhập nghĩa tiếng Việt"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Ví dụ
            </label>
            <textarea
              name="example"
              value={editData.example}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="Nhập câu ví dụ"
              rows="2"
            />
          </div>
          <div className="flex justify-end space-x-2 mt-2">
            <button
              onClick={handleCancel}
              className="px-3 py-1 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors flex items-center"
            >
              <X className="w-4 h-4 mr-1" />
              Hủy
            </button>
            <button
              onClick={handleSave}
              className="px-3 py-1 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors flex items-center"
            >
              <Save className="w-4 h-4 mr-1" />
              Lưu
            </button>
          </div>
        </div>
      ) : (
        <>
          <div className="flex justify-between">
            <h3 className="text-xl font-bold text-gray-800">
              {vocabulary.word}
            </h3>
            <div className="flex space-x-2">
              <button
                onClick={() => setIsEditing(true)}
                className="p-1 text-blue-600 hover:text-blue-800 transition-colors"
                title="Sửa"
              >
                <Edit className="w-5 h-5" />
              </button>
              <button
                onClick={() => onDelete(vocabulary.id)}
                className="p-1 text-red-600 hover:text-red-800 transition-colors"
                title="Xóa"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            </div>
          </div>
          <p className="text-gray-700 font-medium mt-2">
            {vocabulary.definition}
          </p>
          {vocabulary.example && (
            <p className="text-gray-600 italic mt-2 text-sm">
              {vocabulary.example}
            </p>
          )}
          <div className="text-xs text-gray-500 mt-3 flex justify-between">
            <span>Ngày tạo: {formatDate(vocabulary.createdAt)}</span>
            {vocabulary.updatedAt !== "0001-01-01T00:00:00" && (
              <span>Cập nhật: {formatDate(vocabulary.updatedAt)}</span>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default VocabularyCard;
