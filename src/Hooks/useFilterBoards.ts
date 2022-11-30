import { boardsAPI } from 'api/boardsApi';
import { usersAPI } from 'api/usersApi';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useAppSelector } from './hooks';
import { useNotification } from './useNotification';

export function useFilterBoards() {
  const [{ id }, { user }] = useAppSelector((state) => [state.user, state.main]);
  const data = usersAPI.useGetUsersQuery('');
  const { setShow } = useNotification();
  const { t } = useTranslation();
  console.log('users', data);

  useEffect(() => {
    if (data.error && 'status' in data.error) {
      console.log('usersAPI', data);
      const message = data.error.status as string;
      setShow((prev) => ({ ...prev, isShow: true, text: t(message), severity: 'error' }));
    }
  }, [data.isError]);

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
