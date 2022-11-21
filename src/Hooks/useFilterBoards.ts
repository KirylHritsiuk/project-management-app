import { boardsAPI } from 'api/boardsApi';
import { usersAPI } from 'api/usersApi';

export function useFilterBoards(user: string | undefined, id: string) {
  if (user && user !== 'all') {
    return {
      boards: boardsAPI.useGetBoardsSetByUserIdQuery(user),
      user,
      users: usersAPI.useGetUsersQuery(''),
    };
  } else if (user && user === 'all') {
    return { boards: boardsAPI.useGetBoardsQuery(''), user, users: usersAPI.useGetUsersQuery('') };
  } else {
    return {
      boards: boardsAPI.useGetBoardsSetByUserIdQuery(id),
      user: id,
      users: usersAPI.useGetUsersQuery(''),
    };
  }
}
