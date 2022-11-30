import { GetUserType } from 'types/types';
import { usersAPI } from 'api/usersApi';
import { useNotification } from './useNotification';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

export function useGetUserFromId(id: string, usersInBoard: string[]) {
  const { t } = useTranslation();
  const { data: users, error } = usersAPI.useGetUsersQuery('');
  const data = usersAPI.useGetUsersQuery('');
  const { setShow } = useNotification();

  // useEffect(() => {
  //   if (error && 'status' in error) {
  //     console.log('usersAPI', data);
  //     const message = error.status as string;
  //     setShow((prev) => ({ ...prev, isShow: true, text: t(message), severity: 'error' }));
  //   }
  // }, [error]);

  const getUser = (id: string, users: GetUserType[]) => {
    return users.find((user) => user._id === id);
  };
  if (users) {
    const user = getUser(id, users);
    const userList: GetUserType[] = [];
    usersInBoard
      .map((user) => getUser(user, users))
      .forEach((user) => {
        if (user !== undefined) userList.push(user);
      });
    return { user, users, userList, error };
  }
  return { user: undefined, users: [], userList: [], error };
}
