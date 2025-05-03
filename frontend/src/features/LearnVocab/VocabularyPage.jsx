import { fetchAllVocabThunk } from "@/shared/slices/VocabularySlice";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

const VocabularyPage = () => {
  const { id: listId } = useParams(); // id từ URL
  const navigate = useNavigate();

  const lists = useSelector((state) => state.vocabularyList.lists);

  useEffect(() => {
    console.log(lists);
    const listExists = lists.some((list) => list.id === listId);
    if (!listExists) {
      navigate("/404");
    }
  }, [listId, lists, navigate]);

  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const pageSize = 10;

  const vocabulary = useSelector(
    (state) => state.vocabulary.currentPageVocabulary
  );

  useEffect(() => {
    if (listId) {
      console.log(listId);
      dispatch(fetchAllVocabThunk({ listId, page, pageSize }));
    }
  }, [dispatch, listId, page]);
  return (
    <div>
      <ul>
        {vocabulary.map((word) => (
          <li key={word.id}>{word.word}</li>
        ))}
      </ul>
      {/* <Pagination page={page} setPage={setPage} /> */}
    </div>
  );
};

export default VocabularyPage;
