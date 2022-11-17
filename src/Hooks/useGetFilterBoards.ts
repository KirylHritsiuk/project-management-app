import { boardsAPI } from 'api/boardsApi';

export function getFilterBoards(user: string | undefined) {
  if (user && user !== 'all') {
    return { ...boardsAPI.useGetBoardsSetByUserIdQuery(user), user };
  }
  return { ...boardsAPI.useGetBoardsQuery(''), user };
}
