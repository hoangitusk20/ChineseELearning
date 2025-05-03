import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  createVocabulary,
  deleteVocabulary,
  getAllVocabularyInPage,
  updateVocabulary,
} from "../services/VocabularyService";

// Async thunk để lấy danh sách từ server
export const fetchAllVocabThunk = createAsyncThunk(
  "vocabulary/fetchAllVocab",
  async ({ listId, page, pageSize }, { getState, rejectWithValue }) => {
    try {
      const state = getState();
      const accessToken =
        state.auth.accessToken || localStorage.getItem("accessToken");
      const data = await getAllVocabularyInPage(
        accessToken,
        page,
        pageSize,
        listId
      );
      return data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const createVocabularyThunk = createAsyncThunk(
  "vocabulary/createVocabulary",
  async (
    { listId, word, defenition, example },
    { getState, rejectWithValue }
  ) => {
    try {
      const state = getState();
      const accessToken =
        state.auth.accessToken || localStorage.getItem("accessToken");
      const data = await createVocabulary(accessToken, {
        listId,
        word,
        defenition,
        example,
      });
      return data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const updateVocabularyThunk = createAsyncThunk(
  "vocabulary/updateVocabulary",
  async (
    { listId, word, definition, example },
    { getState, rejectWithValue }
  ) => {
    try {
      const state = getState();
      const accessToken =
        state.auth.accessToken || localStorage.getItem("accessToken");
      const data = await updateVocabulary(accessToken, listId, {
        word,
        definition,
        example,
      });
      return data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const deleteVocabularyThunk = createAsyncThunk(
  "vocabulary/deleteVocabulary",
  async ({ listId, id }, { getState, rejectWithValue }) => {
    try {
      const state = getState();
      const accessToken =
        state.auth.accessToken || localStorage.getItem("accessToken");
      const data = await deleteVocabulary(accessToken, listId, id);
      return data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

const vocabularySlice = createSlice({
  name: "vocabulary",
  initialState: {
    currentPageVocabulary: [], // Dữ liệu danh sách
    totalVocabulary: 0,
    loading: false, // Trạng thái loading
    error: null, // Lỗi nếu có
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      //Fetch all vocabulary in page
      .addCase(fetchAllVocabThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllVocabThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.currentPageVocabulary = action.payload.storyList; // Dữ liệu trả về từ server
        state.totalVocabulary = action.payload.totalCount;
      })
      .addCase(fetchAllVocabThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload; // Lỗi nếu có
      })

      // Create Vocabulary
      .addCase(createVocabularyThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(createVocabularyThunk.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(createVocabularyThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload; // Lỗi nếu có
      })

      // Update Vocabulary
      .addCase(updateVocabularyThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateVocabulary.fulfilled, (state, action) => {
        const updated = action.payload;
        const index = state.items.findIndex((item) => item.id === updated.id);
        if (index !== -1) {
          state.items[index] = updated;
        }
      })
      .addCase(createVocabularyThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload; // Lỗi nếu có
      })

      //Delete Vocabulary
      .addCase(deleteVocabularyThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteVocabularyThunk.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(deleteVocabularyThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload; // Lỗi nếu có
      });
  },
});

export default vocabularySlice.reducer;
