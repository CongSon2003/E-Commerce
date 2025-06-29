import { createSlice } from "@reduxjs/toolkit";
import * as actions from "./asyncAppAction";
const initialState = {
  categories: [],
  isSuccess: false,
  message: "",
  isShowModel : false,
  dataModel : null
};
export const appSlice = createSlice({
  name: "app",
  initialState,

  // Các action bình thường
  reducers: {
    showModal : (state, actions) => {
      state.isShowModel = actions.payload.isShowModel
      state.dataModel = actions.payload.dataModel
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

export const { showModal } = appSlice.actions;
export default appSlice.reducer;
