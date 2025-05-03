import { useState } from "react";

export const useAddVocabModal = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newVocabularyList, setNewVocabularyList] = useState({
    name: "",
    description: "",
  });
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewVocabularyList((prev) => ({ ...prev, [name]: value }));
  };

  const closeModal = () => setIsModalOpen(false);
  const openModal = () => setIsModalOpen(true);
  const clearData = () => setNewVocabularyList({ name: "", description: "" });

  return {
    isModalOpen,
    setIsModalOpen,
    newVocabularyList,
    setNewVocabularyList,
    handleInputChange,
    closeModal,
    openModal,
    clearData,
  };
};
