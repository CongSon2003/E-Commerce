import { createSlice } from "@reduxjs/toolkit";
import * as actions from "../user/asyncUserAction";
const initialState = {
  isLoggedIn : false,
  accessToken : null,
  currentUser : null,
  isLoading : false,
  currentCart : [],
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
    },
    updateCart: (state, action) => {
      const ArrayCart = JSON.parse(JSON.stringify(state.currentCart))
      state.currentCart = ArrayCart.map(item => {
        if (item._id === action.payload._id) {
          return {...item, quantity : action.payload.quantity, priceChanged: item.price * action.payload.quantity}
        }
        return item
      });
    }
  },
  extraReducers : (builder) => {
    builder.addCase(actions.getCurrentUser.pending, (state, action) => {
      state.isLoading = true;
    })
    builder.addCase(actions.getCurrentUser.fulfilled, (state, action) => {
      state.currentUser = action.payload;
      state.isLoading = false;
      state.isLoggedIn = action.payload ? true : false;
      state.currentCart = action.payload?.cart;
    })
    builder.addCase(actions.getCurrentUser.rejected, (state, action) => {
      state.isLoading = false;
      state.isLoggedIn = false;
      state.accessToken = null;
      state.currentUser = null;
    })
  }
})

export const { login, logout, updateCart } = userSlice.actions
export default userSlice.reducer;