import { FC, useRef, useState } from 'react';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { Edit } from './Edit';

interface TitleProps {
  boardId: string;
  columnId: string;
  title: string;
  order: number;
}
export const Title: FC<TitleProps> = ({ title, order, boardId, columnId }) => {
  const [isEdit, setEdit] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const close = () => {
    setEdit(false);
  };

  const open = () => {
    setEdit(true);
    console.log('click');
    inputRef.current?.focus();
  };

  return (
    <div className="card_title">
      {isEdit ? (
        <Edit
          ref={inputRef}
          title={title}
          boardId={boardId}
          columnId={columnId}
          order={order}
          close={close}
        />
      ) : (
        <>
          <div className="column_title">
            <h3 onClick={open}>{title}</h3>
          </div>
          <DeleteForeverIcon
            fontSize="medium"
            sx={{ cursor: 'pointer', position: 'absolute', right: '10px' }}
          />
        </>
      )}
    </div>
  );
};
