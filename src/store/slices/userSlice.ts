import { createSlice } from '@reduxjs/toolkit';
import { usersAPI } from 'api/usersApi';
import { DecodedTokenType, UserStateType } from 'types/types';
import { RootState } from 'store/store';
import { decodeToken } from 'react-jwt';

const getInitialState = () => {
  const token = localStorage.getItem('token');
  if (token) {
    const decodedToken = decodeToken(token) as DecodedTokenType;
    return {
      isAuth: true,
      token: token,
      id: decodedToken!.userId,
      name: '',
      login: decodedToken!.login,
      status: 'idle',
    };
  } else
    return {
      isAuth: false,
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
      return {
        isAuth: false,
        token: null,
        id: '',
        name: '',
        login: '',
        status: 'idle',
      };
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(usersAPI.endpoints.createUser.matchPending, (state) => {
        state.status = 'loading';
      })
      .addMatcher(usersAPI.endpoints.createUser.matchRejected, (state) => {
        state.status = 'failed';
      })
      .addMatcher(usersAPI.endpoints.loginUser.matchPending, (state) => {
        state.status = 'loading';
      })
      .addMatcher(usersAPI.endpoints.loginUser.matchFulfilled, (state, action) => {
        const decodedToken: DecodedTokenType | null = decodeToken(action.payload.token);
        state.isAuth = true;
        state.token = action.payload.token;
        state.id = decodedToken!.userId;
        state.login = decodedToken!.login;
        state.status = 'idle';
        localStorage.setItem('token', action.payload.token);
      })
      .addMatcher(usersAPI.endpoints.loginUser.matchRejected, (state) => {
        state.status = 'failed';
      });
  },
});

export const authUser = (state: RootState) => state.user;

export const { logout } = authUserSlice.actions;

export default authUserSlice.reducer;
