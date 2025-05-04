import AddVocabularyForm from "@/features/LearnVocab/Component/Vocab/AddVocabularyForm";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { X } from "lucide-react";
import { createVocabularyThunk } from "../slices/VocabularySlice";
import { fetchAllVocabListsThunk } from "../slices/vocabularyListSlice";
import SelectBox from "./SelectBox";

const AddVocabModal = ({ word, ModalState, setModalState }) => {
  const { lists } = useSelector((state) => state.vocabularyList);
  const listNames = lists.map((list) => {
    return { value: list.id, display: list.name };
  });
  const [selectedList, setSelectedList] = useState(listNames[0]);
  const dispatch = useDispatch();
  useEffect(() => {
    if (lists.length == 0) {
      dispatch(fetchAllVocabListsThunk());
    }
  }, []);

  const handleAddVocab = (formData) => {
    dispatch(createVocabularyThunk({ listId: selectedList, ...formData }));
    setModalState(false);
  };

  return (
    <>
      {ModalState && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 text-md">
          <div className="w-xs md:w-md  p-4 bg-white rounded-md shadow-md relative text-md">
            <div className="px-4 ">
              <X
                className="absolute top-1 right-1  hover:bg-red-500 hover:text-white"
                onClick={() => setModalState(false)}
              />
              <h2 className="text-xl font-bold ">Chọn bộ từ vựng của bạn:</h2>
              <SelectBox
                valueDict={listNames}
                value={selectedList}
                setvalue={setSelectedList}
                placeholder={"Chọn bộ từ vựng"}
                className={"my-2 mb-5 text-sm"}
              />
            </div>
            <AddVocabularyForm
              className={"md:grid-cols-1 text-sm"}
              onAdd={handleAddVocab}
              word={word}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default AddVocabModal;
