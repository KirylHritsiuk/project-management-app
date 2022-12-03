import { DetailedHTMLProps, HTMLAttributes } from 'react';

export interface ErrorTitleProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLTitleElement>, HTMLTitleElement> {
  title?: string;
  refetch: () => void;
  data?: boolean;
}
