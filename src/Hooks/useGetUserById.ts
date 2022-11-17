import { usersAPI } from 'api/usersApi';
import { GetUserType } from 'types/types';

export const useConvertId = (id: string | string[]) => {
  const { data, error } = usersAPI.useGetUsersQuery('');
  if (typeof id === 'string' && data) {
    return getLoginById(id, data);
  } else if (Array.isArray(id) && data) {
    return id.map((user) => getLoginById(user, data));
  } else {
    return error;
  }
};

function getLoginById(id: string, data: GetUserType[]) {
  return data.filter((user) => {
    user._id === id;
  })[0];
}
