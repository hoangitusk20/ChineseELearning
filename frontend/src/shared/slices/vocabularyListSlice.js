import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  createVocabularyList,
  getAllVocabularyList,
  getVocabularyListById,
  updateVocabularyList,
  deleteVocabularyList, // Đảm bảo có hàm delete riêng
} from "../services/VocabularyListService";

// Async thunk để lấy danh sách từ server
export const fetchAllVocabListsThunk = createAsyncThunk(
  "vocabularyList/fetchAllVocabLists",
  async (_, { getState, rejectWithValue }) => {
    try {
      const state = getState();
      const accessToken =
        state.auth.accessToken || localStorage.getItem("accessToken");
      const data = await getAllVocabularyList(accessToken);
      return data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const fetchVocabListByIdThunk = createAsyncThunk(
  "vocabularyList/fetchVocabListById",
  async (id, { getState, rejectWithValue }) => {
    try {
      const state = getState();
      const accessToken =
        state.auth.accessToken || localStorage.getItem("accessToken");
      const data = await getVocabularyListById(accessToken, id);
      return data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const createVocabularyListThunk = createAsyncThunk(
  "vocabularyList/createVocabularyList",
  async ({ name, description }, { getState, rejectWithValue }) => {
    try {
      const state = getState();
      const accessToken =
        state.auth.accessToken || localStorage.getItem("accessToken");
      const data = await createVocabularyList(accessToken, {
        name,
        description,
      });
      return data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const updateVocabularyListThunk = createAsyncThunk(
  "vocabularyList/updateVocabularyList",
  async ({ listId, name, description }, { getState, rejectWithValue }) => {
    try {
      const state = getState();
      const accessToken =
        state.auth.accessToken || localStorage.getItem("accessToken");
      const data = await updateVocabularyList(accessToken, listId, {
        name,
        description,
      });
      return data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const deleteVocabularyListThunk = createAsyncThunk(
  "vocabularyList/deleteVocabularyList",
  async (listId, { getState, rejectWithValue }) => {
    try {
      const state = getState();
      const accessToken =
        state.auth.accessToken || localStorage.getItem("accessToken");
      const data = await deleteVocabularyList(accessToken, listId); // Đổi thành gọi đúng hàm delete
      return data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

const vocabularyListSlice = createSlice({
  name: "vocabularyLists",
  initialState: {
    lists: [], // Dữ liệu danh sách
    loading: false, // Trạng thái loading
    error: null, // Lỗi nếu có
  },
  reducers: {}, // Bạn có thể thêm các reducer tùy chỉnh tại đây nếu cần

  extraReducers: (builder) => {
    builder
      // Fetch all vocab lists
      .addCase(fetchAllVocabListsThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllVocabListsThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.lists = action.payload; // Dữ liệu trả về từ server
      })
      .addCase(fetchAllVocabListsThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload; // Lỗi nếu có
      })

      // Fetch vocab list by ID
      .addCase(fetchVocabListByIdThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchVocabListByIdThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.lists = [action.payload]; // Lưu lại một phần tử duy nhất
      })
      .addCase(fetchVocabListByIdThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Create new vocabulary list
      .addCase(createVocabularyListThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createVocabularyListThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.lists.push(action.payload); // Thêm phần tử mới vào danh sách
      })
      .addCase(createVocabularyListThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Update existing vocabulary list
      .addCase(updateVocabularyListThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateVocabularyListThunk.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.lists.findIndex(
          (list) => list.id === action.payload.id
        );
        if (index !== -1) {
          state.lists[index] = action.payload; // Cập nhật phần tử trong danh sách
        }
      })
      .addCase(updateVocabularyListThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Delete vocabulary list
      .addCase(deleteVocabularyListThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteVocabularyListThunk.fulfilled, (state, action) => {
        state.loading = false;
        console.log(action.payload);
        state.lists = state.lists.filter(
          (list) => list.id !== action.payload.id
        ); // Xóa phần tử khỏi danh sách
      })
      .addCase(deleteVocabularyListThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default vocabularyListSlice.reducer;
