import { Delete, Modal, TaskList } from '../../../components';
import { Draggable, Droppable, DroppableProvided } from 'react-beautiful-dnd';
import { GetColumnType } from '../../../types/types';
import { useEffect, useState } from 'react';
import { Title } from './Title/Title';
import styles from './Column.module.scss';
import { Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useTranslation } from 'react-i18next';
import { AddTask } from '../../../components/Task/AddTask/AddTask';

type ColumnType = {
  column: GetColumnType;
  boardId: string;
  index: number;
};

export const Column = ({ column, boardId, index }: ColumnType) => {
  const [isOpen, setOpen] = useState<boolean>(false);
  const [showTaskModal, setShowTaskModal] = useState<boolean>(false);
  const [order, setOrder] = useState<number>(0);
  const { t } = useTranslation();

  const openDel = () => {
    setOpen(true);
  };

  useEffect(() => {
    setOrder(column.items.length > 0 ? Math.max(...column.items.map((o) => o.order)) + 1 : 0);
  }, [column.items]);

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
                <>
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
                  <div className={styles.wrapper__button}>
                    <Button
                      onClick={() => setShowTaskModal(true)}
                      variant="outlined"
                      className="task-list__add-task-btn"
                      startIcon={<AddIcon />}
                      style={{ width: '100%' }}
                    >
                      {t('Create task')}
                    </Button>
                  </div>
                </>
              )}
            </Droppable>
          </div>
        )}
      </Draggable>
      <Modal visible={showTaskModal} setModal={setShowTaskModal}>
        <AddTask
          boardId={boardId}
          columnId={column._id}
          setShowTaskModal={setShowTaskModal}
          order={order}
        />
      </Modal>
      <Delete
        category="column"
        id={{ boardId: boardId, columnId: column._id }}
        visible={isOpen}
        setModal={setOpen}
      />
    </div>
  );
};
