import { boardsAPI } from 'api/boardsApi';
import { useEffect } from 'react';
import { useHandlingError } from './useHandlingError';

export const useBoardTitle = (boardId: string) => {
  const { data, currentData, isLoading, isError, error } = boardsAPI.useGetBoardByIdQuery({
    boardId,
  });
  const { catchError } = useHandlingError();

  useEffect(() => {
    console.log('title effect', error);
    if (error && 'error' in error) {
      catchError(error);
    }
  }, [error]);

  if (currentData && 'title' in currentData) {
    return { title: currentData.title, boardLoad: isLoading, boardError: isError };
  }
  return { title: undefined, boardLoad: isLoading, boardError: isError };
};
