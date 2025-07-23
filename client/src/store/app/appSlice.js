import { createSlice } from "@reduxjs/toolkit";
import * as actions from "./asyncAppAction";
const initialState = {
  categories: [],
  isSuccess: false,
  message: "",
  isShowModel : 1,
  dataModel : null,
  wishListLocal : [],
  isShowRightCart : 1
};
export const appSlice = createSlice({
  name: "app",
  initialState,

  // Các action bình thường
  reducers: {
    showRightCart : (state, action) => {
      state.isShowRightCart = action.payload.isShowRightCart
    },
    showModal : (state, actions) => {
      state.isShowModel = actions.payload.isShowModel
      state.dataModel = actions.payload.dataModel
    },
    wishList : (state, actions) => {
      console.log(actions.payload);
      if (state.wishListLocal.length > 0) {
        const isCheck = state.wishListLocal.find(item => item._id === actions.payload._id);
        if (!isCheck) {
          state.wishListLocal.push(actions.payload);
        }
      } else {
        state.wishListLocal.push(actions.payload);
      }
    },
    removeWishList : (state, actions) => {
      if (state.wishListLocal.length > 0) {
        state.wishListLocal = state.wishListLocal.filter(item => item._id !== actions.payload._id);
      } else {
        state.wishListLocal = []
      }
    }

  },
  // Code logic xử lý async action
  extraReducers: (builder) => {
    builder.addCase(actions.getProductCategories.fulfilled, (state, action) => {
      // Khi action getProductCategories thành công
      // action.payload là dữ liệu trả về từ API
      state.isLoading = true;
      state.categories = action.payload;
    });
    builder.addCase(actions.getProductCategories.rejected, (state, action) => {
      // Khi action getProductCategories thất bại
      // action.payload là dữ liệu trả về từ API
      state.categories = [];
      state.isSuccess = false;
      state.message = action?.payload?.message || "Failed to fetch categories";
    });
  },
});

export const { showModal, wishList, removeWishList, showRightCart } = appSlice.actions;
export default appSlice.reducer;
