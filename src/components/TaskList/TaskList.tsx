import { FC, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Draggable } from 'react-beautiful-dnd';
import { Button, Stack, Box } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

import { Modal } from '../UI/Modal/Modal';
import { Task } from '..';

import { TaskListProps } from '../../types/types';

import './TaskList.scss';
import { AddTask } from '../Task/AddTask/AddTask';

export const TaskList: FC<TaskListProps> = ({ boardId, columnId, column, columnNum }) => {
  const [showTaskModal, setShowTaskModal] = useState<boolean>(false);
  const [order, setOrder] = useState<number>(0);
  const { t } = useTranslation();

  useEffect(() => {
    setOrder(column.items.length > 0 ? Math.max(...column.items.map((o) => o.order)) + 1 : 0);
  }, [column.items]);

  return (
    <Stack className="tasklist_container">
      {column.items &&
        column.items.map((t, index) => {
          return (
            <Draggable draggableId={`${columnNum}${t._id}`} index={index} key={t._id}>
              {(provided) => (
                <Box
                  {...provided.draggableProps}
                  {...provided.dragHandleProps}
                  ref={provided.innerRef}
                >
                  <Task task={t} />
                </Box>
              )}
            </Draggable>
          );
        })}
      <Button
        onClick={() => setShowTaskModal(true)}
        variant="outlined"
        className="task-list__add-task-btn"
        startIcon={<AddIcon />}
      >
        {t('Create task')}
      </Button>
      <Modal visible={showTaskModal} setModal={setShowTaskModal}>
        <AddTask
          boardId={boardId}
          columnId={columnId}
          setShowTaskModal={setShowTaskModal}
          order={order}
        />
      </Modal>
    </Stack>
  );
};
