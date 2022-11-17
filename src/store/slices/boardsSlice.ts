export {};
// import { createSlice } from '@reduxjs/toolkit';
// import { GetBoardType } from 'types/types';
// import { RootState } from 'store/store';
// import { boardsAPI } from 'api/boardsApi';

// const initialState: GetBoardType[] = [];

// export const boardsSlice = createSlice({
//   name: 'boards',
//   initialState,
//   reducers: {
//     removeBoards: () => {
//       return initialState;
//     },
//   },
//   extraReducers: (builder) => {
//     // builder.addCase(boardsAPI.endpoints.getBoards.matchFulfilled, (state, action) => {
//     //   state.push(action),
//     // });
//   },
// });

// export const selectBoards = (state: RootState) => state.boards;

// export const { removeBoards } = boardsSlice.actions;

// export default boardsSlice.reducer;
