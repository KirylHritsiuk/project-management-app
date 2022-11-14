import { HTMLAttributes, DetailedHTMLProps } from 'react';
import { GetBoardType } from 'types/types';

export interface BoarderMenuProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  data: GetBoardType;
}
