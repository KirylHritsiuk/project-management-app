import { FC, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Draggable } from 'react-beautiful-dnd';
import { Box, Card, CardActions } from '@mui/material';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';
import { TaskProps } from 'types/types';
import { Delete } from 'components';
import { TaskModal } from './TaskModal/TaskModal';
import { Modal } from 'components/UI/Modal/Modal';

export const Task: FC<TaskProps> = ({ task, columnId, index, columnNum }) => {
  const [showDelete, setShowDelete] = useState<boolean>(false);
  const [showTask, setShowTask] = useState<boolean>(false);
  const { id } = useParams();
  const taskId = id ?? '';

  const changeOpen = () => {
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
              <EditIcon fontSize="small" />
              <DeleteForeverIcon fontSize="small" onClick={changeOpen} />
            </CardActions>
          </Card>
        )}
      </Draggable>

      <Delete
        category="task"
        id={{ boardId: taskId, columnId: columnId, taskId: task._id }}
        visible={showDelete}
        setModal={setShowDelete}
      />
      <Modal visible={showTask} setModal={setShowTask}>
        <TaskModal columnId={columnId} task={task} />
      </Modal>
    </>
  );
};
