import { boardsAPI } from 'api/boardsApi';

export function useFilterBoards(user: string | undefined) {
  if (user && user !== 'all') {
    return { ...boardsAPI.useGetBoardsSetByUserIdQuery(user), user };
  } else if (user === 'all') {
    return { ...boardsAPI.useGetBoardsQuery(''), user };
  } else {
    return { ...boardsAPI.useGetBoardsQuery(''), user: 'all' };
  }
}
