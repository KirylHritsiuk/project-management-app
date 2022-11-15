import { FC, useEffect, useMemo } from 'react';
import { ModalProps } from './Modal.props';
import styles from './Modal.module.scss';
import cn from 'classnames';
import { Button } from '@mui/material';
import { createPortal } from 'react-dom';

const modalRootElement = document.querySelector('#modal');

export const Modal: FC<ModalProps> = (props) => {
  const { className, visible, setModal, children } = props;
  const elementHTML = useMemo(() => document.createElement('div'), []);

  useEffect(() => {
    if (modalRootElement) {
      modalRootElement.appendChild(elementHTML);
    }

    return () => {
      if (modalRootElement) {
        modalRootElement.removeChild(elementHTML);
      }
    };
  });

  if (visible) {
    return createPortal(
      <div className={styles.modal} onClick={() => setModal(false)}>
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
      </div>,
      elementHTML
    );
  }

  return null;
};
