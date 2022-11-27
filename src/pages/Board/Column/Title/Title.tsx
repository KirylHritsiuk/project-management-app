import { FC, useState } from 'react';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { Edit } from './Edit';

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
          <div className="column_title">
            <h3 onClick={open}>{title}</h3>
          </div>
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
