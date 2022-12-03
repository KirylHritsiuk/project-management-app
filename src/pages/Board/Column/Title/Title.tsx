import { FC, useState } from 'react';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { Edit } from './Edit';
import { AnimatePresence, motion } from 'framer-motion';
import { text } from 'components';

interface TitleProps {
  boardId: string;
  columnId: string;
  title: string;
  order: number;
  openDel: () => void;
}
export const Title: FC<TitleProps> = ({ title, order, boardId, columnId, openDel }) => {
  const [isEdit, setEdit] = useState<boolean>(false);

  const close = () => {
    setEdit(false);
  };

  const open = () => {
    setEdit(true);
  };

  return (
    <div className="card_title">
      {isEdit ? (
        <Edit title={title} boardId={boardId} columnId={columnId} order={order} close={close} />
      ) : (
        <>
          <motion.div className="column_title">
            <motion.h3 variants={text} initial="init" animate="anim" exit="exit" onClick={open}>
              {title}
            </motion.h3>
          </motion.div>
          <DeleteForeverIcon
            fontSize="medium"
            onClick={openDel}
            sx={{ cursor: 'pointer', position: 'absolute', right: '10px' }}
          />
        </>
      )}
    </div>
  );
};
