import { Delete, TaskList } from '../../../components';
import { Draggable, Droppable, DroppableProvided } from 'react-beautiful-dnd';
import { GetColumnType } from '../../../types/types';
import { useState } from 'react';
import { Title } from './Title/Title';
import styles from './Column.module.scss';

type ColumnType = {
  column: GetColumnType;
  boardId: string;
  index: number;
};

export const Column = ({ column, boardId, index }: ColumnType) => {
  const [isOpen, setOpen] = useState<boolean>(false);
  const openDel = () => {
    setOpen(true);
  };

  return (
    <div className="card_column-wrapper">
      <Draggable draggableId={column._id} index={index}>
        {(provided) => (
          <div
            className="card_column"
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
          >
            <Title
              boardId={column.boardId}
              columnId={column._id}
              title={column.title}
              order={column.order}
              openDel={openDel}
            />
            <Droppable droppableId={`droppable${column._id}${index}`} type="tasks">
              {(provided: DroppableProvided) => (
                <div
                  className={styles.task_list}
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                >
                  <TaskList
                    boardId={boardId}
                    columnId={column._id}
                    columnNum={index}
                    column={column}
                  />
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </div>
        )}
      </Draggable>
      <Delete
        category="column"
        id={{ boardId: boardId, columnId: column._id }}
        visible={isOpen}
        setModal={setOpen}
      />
    </div>
  );
};
