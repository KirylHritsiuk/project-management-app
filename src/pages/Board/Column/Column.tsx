import { Delete, TaskList } from '../../../components';
import { Draggable } from 'react-beautiful-dnd';
import { GetColumnType } from '../../../types/types';
import { useState } from 'react';
import { Title } from './Title/Title';

type ColumnType = {
  column: GetColumnType;
  boardId: string;
  index: number;
};

export const Column = ({ column, boardId, index }: ColumnType) => {
  const [isOpen, setOpen] = useState<boolean>(false);
  const [delId, setDelId] = useState('');

  const changeOpen = (id: string) => {
    setOpen(true);
    setDelId(id);
  };

  return (
    <>
      <Draggable draggableId={column._id} index={index}>
        {(provided) => (
          <div
            className="card_column"
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
          >
            <Title
              boardId={column.borderId}
              columnId={column._id}
              title={column.title}
              order={column.order}
            />
            <TaskList
              listType="TASKS"
              boardId={boardId}
              columnId={column._id}
              columnNum={index}
              column={column}
            />
          </div>
        )}
      </Draggable>
      <Delete
        category="column"
        id={{ boardId: boardId, columnId: delId }}
        visible={isOpen}
        setModal={setOpen}
      />
    </>
  );
};
