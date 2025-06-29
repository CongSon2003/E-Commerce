import { createAsyncThunk } from '@reduxjs/toolkit';
import * as axios from '../../apis';

export const getNewProducts = createAsyncThunk("producrs/getNewProducts", async (data,{ rejectWithValue }) => {
  const result = await axios.apigetProducts({sort : 'createdAt'});
  if (!result.success || !result) rejectWithValue(result) 
  return result.response;
})