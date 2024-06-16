import { createSlice } from "@reduxjs/toolkit";

export const eventIdSlice = createSlice({
  name: "eventId",
  initialState: { value: { eventId: "adbc" } },
  reducers: {
    setEventId: (state, action) => {
      state.value = action.payload;
    },
  },
});
export const { setEventId } = eventIdSlice.actions;
export default eventIdSlice.reducer;
