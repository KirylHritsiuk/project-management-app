import { FC, useEffect } from 'react';
import { ModalProps } from './Modal.props';
import styles from './Modal.module.scss';
import cn from 'classnames';
import { Portal } from '../Portal/Portal';
import { motion } from 'framer-motion';
import { useMount } from 'hooks/useMount';
import { useAppSelector } from 'hooks/hooks';

const variants = {
  open: { opacity: 1, scale: 1 },
  closed: { opacity: 0, scale: 0 },
  init: { opacity: 0, scale: 0 },
  openOverlay: { opacity: 1 },
  closedOverlay: { opacity: 0 },
  initOverlay: { opacity: 0 },
};

export const Modal: FC<ModalProps> = ({ className, visible, setModal, children }) => {
  const { token } = useAppSelector((state) => state.user);
  const { mounted } = useMount(visible);

  useEffect(() => {
    if (!token) {
      setModal(false);
    }
  }, [token]);

  if (mounted) {
    return (
      <Portal>
        <motion.div className={styles.modal}>
          <motion.div
            className={styles.overlay}
            onClick={() => setModal(false)}
            initial="initOverlay"
            animate={visible ? 'openOverlay' : 'closedOverlay'}
            transition={{ duration: 0.3 }}
            variants={variants}
          />
          <motion.div
            className={cn(styles.content, className)}
            initial="init"
            animate={visible ? 'open' : 'closed'}
            transition={{ duration: 0.3 }}
            variants={variants}
          >
            {children}
          </motion.div>
        </motion.div>
      </Portal>
    );
  }
  return null;
};
