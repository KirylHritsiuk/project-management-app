import { createSlice } from '@reduxjs/toolkit';
import { decodeToken } from 'react-jwt';
import { RootState } from 'store/store';
import { DecodedTokenType } from 'types/types';

const token = localStorage.getItem('token');
const userFilter = localStorage.getItem('userFilter');
let decodedToken;
if (token) {
  decodedToken = decodeToken<DecodedTokenType>(token);
}

interface Main {
  user: string | undefined | null;
}
const initialState: Main = {
  user: userFilter ?? decodedToken?.id,
};

export const mainSlice = createSlice({
  name: 'main',
  initialState,
  reducers: {
    updateUser: (state, action: { payload: Main }) => {
      state.user = action.payload.user;
      if (action.payload.user) localStorage.setItem('userFilter', action.payload.user);
      else {
        localStorage.removeItem('userFilter');
      }
    },
  },
});

export const main = (state: RootState) => state.main;

export const { updateUser } = mainSlice.actions;

export default mainSlice.reducer;
