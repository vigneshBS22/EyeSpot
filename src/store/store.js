import {configureStore} from '@reduxjs/toolkit';
import authReducer from './authSlice';
import itemReducer from './itemSlice';
import reviewReducer from './reviewSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    item: itemReducer,
    review: reviewReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({serializableCheck: false}),
});
