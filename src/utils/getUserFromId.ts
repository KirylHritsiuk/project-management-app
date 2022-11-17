import { GetUserType } from 'types/types';

export function getUserFromId(id: string, data: GetUserType[] | undefined): GetUserType {
  const a: GetUserType = { _id: 'no data', login: 'no data', name: 'no data' };
  if (data) {
    const res = data.find((user) => user._id === id);
    return res ?? a;
  }
  return a;
}
