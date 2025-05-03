import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

const VocabularyPage = () => {
  const { id } = useParams(); // id từ URL
  const navigate = useNavigate();

  const lists = useSelector((state) => state.vocabularyList.lists);

  useEffect(() => {
    console.log(lists);
    const listExists = lists.some((list) => list.id === id);
    if (!listExists) {
      navigate("/404");
    }
  }, [id, lists, navigate]);
  return <div>VocabularyPage</div>;
};

export default VocabularyPage;
