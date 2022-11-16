import { api } from './api';
import { CreateTaskType, GetTaskType, TaskType, UpdateTaskType } from '../types/types';

export const tasksAPI = api.injectEndpoints({
  endpoints: (build) => ({
    createTask: build.mutation<GetTaskType, CreateTaskType>({
      query: ({ boardId, columnId, body }) => ({
        url: `/boards/${boardId}/columns/${columnId}/tasks`,
        method: 'POST',
        body,
      }),
    }),
    getTasks: build.query<TaskType[], { boardId: string; columnId: string }>({
      query: ({ boardId, columnId }) => ({
        url: `/boards/${boardId}/columns/${columnId}/tasks`,
        method: 'GET',
      }),
    }),
    deleteTask: build.mutation<string, { boardId: string; columnId: string; taskId: string }>({
      query: ({ boardId, columnId, taskId }) => ({
        url: `/boards/${boardId}/columns/${columnId}/tasks/${taskId}`,
        method: 'DELETE',
      }),
    }),
    updateTask: build.mutation<TaskType, UpdateTaskType>({
      query: ({ boardId, columnId, taskId, body }) => ({
        url: `/boards/${boardId}/columns/${columnId}/tasks/${taskId}`,
        method: 'PUT',
        body,
      }),
    }),
    getTaskById: build.query<TaskType, { boardId: string; columnId: string; taskId: string }>({
      query: ({ boardId, columnId, taskId }) => ({
        url: `/boards/${boardId}/columns/${columnId}/tasks/${taskId}`,
        method: 'GET',
      }),
    }),
  }),
});
