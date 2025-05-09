import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// Get all cart data
export const getCart = createAsyncThunk("cart/getCart", async () => {
  const response = await axios.get("/carts");
  return response.data;
});

// Add to cart
export const inputCart = createAsyncThunk("cart/inputCart", async (data) => {
  await axios.post("/carts", data);
  const response = await axios.get("/carts");
  return response.data;
});

// Update cart item
export const updateCart = createAsyncThunk("cart/updateCart", async (data) => {
  await axios.put(`/carts/${data.id}`, data);
  const response = await axios.get("/carts");
  return response.data;
});

// Delete cart item
export const delCart = createAsyncThunk("cart/delCart", async (id) => {
  await axios.delete(`/carts/${id}`);
  const response = await axios.get("/carts");
  return response.data;
});

// Update cart quantity and total price
export const updCart = createAsyncThunk("cart/updCart", async (data) => {
  data.totalPrice = data.qty * data.price;
  await axios.put(`/carts/${data.id}`, data);
  const response = await axios.get("/carts");
  return response.data;
});

// Save order and clear cart
export const saveOrder = createAsyncThunk("cart/saveOrder", async (data) => {
  await axios.post("/orders", data);

  const cart = await axios.get("/carts");
  await Promise.all(
    cart.data.map(async (item) => {
      try {
        await axios.delete(`/carts/${item.id}`);
      } catch (error) {
        console.error("Failed to delete item", item.id);
      }
    })
  );

  const response = await axios.get("/carts");
  return response.data;
});

// Set data detail (for editing)
export const setDetail = createAsyncThunk("cart/setDetail", async (data) => {
  return data;
});

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    data: null,
    loading: false,
    error: null,
    dataEdit: null,
  },
  reducers: {
    resetCartError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // GET CART
      .addCase(getCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getCart.fulfilled, (state, action) => {
        state.data = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(getCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // INPUT CART
      .addCase(inputCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(inputCart.fulfilled, (state, action) => {
        state.data = action.payload;
        state.loading = false;
      })
      .addCase(inputCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // UPDATE CART
      .addCase(updateCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateCart.fulfilled, (state, action) => {
        state.data = action.payload;
        state.loading = false;
      })
      .addCase(updateCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // DELETE CART
      .addCase(delCart.fulfilled, (state, action) => {
        state.data = action.payload;
      })
      .addCase(delCart.rejected, (state, action) => {
        state.error = action.error.message;
      })

      // UPD CART
      .addCase(updCart.fulfilled, (state, action) => {
        state.data = action.payload;
      })
      .addCase(updCart.rejected, (state, action) => {
        state.error = action.error.message;
      })

      // SAVE ORDER
      .addCase(saveOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(saveOrder.fulfilled, (state, action) => {
        state.data = action.payload;
        state.loading = false;
      })
      .addCase(saveOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // SET DETAIL
      .addCase(setDetail.fulfilled, (state, action) => {
        state.dataEdit = action.payload;
      });
  },
});

export const { resetCartError } = cartSlice.actions;
export default cartSlice.reducer;
