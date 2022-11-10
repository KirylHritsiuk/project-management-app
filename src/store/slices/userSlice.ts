import { createSlice } from '@reduxjs/toolkit';
import { usersAPI } from 'api/usersApi';
import { UserStateType } from 'types/types';
import { RootState } from 'store/store';

const getInitialState = () => {
  const token = localStorage.getItem('token');
  if (token) {
    return {
      token: token,
      id: '',
      name: '',
      login: '',
      status: 'idle',
    };
  } else
    return {
      token: null,
      id: '',
      name: '',
      login: '',
      status: 'idle',
    };
};

const initialState: UserStateType = getInitialState();

export const authUserSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logout: () => {
      localStorage.removeItem('token');
      return initialState;
    },
  },
  extraReducers: (bulder) => {
    bulder
      .addMatcher(usersAPI.endpoints.loginUser.matchPending, (state) => {
        state.status = 'loading';
      })
      .addMatcher(usersAPI.endpoints.loginUser.matchFulfilled, (state, action) => {
        state.status = 'idle';
        state.token = action.payload.token;
        localStorage.setItem('token', action.payload.token);
      })
      .addMatcher(usersAPI.endpoints.loginUser.matchRejected, (state) => {
        state.status = 'failed';
      });
  },
});

export const selectAuth = (state: RootState) => state.user;

export const { logout } = authUserSlice.actions;

export default authUserSlice.reducer;
