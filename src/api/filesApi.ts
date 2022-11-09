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
    downloadFile: build.query<string, { taskid: string; filename: string }>({
      query: ({ taskid, filename }) => ({
        url: `/files/${taskid}/${filename}`,
        method: 'GET',
      }),
    }),
  }),
});
