import {configureStore} from '@reduxjs/toolkit';
import authReducer from '../features/authSlice';
import itemReducer from '../features/itemSlice';
import reviewReducer from '../features/reviewSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    item: itemReducer,
    review: reviewReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({serializableCheck: false}),
});
