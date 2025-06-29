import { createSlice } from "@reduxjs/toolkit";
import * as actions from "../user/asyncUserAction";
const initialState = {
  isLoggedIn : false,
  accessToken : null,
  currentUser : null,
  isLoading : false
}
export const userSlice =  createSlice({
  name : 'user',
  initialState,
  reducers : {
    login : (state, action) => {
      state.currentUser = action.payload.currentUser
      state.isLoggedIn = action.payload.isLoggedIn
      state.accessToken = action.payload.accessToken
    },
    logout: (state, action) => {
      state.isLoggedIn = false
      state.accessToken = null
      state.currentUser = null;
    }
  },
  extraReducers : (builder) => {
    builder.addCase(actions.getCurrentUser.pending, (state, action) => {
      state.isLoading = true;
    })
    builder.addCase(actions.getCurrentUser.fulfilled, (state, action) => {
      console.log(action);
      state.currentUser = action.payload;
      state.isLoading = false;
      state.isLoggedIn = action.payload ? true : false;
    })
    builder.addCase(actions.getCurrentUser.rejected, (state, action) => {
      console.log(action);
      state.isLoading = false;
      state.isLoggedIn = false;
      state.accessToken = null;
      state.currentUser = null;
    })
  }
})

export const { login, logout } = userSlice.actions
export default userSlice.reducer;