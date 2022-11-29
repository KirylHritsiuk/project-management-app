import { api } from './api';
import {
  CreateTaskType,
  GetTaskType,
  ResponseSetTask,
  TaskType,
  UpdateSetType,
  UpdateTaskType,
} from '../types/types';

export const tasksAPI = api.injectEndpoints({
  endpoints: (build) => ({
    createTask: build.mutation<GetTaskType, CreateTaskType>({
      query: ({ boardId, columnId, body }) => ({
        url: `/boards/${boardId}/columns/${columnId}/tasks`,
        method: 'POST',
        body,
      }),
      invalidatesTags: [
        { type: 'tasks', id: 'LIST' },
        { type: 'tasksSet', id: 'LIST' },
      ],
    }),
    getTasks: build.query<TaskType[], { boardId: string; columnId: string }>({
      query: ({ boardId, columnId }) => ({
        url: `/boards/${boardId}/columns/${columnId}/tasks`,
        method: 'GET',
      }),
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ _id }) => ({ type: 'tasks' as const, _id })),
              { type: 'tasks', id: 'LIST' },
            ]
          : [{ type: 'tasks', id: 'LIST' }],
    }),
    deleteTask: build.mutation<string, { boardId: string; columnId: string; taskId: string }>({
      query: ({ boardId, columnId, taskId }) => ({
        url: `/boards/${boardId}/columns/${columnId}/tasks/${taskId}`,
        method: 'DELETE',
      }),
      invalidatesTags: [
        { type: 'tasks', id: 'LIST' },
        { type: 'tasksSet', id: 'LIST' },
      ],
    }),
    updateTask: build.mutation<TaskType, UpdateTaskType>({
      query: ({ boardId, columnId, taskId, body }) => ({
        url: `/boards/${boardId}/columns/${columnId}/tasks/${taskId}`,
        method: 'PUT',
        body,
      }),
      invalidatesTags: [
        { type: 'tasks', id: 'LIST' },
        { type: 'tasksSet', id: 'LIST' },
      ],
    }),
    getTaskById: build.query<TaskType, { boardId: string; columnId: string; taskId: string }>({
      query: ({ boardId, columnId, taskId }) => ({
        url: `/boards/${boardId}/columns/${columnId}/tasks/${taskId}`,
        method: 'GET',
      }),
    }),
    getAllUserTasks: build.query<TaskType[], { id: string }>({
      query: ({ id }) => ({
        url: `/tasksSet?userId=${id}`,
        method: 'GET',
      }),
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ _id }) => ({ type: 'tasksSet' as const, _id })),
              { type: 'tasksSet', id: 'LIST' },
            ]
          : [{ type: 'tasksSet', id: 'LIST' }],
    }),
    getSearchTasks: build.query<TaskType[], { search: string }>({
      query: ({ search }) => ({
        url: `/tasksSet?search=${search}`,
        method: 'GET',
      }),
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ _id }) => ({ type: 'tasksSet' as const, _id })),
              { type: 'tasksSet', id: 'LIST' },
            ]
          : [{ type: 'tasksSet', id: 'LIST' }],
    }),
    updateAllTasks: build.mutation<ResponseSetTask[], UpdateSetType[]>({
      query: (result) => ({
        url: `/tasksSet`,
        method: 'PATCH',
        body: [...result],
      }),
      invalidatesTags: [
        { type: 'tasks', id: 'LIST' },
        { type: 'tasksSet', id: 'LIST' },
      ],
    }),
  }),
});
