import { createSlice } from '@reduxjs/toolkit';
import { decodeToken } from 'react-jwt';
import { RootState } from 'store/store';
import { DecodedTokenType, GetUserType } from 'types/types';

const token = localStorage.getItem('token');
let decodedToken;
if (token) {
  decodedToken = decodeToken<DecodedTokenType>(token);
}

interface Main {
  user: string | undefined;
}
const initialState: Main = {
  user: decodedToken?.id,
};

export const mainSlice = createSlice({
  name: 'main',
  initialState,
  reducers: {
    updateUser: (state, { payload }: { payload: Main }) => {
      state.user = payload.user;
    },
  },
});

export const main = (state: RootState) => state.main;

export const { updateUser } = mainSlice.actions;

export default mainSlice.reducer;
