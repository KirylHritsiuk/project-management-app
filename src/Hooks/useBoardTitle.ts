import { boardsAPI } from 'api/boardsApi';

export const useBoardTitle = (boardId: string) => {
  const { currentData, isLoading, isError, error } = boardsAPI.useGetBoardByIdQuery({
    boardId,
  });

  if (currentData && 'title' in currentData) {
    return {
      title: currentData.title,
      boardLoad: isLoading,
      boardIsError: isError,
      boardError: error,
    };
  } else if (error && 'status' in error) {
    if ((error.status as string) === '404' || error.status === 404) {
      return {
        title: '404',
        boardLoad: isLoading,
        boardIsError: isError,
        boardError: error,
      };
    }
  }
  return { title: '', boardLoad: isLoading, boardIsError: isError, boardError: error };
};
