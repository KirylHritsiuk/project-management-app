import { FC, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Draggable } from 'react-beautiful-dnd';

import { Box, Card, CardActions } from '@mui/material';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

import { Delete, Modal } from '..';
import { TaskModal } from './TaskModal/TaskModal';

import { TaskProps } from '../../types/types';

export const Task: FC<TaskProps> = ({ task, columnId, index, columnNum }) => {
  const [showDelete, setShowDelete] = useState<boolean>(false);
  const [showTask, setShowTask] = useState<boolean>(false);
  const { id } = useParams();
  const boardId = id ?? '';

  const changeOpen = (ev: React.MouseEvent<SVGSVGElement>) => {
    ev.stopPropagation();
    setShowDelete(true);
  };

  return (
    <>
      <Draggable draggableId={`${columnNum}${task._id}`} index={index}>
        {(provided) => (
          <Card
            sx={{
              justifyContent: 'space-between',
              display: 'flex',
              alignItems: 'center',
              paddingLeft: '10px',
              marginBottom: '10px',
              height: '50px',
            }}
            onClick={() => setShowTask(true)}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
          >
            <Box>{task.title}</Box>
            <CardActions>
              <DeleteForeverIcon fontSize="small" onClick={changeOpen} />
            </CardActions>
          </Card>
        )}
      </Draggable>

      <Delete
        category="task"
        id={{ boardId: boardId, columnId: columnId, taskId: task._id }}
        visible={showDelete}
        setModal={setShowDelete}
      />
      <Modal visible={showTask} setModal={setShowTask}>
        <TaskModal columnId={columnId} task={task} />
      </Modal>
    </>
  );
};
