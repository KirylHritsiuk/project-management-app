import { DetailedHTMLProps, HTMLAttributes } from 'react';

export interface InfoTitleProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLTitleElement>, HTMLTitleElement> {
  title: string;
}
