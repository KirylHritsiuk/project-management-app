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
    }),
    getBoards: build.query<GetBoardType[], string>({
      query: () => ({
        url: `/boards`,
        method: 'GET',
      }),
    }),
    deleteBoard: build.mutation<string, { id: string }>({
      query: ({ id }) => ({
        url: `/boards/${id}`,
        method: 'DELETE',
      }),
    }),
    updateBoard: build.mutation<GetBoardType, { id: string; body: CreateBoardType }>({
      query: ({ id, body }) => ({
        url: `/boards/${id}`,
        method: 'PUT',
        body,
      }),
    }),
    getBoardById: build.query<BoardType, { id: string }>({
      query: ({ id }) => ({
        url: `/boards/${id}`,
        method: 'GET',
      }),
    }),
  }),
});
