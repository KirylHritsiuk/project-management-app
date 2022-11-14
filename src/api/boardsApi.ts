import { api } from './api';
import { BoardType, CreateBoardType, GetBoardType } from 'types/types';

export const boardsAPI = api.injectEndpoints({
  endpoints: (build) => ({
    createBoard: build.mutation<GetBoardType, CreateBoardType>({
      query: (body) => ({
        url: '/boards',
        method: 'POST',
        body,
      }),
      invalidatesTags: [{ type: 'boards', id: 'LIST' }],
    }),
    getBoards: build.query<GetBoardType[], string>({
      query: () => ({
        url: `/boards`,
        method: 'GET',
      }),
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ _id }) => ({ type: 'boards' as const, _id })),
              { type: 'boards', id: 'LIST' },
            ]
          : [{ type: 'boards', id: 'LIST' }],
    }),
    deleteBoard: build.mutation<string, { id: string }>({
      query: ({ id }) => ({
        url: `/boards/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: [{ type: 'boards', id: 'LIST' }],
    }),
    updateBoard: build.mutation<GetBoardType, { id: string; body: CreateBoardType }>({
      query: ({ id, body }) => ({
        url: `/boards/${id}`,
        method: 'PUT',
        body,
      }),
      invalidatesTags: [{ type: 'boards', id: 'LIST' }],
    }),
    getBoardById: build.query<BoardType, { id: string }>({
      query: ({ id }) => ({
        url: `/boards/${id}`,
        method: 'GET',
      }),
    }),
  }),
});
