import React from "react";

const Modal = ({ modalSate, handleAddVocabulary }) => {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
        <h2 className="text-xl font-bold text-gray-700 mb-4">
          Tạo mới danh sách từ vựng
        </h2>
        <input
          type="text"
          name="name"
          value={modalSate.newVocabularyList.name}
          onChange={modalSate.handleInputChange}
          placeholder="Tên danh sách"
          className="w-full p-2 border rounded-lg mb-4"
        />
        <textarea
          name="description"
          value={modalSate.newVocabularyList.description}
          onChange={modalSate.handleInputChange}
          placeholder="Mô tả"
          className="w-full p-2 border rounded-lg mb-4"
          rows="3"
        ></textarea>
        <div className="flex justify-end gap-4">
          <button
            onClick={modalSate.closeModal}
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition"
          >
            Hủy
          </button>
          <button
            onClick={handleAddVocabulary}
            className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition"
          >
            Thêm
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
