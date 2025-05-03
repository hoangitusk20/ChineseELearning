import { useEffect } from "react";
import CreateBox from "./Component/CreateBox";
// import vocabularyLists from "@/shared/Mockdata/VocabularyList";
import ListBox from "./Component/ListBox";
import Modal from "./Component/Modal";
import { useAddVocabModal } from "./hooks/useAddVocabModal";
import { useDispatch, useSelector } from "react-redux";
import {
  createVocabularyListThunk,
  deleteVocabularyListThunk,
  fetchAllVocabListsThunk,
  updateVocabularyListThunk,
} from "@/shared/slices/vocabularyListSlice";
const LearnVocabPage = () => {
  const modalSate = useAddVocabModal();
  const {
    lists: vocabularyLists,
    // loading,
    error,
  } = useSelector((state) => state.vocabularyList);
  const dispatch = useDispatch();
  const handleAddVocabular = async () => {
    dispatch(
      createVocabularyListThunk({
        name: modalSate.newVocabularyList.name,
        description: modalSate.newVocabularyList.description,
      })
    );
    modalSate.clearData();
    modalSate.closeModal();
  };

  const handleEdit = (updatedVocabulary) => {
    dispatch(updateVocabularyListThunk(updatedVocabulary));
  };

  const handleDelete = (id) => {
    dispatch(deleteVocabularyListThunk(id));
  };

  useEffect(() => {
    // Dispatch thunk để lấy tất cả các vocabulary list khi component mount
    dispatch(fetchAllVocabListsThunk());
  }, [dispatch]);

  // if (loading) {
  //   return <div>Loading...</div>;
  // }
  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="bg-white min-h-screen p-6">
      <h1 className="text-3xl font-bold text-gray-600 mb-6">
        Các bộ từ vựng đã tạo:
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <CreateBox handleModalOpen={modalSate.openModal} />

        {vocabularyLists.map((vocabularyList) => (
          <ListBox
            vocabulary={vocabularyList}
            key={vocabularyList.id}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
          />
        ))}
      </div>
      {modalSate.isModalOpen && (
        <Modal modalSate={modalSate} handleAddVocabulary={handleAddVocabular} />
      )}
    </div>
  );
};

export default LearnVocabPage;
