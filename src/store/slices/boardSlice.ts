export {};
import { createSlice } from '@reduxjs/toolkit';
import { ErrorResponseType, GetBoardType, GetColumnType } from 'types/types';
import { RootState } from 'store/store';
import { boardsAPI } from 'api/boardsApi';
import { columnsAPI } from 'api/columnsApi';

type InitialStateType = {
  status: 'idle' | 'loading' | 'failed';
  board: GetBoardType | ErrorResponseType | null;
  columns: GetColumnType[] | null;
};

const initialState: InitialStateType = {
  status: 'idle',
  board: null,
  columns: null,
};

export const boardSlice = createSlice({
  name: 'board',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addMatcher(boardsAPI.endpoints.getBoardById.matchPending, (state) => {
        state.status = 'loading';
      })
      .addMatcher(boardsAPI.endpoints.getBoardById.matchFulfilled, (state, action) => {
        state.status = 'idle';
        state.board = action.payload;
      })
      .addMatcher(boardsAPI.endpoints.getBoardById.matchRejected, (state) => {
        state.status = 'failed';
      })
      .addMatcher(columnsAPI.endpoints.getBoard.matchPending, (state) => {
        state.status = 'loading';
      })
      .addMatcher(columnsAPI.endpoints.getBoard.matchFulfilled, (state, action) => {
        state.status = 'idle';
        state.columns = action.payload;
      })
      .addMatcher(columnsAPI.endpoints.getBoard.matchRejected, (state) => {
        state.status = 'failed';
      });
  },
});

export const selectBoard = (state: RootState) => state.board;

// export const { } = boardsSlice.actions;

export default boardSlice.reducer;
