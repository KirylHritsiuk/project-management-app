import { ColumnType, GetColumnType, UpdateColumnType } from '../types/types';
import { api } from './api';

export const columnsAPI = api.injectEndpoints({
  endpoints: (build) => ({
    createColumn: build.mutation<
      GetColumnType,
      { boardId: string; body: { title: string; order: number } }
    >({
      query: ({ boardId, body }) => ({
        url: `/boards/${boardId}/columns`,
        method: 'POST',
        body,
      }),
      invalidatesTags: [
        { type: 'columns', id: 'LIST' },
        { type: 'columnsSet', id: 'LIST' },
      ],
    }),
    getColumns: build.query<GetColumnType[], { boardId: string }>({
      query: ({ boardId }) => ({
        url: `/boards/${boardId}/columns`,
        method: 'GET',
      }),
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ _id }) => ({ type: 'columns' as const, _id })),
              { type: 'columns', id: 'LIST' },
            ]
          : [{ type: 'columns', id: 'LIST' }],
    }),
    deleteColumn: build.mutation<string, { boardId: string; columnId: string }>({
      query: ({ boardId, columnId }) => ({
        url: `/boards/${boardId}/columns/${columnId}`,
        method: 'DELETE',
      }),
      invalidatesTags: [
        { type: 'columns', id: 'LIST' },
        { type: 'columnsSet', id: 'LIST' },
      ],
    }),
    updateColumn: build.mutation<GetColumnType, UpdateColumnType>({
      query: ({ boardId, columnId, body }) => ({
        url: `/boards/${boardId}/columns/${columnId}`,
        method: 'PUT',
        body,
      }),
      invalidatesTags: [
        { type: 'columns', id: 'LIST' },
        { type: 'columnsSet', id: 'LIST' },
      ],
    }),
    getColumnById: build.query<ColumnType, { boardId: string; columnId: string }>({
      query: ({ boardId, columnId }) => ({
        url: `/boards/${boardId}/columns/${columnId}`,
        method: 'GET',
      }),
    }),
  }),
});
