import type { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import {
  ColumnType,
  GetColumnType,
  ResponceUpdatedColumns,
  TaskType,
  UpdateColumnType,
  UpdatedAllColumns,
} from '../types/types';
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
    getBoard: build.query<GetColumnType[], { boardId: string }>({
      async queryFn(_arg, _queryApi, _extraOptions, fetchWithBQ) {
        const data = await fetchWithBQ(`/boards/${_arg.boardId}/columns`);
        if (data.error) return { error: data.error as FetchBaseQueryError };

        const columns = data.data as GetColumnType[];

        const promises = columns.map(async (column) => {
          return {
            ...column,
            items: (await fetchWithBQ(`/boards/${_arg.boardId}/columns/${column._id}/tasks`)).data,
          };
        });

        const result = await Promise.all(promises);
        result.sort((a: { order: number }, b: { order: number }) => a.order - b.order);
        result.map((columnTask) => {
          (columnTask.items as TaskType[]).sort(
            (a: { order: number }, b: { order: number }) => a.order - b.order
          );
        });
        return { data: result as GetColumnType[] };
      },
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ _id }) => ({ type: 'columns' as const, _id })),
              { type: 'columns', id: 'LIST' },
            ]
          : [{ type: 'columns', id: 'LIST' }],
    }),
    updateAllColumns: build.mutation<ResponceUpdatedColumns[], UpdatedAllColumns[]>({
      query: (result) => ({
        url: `/columnsSet`,
        method: 'PATCH',
        body: [...result],
      }),
      invalidatesTags: [
        { type: 'columns', id: 'LIST' },
        { type: 'columnsSet', id: 'LIST' },
      ],
    }),
  }),
});
