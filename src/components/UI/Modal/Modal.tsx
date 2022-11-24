import { FC } from 'react';
import { ModalProps } from './Modal.props';
import styles from './Modal.module.scss';
import cn from 'classnames';
import { Portal } from '../Portal/Portal';
import { motion } from 'framer-motion';
import { useMount } from 'hooks/useMount';

const variants = {
  open: { opacity: 1 },
  closed: { opacity: 0, scale: 0 },
};

export const Modal: FC<ModalProps> = (props) => {
  const { className, visible, setModal, children } = props;
  const { mounted } = useMount(visible);

  if (mounted) {
    return (
      <Portal>
        <motion.div
          className={styles.modal}
          animate={visible ? 'open' : 'closed'}
          transition={{ duration: 0.3 }}
          variants={variants}
        >
          <div className={styles.overlay} onClick={() => setModal(false)} />
          <div className={cn(styles.content, className)}>{children}</div>
        </motion.div>
      </Portal>
    );
  }
  return null;
};
