import { createSlice } from '@reduxjs/toolkit';
import { boardsAPI } from 'api/boardsApi';
import { MAIN_FILTER } from 'constants/constants';
import { decodeToken } from 'react-jwt';
import { RootState } from 'store/store';
import { DecodedTokenType, GetBoardType } from 'types/types';

const token = localStorage.getItem('token');
const userFilter = localStorage.getItem(MAIN_FILTER);
let decodedToken;
if (token) {
  decodedToken = decodeToken<DecodedTokenType>(token);
}

interface Main {
  user: string | undefined | null;
  boards: GetBoardType[];
  searchInput: string;
}

const initialState: Main = {
  user: userFilter ?? decodedToken?.id,
  boards: [],
  searchInput: '',
};

export const mainSlice = createSlice({
  name: 'main',
  initialState,
  reducers: {
    updateUser: (state, action: { payload: { user: string | undefined | null } }) => {
      state.user = action.payload.user;
      if (action.payload.user) localStorage.setItem(MAIN_FILTER, action.payload.user);
      else {
        localStorage.removeItem(MAIN_FILTER);
      }
    },
    updateSearch: (state, action: { payload: string }) => {
      state.searchInput = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(boardsAPI.endpoints.getBoards.matchFulfilled, (state, action) => {
      state.boards = action.payload;
    });
  },
});

export const main = (state: RootState) => state.main;

export const { updateUser, updateSearch } = mainSlice.actions;

export default mainSlice.reducer;
