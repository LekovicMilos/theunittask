import { configureStore } from '@reduxjs/toolkit';
import colorsSlice from './slices/colorsSlice';

export const store = configureStore({
  reducer: {
    colors: colorsSlice,
  },
});
