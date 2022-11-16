import { useParams } from 'react-router-dom';
import { FC, useState } from 'react';

import { Box, Button, Card, CardActions } from '@mui/material';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';

import { Modal } from '../UI/Modal/Modal';
import { tasksAPI } from '../../api/tasksApi';

import { TaskProps } from '../../types/types';

export const Task: FC<TaskProps> = ({ task, columnId }) => {
  const [isOpen, setOpen] = useState<boolean>(false);
  const { id } = useParams();
  const iddd = id ?? '1';
  const { refetch } = tasksAPI.useGetTasksQuery({ boardId: iddd, columnId: columnId });
  const [deleteTask] = tasksAPI.useDeleteTaskMutation();

  const deletedTask = async (id: string) => {
    await deleteTask({ boardId: iddd, columnId: columnId, taskId: id })
      .then(() => {
        refetch();
        setOpen(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const changeOpen = () => {
    setOpen(true);
  };

  return (
    <Card
      sx={{
        justifyContent: 'space-between',
        display: 'flex',
        border: '1px solid green',
        alignItems: 'center',
        paddingLeft: '10px',
      }}
    >
      <Box sx={{ overflowX: 'scroll' }}>{task.title}</Box>
      <CardActions>
        <EditIcon fontSize="small" />
        <DeleteForeverIcon fontSize="small" onClick={changeOpen} />
      </CardActions>
      <Modal visible={isOpen} setModal={setOpen}>
        <p>Вы действительно хотите удалить колонку?</p>
        <Button onClick={() => deletedTask(task._id)}>Delete</Button>
      </Modal>
    </Card>
  );
};
