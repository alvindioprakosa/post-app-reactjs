import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from "@reduxjs/toolkit";
import axios from "axios";

// Async thunk untuk mengambil semua kategori
export const getAllCategory = createAsyncThunk(
  "category/getAllCategory",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("/categories");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Entity adapter untuk kategori
const categoryEntity = createEntityAdapter({
  selectId: (category) => category.id,
});

// Initial state termasuk loading & error
const initialState = categoryEntity.getInitialState({
  loading: false,
  error: null,
});

const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    resetCategories: (state) => {
      categoryEntity.removeAll(state);
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllCategory.fulfilled, (state, action) => {
        categoryEntity.setAll(state, action.payload);
        state.loading = false;
      })
      .addCase(getAllCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      });
  },
});

// Selector untuk memudahkan akses dari komponen
export const categorySelectors = categoryEntity.getSelectors(
  (state) => state.category
);

// Export actions dan reducer
export const { resetCategories } = categorySlice.actions;
export default categorySlice.reducer;
