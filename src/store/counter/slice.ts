import { createSlice } from "@reduxjs/toolkit";
import { fetchCounter } from "./thunk";
export const counterSlice = createSlice({
  name: "counter",
  initialState: {
    value: 0,
  },
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
    incrementByAmount: (state, action) => {
      state.value += action.payload;
    },
  },
  extraReducers: (builders) => {
    builders
      .addCase(fetchCounter.pending, (state, action) => {
        state.value += 0;
      })
      .addCase(fetchCounter.fulfilled, (state, action) => {
        state.value += 2;
      })
      .addCase(fetchCounter.rejected, (state, action) => {
        state.value += 1;
      });
  },
});

const { increment, decrement, incrementByAmount } = counterSlice.actions;
export { fetchCounter, increment, decrement, incrementByAmount };

export const selectCount = (state: any) => state.counter.value;

export default counterSlice.reducer;
