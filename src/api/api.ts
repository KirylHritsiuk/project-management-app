import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { API_BASE_URL } from 'constants/constants';
import { RootState } from 'store/store';

const baseQuery = fetchBaseQuery({
  baseUrl: API_BASE_URL,
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).user.token;
    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
    }
    return headers;
  },
});

export const api = createApi({
  reducerPath: 'pmaAPI',
  tagTypes: ['boards', 'boardsSet', 'columns', 'tasks', 'users', 'main'],
  baseQuery: baseQuery,
  endpoints: () => ({}),
});
