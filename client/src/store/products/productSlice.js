import { createSlice } from "@reduxjs/toolkit";
import * as actions from "../products/asyncProductsAction";
const initialState = {
  NewProducts: [],
  message : ''
};
const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(actions.getNewProducts.fulfilled, (state, action) => {
      state.NewProducts = action.payload;
    });
    builder.addCase(actions.getNewProducts.rejected, (state, action) => {
      state.NewProducts = [];
    });
  },
});

export default productSlice.reducer;
