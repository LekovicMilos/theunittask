import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Color } from '@/components/organisms/data-table';
const initialState: Color[] = [];

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
    addColor: (state, action: PayloadAction<Color>) => {
      const { name, hex } = action.payload;
      state.push({ name, hex });
      state.sort((a: Color, b: Color) => a.name.localeCompare(b.name)); // TODO: add right sorting
    },
    removeColor: (state, action: PayloadAction<string>) => {
      const name = action.payload;
      return state.filter((color: Color) => color.name !== name);
    },
  },
});

export const { addColors, addColor, removeColor } = colorsSlice.actions;
export default colorsSlice.reducer;
