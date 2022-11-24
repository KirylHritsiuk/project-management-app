import { api } from './api';
import { CreateUserType, GetUserType, LoginUserType } from 'types/types';

export const usersAPI = api.injectEndpoints({
  endpoints: (build) => ({
    createUser: build.mutation<GetUserType, CreateUserType>({
      query: (body) => ({
        url: 'auth/signup',
        method: 'POST',
        body,
      }),
      invalidatesTags: [{ type: 'users', id: 'LIST' }],
    }),
    loginUser: build.mutation<{ token: string }, LoginUserType>({
      query: (body) => ({
        url: 'auth/signin',
        method: 'POST',
        body,
      }),
      invalidatesTags: [{ type: 'users', id: 'LIST' }],
    }),
    deleteUser: build.mutation<string, { id: string }>({
      query: ({ id }) => ({
        url: `/users/${id}`,
        method: 'DELETE',
      }),
    }),
    getUsers: build.query<GetUserType[], string>({
      query: () => ({
        url: `/users`,
        method: 'GET',
      }),
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ _id }) => ({ type: 'users' as const, _id })),
              { type: 'users', id: 'LIST' },
            ]
          : [{ type: 'users', id: 'LIST' }],
    }),
    getUserById: build.query<GetUserType, { id: string }>({
      query: ({ id }) => ({
        url: `/users/${id}`,
        method: 'GET',
      }),
    }),
    updateUser: build.mutation<GetUserType, { id: string; body: Partial<CreateUserType> }>({
      query: ({ id, body }) => ({
        url: `/users/${id}`,
        method: 'PUT',
        body,
      }),
      invalidatesTags: [{ type: 'users', id: 'LIST' }],
    }),
  }),
});
