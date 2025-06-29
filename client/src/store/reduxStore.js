import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./user/userSlice";
import appSlice from "./app/appSlice";
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web
import productsSlice from "./products/productSlice";
const persistConfig = {
  key : 'user',
  storage,
}
export const store = configureStore({
  reducer: {
    appReducer: appSlice,
    productsReducer : productsSlice,
    userReducer : persistReducer(persistConfig, userSlice)
  },
  // Working with Non-Serializable Data
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
  }),
});

export const persistor = persistStore(store)
