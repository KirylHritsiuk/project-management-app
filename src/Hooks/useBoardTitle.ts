import { boardsAPI } from 'api/boardsApi';

export const useBoardTitle = (boardId: string) => {
  const { data, currentData, isLoading, isError } = boardsAPI.useGetBoardByIdQuery({ boardId });
  if (currentData && 'title' in currentData) {
    // console.log(currentData, data);
    return { title: currentData.title, boardLoad: isLoading, boardError: isError };
  }
  return { title: undefined, boardLoad: isLoading, boardError: isError };
};
