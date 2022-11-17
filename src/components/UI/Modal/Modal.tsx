import { FC } from 'react';
import { ModalProps } from './Modal.props';
import styles from './Modal.module.scss';
import cn from 'classnames';
import { Button } from '@mui/material';
import { Portal } from '../Portal/Portal';
import CloseIcon from '@mui/icons-material/Close';

export const Modal: FC<ModalProps> = (props) => {
  const { className, visible, setModal, children } = props;

  if (visible) {
    return (
      <Portal>
        <div className={styles.modal}>
          <div className={styles.overlay} onClick={() => setModal(false)} />
          <div className={cn(styles.content, className)}>
            {/* <Button
              variant="text"
              onClick={() => setModal(false)}
              className={styles.close}
              size="small"
            >
              <CloseIcon />
            </Button> */}
            {children}
          </div>
        </div>
      </Portal>
    );
  }
  return null;
};
