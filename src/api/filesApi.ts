import { api } from './api';

export const filesAPI = api.injectEndpoints({
  endpoints: (build) => ({
    uploadFile: build.mutation<string, { taskId: string; file: BinaryData }>({
      query: (body) => ({
        url: `/files`,
        method: 'POST',
        body,
      }),
    }),
    downloadFile: build.query<string, { taskId: string; filename: string }>({
      query: ({ taskId, filename }) => ({
        url: `/files/${taskId}/${filename}`,
        method: 'GET',
      }),
    }),
  }),
});
