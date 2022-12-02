import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { isExpired } from 'react-jwt';
import { API_BASE_URL } from '../constants/constants';
import { RootState } from '../store/store';

const baseQuery = fetchBaseQuery({
  baseUrl: API_BASE_URL,
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).user.token;
    if (token && !isExpired(token)) {
      headers.set('Authorization', `Bearer ${token}`);
    }
    return headers;
  },
});

export const api = createApi({
  reducerPath: 'pmaAPI',
  tagTypes: [
    'boards',
    'boardsSet',
    'columns',
    'columnsSet',
    'tasks',
    'tasksSet',
    'users',
    'Board',
    'boardById',
  ],
  baseQuery: baseQuery,
  endpoints: () => ({}),
});
