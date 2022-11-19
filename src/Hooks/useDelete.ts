import { boardsAPI } from 'api/boardsApi';
import { columnsAPI } from 'api/columnsApi';
import { tasksAPI } from 'api/tasksApi';
import { usersAPI } from 'api/usersApi';
import { CategoryType } from 'types/types';

export type idType = {
  id?: string;
  boardId?: string;
  columnId?: string;
  taskId?: string;
};

export const useDelete = (category: CategoryType, ids: idType) => {
  switch (category) {
    case 'user':
      const [deleteItem, error] = usersAPI.useDeleteUserMutation();
      const id: Required<Pick<idType, 'id'>> = { id: '' };
      if (ids.id) id.id = ids.id;
      return { deleteItem: () => deleteItem(id), error };

    case 'board':
      const [deleteBoard, errorBoard] = boardsAPI.useDeleteBoardMutation();
      const board: Required<Pick<idType, 'boardId'>> = { boardId: '' };
      console.log(boardsAPI.useDeleteBoardMutation());
      if (ids.boardId) board.boardId = ids.boardId;
      return { deleteItem: () => deleteBoard(board), error: errorBoard };

    case 'column':
      const [deleteCol, errorCol] = columnsAPI.useDeleteColumnMutation();
      const column: Required<Pick<idType, 'boardId' | 'columnId'>> = { boardId: '', columnId: '' };
      if (ids.columnId && ids.boardId) {
        column.boardId = ids.boardId;
        column.columnId = ids.columnId;
      }
      return { deleteItem: () => deleteCol(column), error: errorCol };

    case 'task':
      const [deleteTask, errorTask] = tasksAPI.useDeleteTaskMutation();
      const task: Required<Pick<idType, 'boardId' | 'columnId' | 'taskId'>> = {
        boardId: '',
        columnId: '',
        taskId: '',
      };
      if (ids.taskId && ids.columnId && ids.boardId) {
        task.boardId = ids.boardId;
        task.columnId = ids.boardId;
        task.taskId = ids.boardId;
      }
      return { deleteItem: () => deleteTask(task), error: errorTask };

    default:
      throw new Error('Failed Category');
  }
};

function checkID(
  category: CategoryType,
  id: idType
):
  | { id: string }
  | { boardId: string }
  | { boardId: string; columnId: string }
  | { boardId: string; columnId: string; taskId: string } {
  switch (category) {
    case 'user':
      if (id.id) {
        return { id: id.id };
      }
      return { id: '' };
    case 'board':
      if (id.boardId) {
        return { boardId: id.boardId };
      }
      return { boardId: '' };
    case 'column':
      if (id.columnId && id.boardId) {
        return { boardId: id.boardId, columnId: id.columnId };
      }
      return { boardId: '', columnId: '' };
    case 'task':
      if (id.taskId && id.columnId && id.boardId) {
        return { boardId: id.boardId, columnId: id.columnId, taskId: id.taskId };
      }
      return { boardId: '', columnId: '', taskId: '' };
    default:
      throw new Error('Failed Category');
  }
}
