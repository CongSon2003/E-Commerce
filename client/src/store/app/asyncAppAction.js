import { createAsyncThunk } from '@reduxjs/toolkit';
import * as axios from '../../apis';

export const getProductCategories = createAsyncThunk("app/getProductCategories", async (data, { rejectWithValue }) => {
  const result = await axios.apiGetProductCategories();
  if (!result || !result.success) {
    return rejectWithValue(result);
  }
  return result.response;
})
