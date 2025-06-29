import { createAsyncThunk } from '@reduxjs/toolkit';
import * as axios from '../../apis';

export const getCurrentUser = createAsyncThunk("user/getCurrentUser", async (data,{ rejectWithValue }) => {
  const result = await axios.apiGetCurrentUser();
  if (!result.success) rejectWithValue(result) 
  return result.response;
})