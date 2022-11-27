import { useParams } from 'react-router-dom';
import { FC, useState } from 'react';

import { Box, Card, CardActions } from '@mui/material';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';

import { TaskProps } from '../../types/types';
import { Delete } from '../../components';
import { Draggable } from 'react-beautiful-dnd';

export const Task: FC<TaskProps> = ({ task, columnId, index, columnNum }) => {
  const [isOpen, setOpen] = useState<boolean>(false);
  const { id } = useParams();
  const taskId = id ?? '';

  const changeOpen = () => {
    setOpen(true);
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
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
          >
            <Box sx={{ overflowX: 'scroll' }}>{task.title}</Box>
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
        visible={isOpen}
        setModal={setOpen}
      />
    </>
  );
};
