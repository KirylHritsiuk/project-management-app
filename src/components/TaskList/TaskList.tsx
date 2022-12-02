import { FC } from 'react';
import { Draggable } from 'react-beautiful-dnd';

import { Stack, Box } from '@mui/material';

import { Task } from '..';

import { TaskListProps } from '../../types/types';

import './TaskList.scss';

export const TaskList: FC<TaskListProps> = ({ column, columnNum }) => {
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
    </Stack>
  );
};
