// src/shared/store.js
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import VocabularyListReducer from "./slices/vocabularyListSlice";
import VocabularyReducer from "./slices/VocabularySlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    vocabularyList: VocabularyListReducer,
    vocabulary: VocabularyReducer,
  },
});

export default store;
