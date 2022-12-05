import { HTMLAttributes, DetailedHTMLProps } from 'react';

export interface ModalProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  visible: boolean;
  setModal: (data: boolean) => void;
}
