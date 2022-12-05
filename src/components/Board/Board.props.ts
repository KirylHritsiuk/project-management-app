import { GetBoardType, GetUserType } from 'types/types';

export interface BoardProps {
  data: GetBoardType;
  allUsers?: GetUserType[];
}
