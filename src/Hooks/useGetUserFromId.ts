import { GetUserType } from 'types/types';
import { usersAPI } from 'api/usersApi';

export function useGetUserFromId(id: string, usersInBoard: string[]) {
  const { data: users, error } = usersAPI.useGetUsersQuery('');

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
