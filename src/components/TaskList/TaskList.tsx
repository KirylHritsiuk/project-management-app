import { FC, useEffect, useState } from 'react';
import { Droppable } from 'react-beautiful-dnd';
import { Button, Stack } from '@mui/material';
import { Modal } from '../UI/Modal/Modal';
import { Task } from 'components';
import { AddTask } from 'components/Task/AddTask/AddTask';
import { GetColumnType } from 'types/types';
import { DroppableProvided } from 'pages/Board/react-beautiful-dnd';
import AddIcon from '@mui/icons-material/Add';

import './TaskList.scss';

interface TaskProps {
  boardId: string;
  columnId: string;
  columnNum: number;
  column: GetColumnType;
  listType: string;
}

export const TaskList: FC<TaskProps> = ({ boardId, columnId, column, columnNum, listType }) => {
  const [showTaskModal, setShowTaskModal] = useState<boolean>(false);
  const [order, setOrder] = useState<number>(0);

  useEffect(() => {
    setOrder(column.items.length > 0 ? Math.max(...column.items.map((o) => o.order)) + 1 : 0);
  }, [column.items]);

  return (
    <Stack className="tasklist_container">
      <Droppable droppableId={`droppable${column._id}${columnNum}`} type={listType}>
        {(provided: DroppableProvided) => (
          <div className="task_list" {...provided.droppableProps} ref={provided.innerRef}>
            {column.items &&
              column.items.map((t, index) => {
                return (
                  <Task
                    task={t}
                    columnNum={columnNum}
                    key={t._id}
                    columnId={columnId}
                    provided={provided}
                    innerRef={provided.innerRef}
                    index={index}
                  />
                );
              })}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
      <Button onClick={() => setShowTaskModal(true)} 
      sx={{
          padding: '10px 46px',
        }}
        className="button_add"
        startIcon={<AddIcon />}
      />
      <Modal visible={showTaskModal} setModal={setShowTaskModal}>
        <AddTask boardId={boardId} columnId={columnId} setShowTaskModal={setShowTaskModal} />
      </Modal>
    </Stack>
  );
};
