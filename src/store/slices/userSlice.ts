import { createSlice } from '@reduxjs/toolkit';
import { usersAPI } from 'api/usersApi';
import { DecodedTokenType, UserStateType } from 'types/types';
import { RootState } from 'store/store';
import { decodeToken, isExpired } from 'react-jwt';
import { USER_TOKEN } from 'constants/constants';

const getInitialState = () => {
  const token = localStorage.getItem(USER_TOKEN);
  if (token && !isExpired(token)) {
    const decodedToken = decodeToken(token) as DecodedTokenType;
    return {
      isAuth: true,
      token: token,
      id: decodedToken!.id,
      name: '',
      login: decodedToken!.login,
      status: 'idle',
      users: null,
    };
  } else {
    localStorage.removeItem(USER_TOKEN);
    return {
      isAuth: false,
      token: null,
      id: '',
      name: '',
      login: '',
      status: 'idle',
      users: null,
    };
  }
};

const initialState: UserStateType = getInitialState();

export const authUserSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logout: () => {
      localStorage.removeItem(USER_TOKEN);
      return {
        isAuth: false,
        token: null,
        id: '',
        name: '',
        login: '',
        status: 'idle',
        users: null,
      };
    },
    editUser: (state, { payload }: { payload: { name: string; login: string } }) => {
      state.login = payload.login;
      state.name = payload.name;
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
        state.id = decodedToken!.id;
        state.login = decodedToken!.login;
        state.status = 'idle';
        localStorage.setItem('token', action.payload.token);
      })
      .addMatcher(usersAPI.endpoints.loginUser.matchRejected, (state) => {
        state.status = 'failed';
      })
      .addMatcher(usersAPI.endpoints.getUserById.matchPending, (state) => {
        state.status = 'loading';
      })
      .addMatcher(usersAPI.endpoints.getUserById.matchFulfilled, (state, action) => {
        state.name = action.payload.name;
        state.login = action.payload.login;
        state.status = 'idle';
      })
      .addMatcher(usersAPI.endpoints.getUserById.matchRejected, (state) => {
        state.status = 'failed';
      })
      .addMatcher(usersAPI.endpoints.deleteUser.matchPending, (state) => {
        state.status = 'loading';
      })
      .addMatcher(usersAPI.endpoints.deleteUser.matchFulfilled, (state) => {
        localStorage.removeItem(USER_TOKEN);
        state.isAuth = false;
        state.token = null;
        state.id = '';
        state.login = '';
        state.name = '';
        state.status = 'idle';
      })
      .addMatcher(usersAPI.endpoints.deleteUser.matchRejected, (state) => {
        state.status = 'failed';
      })
      .addMatcher(usersAPI.endpoints.getUsers.matchFulfilled, (state, action) => {
        state.users = action.payload;
      });
  },
});

export const authUser = (state: RootState) => state.user;

export const { logout, editUser } = authUserSlice.actions;

export default authUserSlice.reducer;
