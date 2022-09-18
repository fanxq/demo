import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: '',
};

export const tokenSlice = createSlice({
    name: 'token',
    initialState,
    reducers: {
      update: (state, action) => {
        state.value = action.payload;
      },
    },
  });
  
  export const { update } = tokenSlice.actions;
  
  export default tokenSlice.reducer;