import { api } from './api';
import { BoardType, CreateBoardType, ErrorResponseType, GetBoardType } from 'types/types';

export const boardsAPI = api.injectEndpoints({
  endpoints: (build) => ({
    createBoard: build.mutation<GetBoardType | ErrorResponseType, CreateBoardType>({
      query: (body) => ({
        url: '/boards',
        method: 'POST',
        body,
      }),
      invalidatesTags: [
        { type: 'boards', id: 'LIST' },
        { type: 'boardsSet', id: 'LIST' },
      ],
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

    deleteBoard: build.mutation<string, { boardId: string }>({
      query: ({ boardId }) => ({
        url: `/boards/${boardId}`,
        method: 'DELETE',
      }),
      invalidatesTags: [
        { type: 'boards', id: 'LIST' },
        { type: 'boardsSet', id: 'LIST' },
      ],
    }),

    updateBoard: build.mutation<
      GetBoardType | ErrorResponseType,
      { boardId: string; body: CreateBoardType }
    >({
      query: ({ boardId, body }) => ({
        url: `/boards/${boardId}`,
        method: 'PUT',
        body,
      }),
      invalidatesTags: [
        { type: 'boards', id: 'LIST' },
        { type: 'boardsSet', id: 'LIST' },
      ],
    }),

    getBoardById: build.query<BoardType | ErrorResponseType, { boardId: string }>({
      query: ({ boardId }) => ({
        url: `/boards/${boardId}`,
        method: 'GET',
      }),
      providesTags: (result) => (result ? [{ type: 'boardById' }] : [{ type: 'boardById' }]),
    }),

    getBoardsSet: build.query<GetBoardType[], { boardsId: string[] }>({
      query: ({ boardsId }) => ({
        url: `/boardsSet?ids=[${boardsId}]`,
        method: 'GET',
      }),
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ _id }) => ({ type: 'boardsSet' as const, _id })),
              { type: 'boardsSet', id: 'LIST' },
            ]
          : [{ type: 'boardsSet', id: 'LIST' }],
    }),

    getBoardsSetByUserId: build.query<GetBoardType[], string>({
      query: (id) => ({
        url: `/boardsSet/${id}`,
        method: 'GET',
      }),
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ _id }) => ({ type: 'boardsSet' as const, _id })),
              { type: 'boardsSet', id: 'LIST' },
            ]
          : [{ type: 'boardsSet', id: 'LIST' }],
    }),
  }),
});
