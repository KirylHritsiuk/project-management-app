import { boardsAPI } from 'api/boardsApi';
import { usersAPI } from 'api/usersApi';
import { useAppSelector } from './hooks';

export function useFilterBoards() {
  const [{ id }, { user }] = useAppSelector((state) => [state.user, state.main]);

  if (user && user !== 'all') {
    return {
      id,
      boards: boardsAPI.useGetBoardsSetByUserIdQuery(user),
      user,
      users: usersAPI.useGetUsersQuery(''),
    };
  } else if (user && user === 'all') {
    return {
      id,
      boards: boardsAPI.useGetBoardsQuery(''),
      user,
      users: usersAPI.useGetUsersQuery(''),
    };
  } else {
    return {
      id,
      boards: boardsAPI.useGetBoardsSetByUserIdQuery(id),
      user: id,
      users: usersAPI.useGetUsersQuery(''),
    };
  }
}
