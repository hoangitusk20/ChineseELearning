// src/shared/store.js
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import VocabularyListSlice from "./slices/vocabularyListSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    vocabularyList: VocabularyListSlice,
  },
});

export default store;
