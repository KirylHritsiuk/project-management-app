import { FC } from 'react';
import { ModalProps } from './Modal.props';
import styles from './Modal.module.scss';
import cn from 'classnames';
import { Button } from '@mui/material';

export const Modal: FC<ModalProps> = (props) => {
  const { className, visible, setModal, children } = props;
  return (
    <div
      className={cn(styles.modal, {
        [styles.active]: visible,
      })}
      onClick={() => setModal(false)}
    >
      <div className={cn(styles.content, className)} onClick={(e) => e.stopPropagation()}>
        <Button
          variant="contained"
          onClick={() => setModal(false)}
          className={styles.close}
          color="error"
          size="small"
        >
          X
        </Button>
        {children}
      </div>
    </div>
  );
};
