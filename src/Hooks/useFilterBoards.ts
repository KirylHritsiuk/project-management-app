import { boardsAPI } from 'api/boardsApi';
import { usersAPI } from 'api/usersApi';
import { useAppSelector } from './hooks';

export function useFilterBoards() {
  const [{ id }, { user }] = useAppSelector((state) => [state.user, state.main]);
  const data = usersAPI.useGetUsersQuery('');
  console.log('users', data);
  if (user && user !== 'all') {
    return {
      id,
      boards: boardsAPI.useGetBoardsSetByUserIdQuery(user),
      user,
      users: data,
    };
  } else if (user && user === 'all') {
    return { id, boards: boardsAPI.useGetBoardsQuery(''), user, users: data };
  } else {
    return {
      id,
      boards: boardsAPI.useGetBoardsSetByUserIdQuery(id),
      user: id,
      users: data,
    };
  }
}
