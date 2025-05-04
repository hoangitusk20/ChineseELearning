import React, { useState } from "react";
import { Pencil, Trash2, Check, X } from "lucide-react";
import { useNavigate } from "react-router-dom";

const ListBox = ({ vocabulary, handleEdit, handleDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState(vocabulary.name);
  const navigate = useNavigate();
  const [editedDescription, setEditedDescription] = useState(
    vocabulary.description
  );

  const handleSave = () => {
    setIsEditing(false);
    if (
      editedName !== vocabulary.name ||
      editedDescription !== vocabulary.description
    ) {
      handleEdit({
        listId: vocabulary.id,
        name: editedName,
        description: editedDescription,
      });
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditedName(vocabulary.name);
    setEditedDescription(vocabulary.description);
  };
  const handleCardClick = () => {
    if (!isEditing) {
      navigate(`/pratice-vocabulary/${vocabulary.id}`);
    }
  };

  return (
    <div
      onClick={handleCardClick}
      className="bg-white shadow-md rounded-lg p-4 flex flex-col"
    >
      <div className="flex justify-between items-start">
        <div className="flex-1">
          {isEditing ? (
            <>
              <input
                type="text"
                value={editedName}
                onChange={(e) => setEditedName(e.target.value)}
                className="text-xl font-semibold text-gray-800 mb-1 w-full border-b border-gray-300 focus:outline-none focus:border-blue-500"
              />
              <textarea
                value={editedDescription}
                onChange={(e) => setEditedDescription(e.target.value)}
                className="text-gray-600 mb-2 w-full resize-none border-b border-gray-300 focus:outline-none focus:border-blue-500"
                rows={2}
              />
            </>
          ) : (
            <>
              <h2 className="text-xl font-semibold text-gray-800 mb-1">
                {vocabulary.name}
              </h2>
              <p className="text-gray-600 mb-2">{vocabulary.description}</p>
            </>
          )}
        </div>
        <div className="flex space-x-2 ml-2">
          {isEditing ? (
            <>
              <button
                onClick={handleSave}
                className="p-2 text-green-500 hover:text-green-700 transition-colors"
                title="Lưu"
              >
                <Check size={18} />
              </button>
              <button
                onClick={handleCancel}
                className="p-2 text-gray-500 hover:text-gray-700 transition-colors"
                title="Hủy"
              >
                <X size={18} />
              </button>
            </>
          ) : (
            <>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  setIsEditing(true);
                }}
                className="p-2 text-blue-500 hover:text-blue-700 transition-colors"
                title="Chỉnh sửa"
              >
                <Pencil size={18} />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  const confirmDelete = window.confirm(
                    "Bạn có chắc chắn muốn xóa phần list này"
                  );
                  if (confirmDelete) {
                    handleDelete(vocabulary.id);
                  }
                }}
                className="p-2 text-red-500 hover:text-red-700 transition-colors"
                title="Xóa"
              >
                <Trash2 size={18} />
              </button>
            </>
          )}
        </div>
      </div>
      <p className="text-gray-500 text-sm mt-2">
        Ngày tạo: {new Date(vocabulary.createdAt).toLocaleDateString()}
      </p>
    </div>
  );
};

export default ListBox;
