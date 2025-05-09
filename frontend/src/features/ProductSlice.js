import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// Ambil semua produk
export const getProduct = createAsyncThunk(
  "product/getProduct",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("/products");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Ambil produk berdasarkan kategori
export const getProductByCategory = createAsyncThunk(
  "product/getProductByCategory",
  async (categoryId, { rejectWithValue }) => {
    try {
      const response = await axios.get(`/products?category_id=${categoryId}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

const initialState = {
  all: [], // semua produk
  filtered: [], // produk hasil filter kategori
  loading: false,
  error: null,
};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    resetFiltered: (state) => {
      state.filtered = [];
    },
  },
  extraReducers: (builder) => {
    builder
      // getProduct
      .addCase(getProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getProduct.fulfilled, (state, action) => {
        state.all = action.payload;
        state.loading = false;
      })
      .addCase(getProduct.rejected, (state, action) => {
        state.error = action.payload || action.error.message;
        state.loading = false;
      })
      // getProductByCategory
      .addCase(getProductByCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getProductByCategory.fulfilled, (state, action) => {
        state.filtered = action.payload;
        state.loading = false;
      })
      .addCase(getProductByCategory.rejected, (state, action) => {
        state.error = action.payload || action.error.message;
        state.loading = false;
      });
  },
});

export const { resetFiltered } = productSlice.actions;
export default productSlice.reducer;
