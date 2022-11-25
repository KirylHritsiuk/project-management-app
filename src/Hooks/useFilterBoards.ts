import { boardsAPI } from 'api/boardsApi';
import { usersAPI } from 'api/usersApi';

export function useFilterBoards(user: string | undefined, id: string) {
  const data = usersAPI.useGetUsersQuery('');
  if (user && user !== 'all') {
    return {
      boards: boardsAPI.useGetBoardsSetByUserIdQuery(user),
      user,
      users: data,
    };
  } else if (user && user === 'all') {
    return { boards: boardsAPI.useGetBoardsQuery(''), user, users: data };
  } else {
    // if (!data.data?.find((user) => user._id === id)) data.refetch();
    return {
      boards: boardsAPI.useGetBoardsSetByUserIdQuery(id),
      user: id,
      users: data,
    };
  }
}
