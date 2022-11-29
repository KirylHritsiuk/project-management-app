import { FC, useState } from 'react';
import { Droppable } from 'react-beautiful-dnd';

import { Button, Stack } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

import { Modal } from '../UI/Modal/Modal';
import { Task } from '..';
import { AddTask } from '../Task/AddTask/AddTask';

import { TaskListProps } from '../../types/types';
import { DroppableProvided } from '../../pages/Board/react-beautiful-dnd';

import './TaskList.scss';

export const TaskList: FC<TaskListProps> = ({ boardId, columnId, column, columnNum, listType }) => {
  const [showTaskModal, setShowTaskModal] = useState<boolean>(false);

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
      <Button
        onClick={() => setShowTaskModal(true)}
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
