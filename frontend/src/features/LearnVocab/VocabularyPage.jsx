import NotFoundPage from "@/shared/NotFoundPage";
import { fetchAllVocabThunk } from "@/shared/slices/VocabularySlice";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import mockVocabularyData from "../../shared/Mockdata/Vocabularies";
import AddVocabularyForm from "./Component/Vocab/AddVocabularyForm";
import VocabularyCard from "./Component/Vocab/VocabularyCard";
import Pagination from "./Component/Vocab/Pagination";
import { formatDate } from "@/shared/Utils";

const VocabularyPage = () => {
  const { id: listId } = useParams(); // id từ URL
  const dispatch = useDispatch();
  const pageSize = 10;

  const { currentListInfo: listInfo } = useSelector(
    (state) => state.vocabulary
  );

  const [vocabularies, setVocabularies] = useState(
    mockVocabularyData.storyList
  );

  const {
    currentPageVocabulary: currentVocabularies,
    loading,
    totalVocabulary,
  } = useSelector((state) => state.vocabulary);

  // Tính toán số trang

  // const [totalCount, setTotalCount] = useState(mockVocabularyData.totalCount);
  const [totalCount, setTotalCount] = useState(totalVocabulary);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;

  const totalPages = Math.ceil(totalCount / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, totalCount);

  // // Lấy danh sách từ vựng cho trang hiện tại

  // const currentVocabularies = vocabularies.slice(startIndex, endIndex);

  useEffect(() => {
    if (listId) {
      dispatch(fetchAllVocabThunk({ listId, currentPage, pageSize }));
    }
  }, [dispatch, listId, currentPage]);

  // Thêm từ vựng mới
  const handleAddVocabulary = (newVocabulary) => {
    setVocabularies([newVocabulary, ...vocabularies]);
    setTotalCount(totalCount + 1);
  };

  // Cập nhật từ vựng
  const handleEditVocabulary = (id, updatedData) => {
    setVocabularies(
      vocabularies.map((vocab) => {
        if (vocab.id === id) {
          return {
            ...vocab,
            ...updatedData,
            updatedAt: new Date().toISOString(),
          };
        }
        return vocab;
      })
    );
  };

  // Xóa từ vựng
  const handleDeleteVocabulary = (id) => {
    setVocabularies(vocabularies.filter((vocab) => vocab.id !== id));
    setTotalCount(totalCount - 1);
  };

  // Thay đổi trang
  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <>
      {loading ? (
        <p className="min-h-screen">Loading...</p>
      ) : currentVocabularies.length === 0 ? (
        <NotFoundPage />
      ) : (
        <div className="container mx-auto px-4 py-8 max-w-6xl">
          <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">
            Danh sách từ vựng đã tạo
          </h1>
          <p className="text-center pt-2">Bộ từ vựng: {listInfo?.name}</p>
          <p className="text-center pb-2">
            Ngày tạo: {formatDate(listInfo.createdAt, false)}
          </p>

          {/* Form thêm từ vựng */}
          <AddVocabularyForm onAdd={handleAddVocabulary} />

          {/* Thông tin số lượng */}
          <div className="flex justify-between items-center mb-4">
            <p className="text-gray-600">
              Hiển thị {startIndex + 1}-{endIndex} trong số {totalCount} từ vựng
            </p>
          </div>

          {/* Danh sách từ vựng */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
            {currentVocabularies.map((vocabulary) => (
              <VocabularyCard
                key={vocabulary.id}
                vocabulary={vocabulary}
                onEdit={handleEditVocabulary}
                onDelete={handleDeleteVocabulary}
              />
            ))}
          </div>

          {/* Không có từ vựng */}
          {currentVocabularies.length === 0 && (
            <div className="text-center py-10">
              <p className="text-gray-500">
                Không có từ vựng nào. Hãy thêm từ vựng mới.
              </p>
            </div>
          )}

          {/* Phân trang */}
          {totalPages > 1 && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          )}
        </div>
      )}
    </>
  );
};

export default VocabularyPage;
