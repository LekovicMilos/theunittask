import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: any = [];

const colorsSlice = createSlice({
  name: 'colors',
  initialState: initialState,
  reducers: {
    addColors: (state, action) => {
      if (Array.isArray(action.payload)) {
        state.push(...action.payload);
      } else {
        console.error('Payload must be an array');
      }
    },
    addColor: (state, action: PayloadAction<any>) => {
      const { name, hex } = action.payload;
      state.push({ name, hex });
      state.sort((a, b) => a.name.localeCompare(b.name)); // TODO: add right sorting
    },
    removeColor: (state, action: PayloadAction<any>) => {
      const name = action.payload;
      return state.filter((color: any) => color.name !== name);
    },
  },
});

export const { addColors, addColor, removeColor } = colorsSlice.actions;
export default colorsSlice.reducer;
